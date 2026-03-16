# file-share-mcp-server

A lightweight MCP server that uploads files to a GitHub repository and returns shareable GitHub Pages URLs. Built to solve the "rich file sharing" gap in Cowork/Notion workflows — when you need teammates to see styled HTML, not just markdown text.

## How it works

1. You (or a skill like `share-with-team`) call `file_share_upload` with a local file path
2. The MCP pushes the file to a designated GitHub repo
3. GitHub Pages serves it at a public URL
4. That URL gets stored in your Notion page's `Link` field

Your team clicks one link and sees the full visual artifact.

## Setup

### 1. Create a GitHub repo for shared files

```bash
# Create a new repo (or use an existing one)
gh repo create your-org/team-files --public --clone
```

### 2. Enable GitHub Pages

- Go to **Settings → Pages** in the repo
- Set **Source** to "Deploy from a branch"
- Set **Branch** to `main`, folder to `/ (root)`
- Save

### 3. Create a personal access token

- Go to **Settings → Developer settings → Personal access tokens → Fine-grained tokens**
- Create a token with **Contents: Read and write** permission on the repo

### 4. Configure environment variables

```bash
export GITHUB_TOKEN="ghp_your_token_here"
export GITHUB_OWNER="your-username-or-org"
export GITHUB_REPO="team-files"
# Optional:
export GITHUB_BRANCH="main"              # defaults to "main"
export PAGES_BASE_URL="https://your-org.github.io/team-files"  # auto-derived if omitted
```

### 5. Build and run

```bash
npm install
npm run build
npm start
```

### 6. Add to Claude Desktop / Cowork

Add this to your MCP configuration:

```json
{
  "mcpServers": {
    "file-share": {
      "command": "node",
      "args": ["/path/to/file-share-mcp-server/dist/index.js"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here",
        "GITHUB_OWNER": "your-username-or-org",
        "GITHUB_REPO": "team-files"
      }
    }
  }
}
```

## Tools

| Tool | Description |
|------|-------------|
| `file_share_upload` | Upload a local file → get a shareable GitHub Pages URL |
| `file_share_list` | List files (and folders) in the shared repo |
| `file_share_delete` | Remove a file from the repo |

## Integration with share-with-team

Once connected, the `share-with-team` skill can:

1. Create the Notion page with the text mirror (for search)
2. Call `file_share_upload` to push the visual HTML
3. Store the returned URL in the Notion page's `Link` field

Full automation, no manual steps.

## Notes

- GitHub Pages deploys take 1-2 minutes after a push
- Free GitHub accounts get unlimited public Pages sites
- The repo can be private with GitHub Pro/Team/Enterprise (Pages still works)
- Files are versioned via git — you get full history for free
