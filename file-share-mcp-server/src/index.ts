#!/usr/bin/env node
/**
 * file-share-mcp-server
 *
 * A lightweight MCP server that uploads files to a GitHub repository
 * and returns GitHub Pages URLs for team sharing.
 *
 * Environment variables:
 *   GITHUB_TOKEN  - Personal access token with repo scope
 *   GITHUB_OWNER  - GitHub username or organization
 *   GITHUB_REPO   - Repository name (must have GitHub Pages enabled)
 *   GITHUB_BRANCH - Branch to push to (default: "main")
 *   PAGES_BASE_URL - Custom domain override (default: https://<owner>.github.io/<repo>)
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Octokit } from "@octokit/rest";
import { z } from "zod";
import * as fs from "node:fs/promises";
import * as path from "node:path";

// ── Configuration ──────────────────────────────────────────────────────

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  const pagesBaseUrl =
    process.env.PAGES_BASE_URL || `https://${owner}.github.io/${repo}`;

  if (!token) {
    console.error("ERROR: GITHUB_TOKEN environment variable is required");
    process.exit(1);
  }
  if (!owner) {
    console.error("ERROR: GITHUB_OWNER environment variable is required");
    process.exit(1);
  }
  if (!repo) {
    console.error("ERROR: GITHUB_REPO environment variable is required");
    process.exit(1);
  }

  return { token, owner, repo, branch, pagesBaseUrl };
}

const config = getConfig();
const octokit = new Octokit({ auth: config.token });

// ── Helpers ────────────────────────────────────────────────────────────

/**
 * Get the SHA of an existing file in the repo (needed for updates).
 * Returns undefined if the file doesn't exist.
 */
async function getFileSha(filePath: string): Promise<string | undefined> {
  try {
    const { data } = await octokit.repos.getContent({
      owner: config.owner,
      repo: config.repo,
      path: filePath,
      ref: config.branch,
    });

    if (!Array.isArray(data) && data.type === "file") {
      return data.sha;
    }
    return undefined;
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      "status" in error &&
      (error as { status: number }).status === 404
    ) {
      return undefined;
    }
    throw error;
  }
}

/**
 * Build the public GitHub Pages URL for a given file path.
 */
function buildPagesUrl(filePath: string): string {
  // Strip leading slash if present
  const cleanPath = filePath.replace(/^\//, "");
  return `${config.pagesBaseUrl}/${cleanPath}`;
}

/**
 * Sanitize a filename for use in a URL path.
 */
function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function handleError(error: unknown): string {
  if (error instanceof Error) {
    if ("status" in error) {
      const status = (error as { status: number }).status;
      switch (status) {
        case 401:
          return "Error: Authentication failed. Check your GITHUB_TOKEN.";
        case 403:
          return "Error: Permission denied. Ensure your token has 'repo' scope.";
        case 404:
          return `Error: Repository ${config.owner}/${config.repo} not found. Check GITHUB_OWNER and GITHUB_REPO.`;
        case 409:
          return "Error: Conflict — the file was modified concurrently. Try again.";
        case 422:
          return `Error: Validation failed — ${error.message}`;
        default:
          return `Error: GitHub API returned status ${status}: ${error.message}`;
      }
    }
    return `Error: ${error.message}`;
  }
  return `Error: Unexpected error: ${String(error)}`;
}

// ── MCP Server ─────────────────────────────────────────────────────────

const server = new McpServer({
  name: "file-share-mcp-server",
  version: "1.0.0",
});

// ── Tool: file_share_upload ────────────────────────────────────────────

const UploadInputSchema = z
  .object({
    file_path: z
      .string()
      .min(1)
      .describe(
        "Absolute local path to the file to upload (e.g. /path/to/report.html)"
      ),
    destination: z
      .string()
      .optional()
      .describe(
        "Optional destination path within the repo (e.g. 'shared/reports/q1.html'). If omitted, uses the source filename."
      ),
    folder: z
      .string()
      .optional()
      .describe(
        "Optional subfolder to organize uploads (e.g. 'reports', 'overviews'). Prepended to the filename."
      ),
    commit_message: z
      .string()
      .optional()
      .describe(
        "Custom commit message. Defaults to 'Upload <filename> via file-share-mcp'."
      ),
  })
  .strict();

type UploadInput = z.infer<typeof UploadInputSchema>;

server.registerTool(
  "file_share_upload",
  {
    title: "Upload File for Sharing",
    description: `Upload a local file to the team's GitHub Pages repository and return a shareable URL.

The file is committed to the configured GitHub repo. If GitHub Pages is enabled,
the returned URL will serve the file directly in a browser.

Supports any file type (HTML, PDF, images, etc.). HTML files are especially useful
as they render with full styling in the browser.

Args:
  - file_path (string, required): Absolute local path to the file
  - destination (string, optional): Custom path within the repo
  - folder (string, optional): Subfolder for organization (e.g. "reports")
  - commit_message (string, optional): Custom commit message

Returns:
  JSON with url (shareable GitHub Pages URL), repo_path (path in repo),
  sha (commit SHA), and size (file size in bytes).

Examples:
  - Upload HTML report: { file_path: "/tmp/report.html", folder: "reports" }
  - Upload with custom path: { file_path: "/tmp/deck.pdf", destination: "2024/q1-deck.pdf" }`,
    inputSchema: UploadInputSchema,
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
  async (params: UploadInput) => {
    try {
      // Read the local file
      const fileContent = await fs.readFile(params.file_path);
      const base64Content = fileContent.toString("base64");
      const sourceFilename = path.basename(params.file_path);

      // Determine destination path in the repo
      let repoPath: string;
      if (params.destination) {
        repoPath = params.destination.replace(/^\//, "");
      } else {
        const safeName = sanitizeFilename(sourceFilename);
        repoPath = params.folder
          ? `${params.folder.replace(/^\/|\/$/g, "")}/${safeName}`
          : safeName;
      }

      // Check if file already exists (to get SHA for update)
      const existingSha = await getFileSha(repoPath);

      // Commit the file
      const commitMessage =
        params.commit_message ||
        `Upload ${sourceFilename} via file-share-mcp`;

      const { data } = await octokit.repos.createOrUpdateFileContents({
        owner: config.owner,
        repo: config.repo,
        path: repoPath,
        message: commitMessage,
        content: base64Content,
        branch: config.branch,
        ...(existingSha ? { sha: existingSha } : {}),
      });

      const url = buildPagesUrl(repoPath);
      const output = {
        url,
        repo_path: repoPath,
        sha: data.content?.sha ?? "unknown",
        size: fileContent.length,
        updated: !!existingSha,
      };

      const text = [
        `✓ File uploaded successfully`,
        ``,
        `**URL**: ${url}`,
        `**Repo path**: ${config.owner}/${config.repo}/${repoPath}`,
        `**Size**: ${(fileContent.length / 1024).toFixed(1)} KB`,
        existingSha ? `**Action**: Updated existing file` : `**Action**: Created new file`,
        ``,
        `Note: GitHub Pages may take 1-2 minutes to deploy changes.`,
      ].join("\n");

      return {
        content: [{ type: "text", text }],
        structuredContent: output,
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: handleError(error) }],
      };
    }
  }
);

// ── Tool: file_share_list ──────────────────────────────────────────────

const ListInputSchema = z
  .object({
    folder: z
      .string()
      .optional()
      .describe(
        "Optional folder to list (e.g. 'reports'). Lists root if omitted."
      ),
  })
  .strict();

type ListInput = z.infer<typeof ListInputSchema>;

server.registerTool(
  "file_share_list",
  {
    title: "List Shared Files",
    description: `List files in the team's shared GitHub Pages repository.

Returns all files at the specified path, with their shareable URLs and sizes.

Args:
  - folder (string, optional): Subfolder to list. Lists repo root if omitted.

Returns:
  JSON with files array, each containing name, path, url, size, and sha.`,
    inputSchema: ListInputSchema,
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
  async (params: ListInput) => {
    try {
      const repoPath = params.folder?.replace(/^\/|\/$/g, "") || "";

      const { data } = await octokit.repos.getContent({
        owner: config.owner,
        repo: config.repo,
        path: repoPath,
        ref: config.branch,
      });

      if (!Array.isArray(data)) {
        return {
          content: [
            {
              type: "text",
              text: `Path '${repoPath}' is a file, not a directory. Use file_share_upload to manage it.`,
            },
          ],
        };
      }

      const files = data
        .filter((item) => item.type === "file")
        .map((item) => ({
          name: item.name,
          path: item.path,
          url: buildPagesUrl(item.path),
          size: item.size,
          sha: item.sha,
        }));

      const folders = data
        .filter((item) => item.type === "dir")
        .map((item) => ({
          name: item.name,
          path: item.path,
        }));

      const output = { files, folders, total_files: files.length, total_folders: folders.length };

      const lines: string[] = [];
      if (repoPath) {
        lines.push(`## Files in /${repoPath}`, "");
      } else {
        lines.push(`## Shared Files (root)`, "");
      }

      if (folders.length > 0) {
        lines.push(`**Folders:** ${folders.map((f) => f.name).join(", ")}`, "");
      }

      if (files.length === 0) {
        lines.push("No files found at this path.");
      } else {
        for (const file of files) {
          lines.push(
            `- **${file.name}** (${(file.size / 1024).toFixed(1)} KB) → ${file.url}`
          );
        }
      }

      return {
        content: [{ type: "text", text: lines.join("\n") }],
        structuredContent: output,
      };
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        "status" in error &&
        (error as { status: number }).status === 404
      ) {
        return {
          content: [
            {
              type: "text",
              text: `No files found at path '${params.folder || "/"}'. The folder may not exist yet — upload a file to create it.`,
            },
          ],
        };
      }
      return {
        isError: true,
        content: [{ type: "text", text: handleError(error) }],
      };
    }
  }
);

// ── Tool: file_share_delete ────────────────────────────────────────────

const DeleteInputSchema = z
  .object({
    repo_path: z
      .string()
      .min(1)
      .describe(
        "Path of the file within the repo to delete (e.g. 'reports/q1-report.html')"
      ),
    commit_message: z
      .string()
      .optional()
      .describe("Custom commit message for the deletion."),
  })
  .strict();

type DeleteInput = z.infer<typeof DeleteInputSchema>;

server.registerTool(
  "file_share_delete",
  {
    title: "Delete a Shared File",
    description: `Remove a file from the team's shared GitHub Pages repository.

This permanently deletes the file from the repo and removes it from GitHub Pages.

Args:
  - repo_path (string, required): Path within the repo (e.g. "reports/old-report.html")
  - commit_message (string, optional): Custom commit message

Returns:
  Confirmation with the deleted path.`,
    inputSchema: DeleteInputSchema,
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: false,
      openWorldHint: true,
    },
  },
  async (params: DeleteInput) => {
    try {
      const cleanPath = params.repo_path.replace(/^\//, "");

      // Get current SHA (required for deletion)
      const sha = await getFileSha(cleanPath);
      if (!sha) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Error: File '${cleanPath}' not found in ${config.owner}/${config.repo}. Use file_share_list to see available files.`,
            },
          ],
        };
      }

      const commitMessage =
        params.commit_message ||
        `Delete ${path.basename(cleanPath)} via file-share-mcp`;

      await octokit.repos.deleteFile({
        owner: config.owner,
        repo: config.repo,
        path: cleanPath,
        message: commitMessage,
        sha,
        branch: config.branch,
      });

      const output = { deleted: cleanPath, success: true };

      return {
        content: [
          {
            type: "text",
            text: `✓ Deleted '${cleanPath}' from ${config.owner}/${config.repo}.\n\nThe GitHub Pages URL will stop working after the next deployment (1-2 minutes).`,
          },
        ],
        structuredContent: output,
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: handleError(error) }],
      };
    }
  }
);

// ── Start Server ───────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(
    `file-share-mcp-server running (repo: ${config.owner}/${config.repo})`
  );
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
