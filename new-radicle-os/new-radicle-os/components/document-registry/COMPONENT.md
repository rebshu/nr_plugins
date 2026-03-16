# Document Registry

Tracks the deliverables produced across a session's building blocks and connects them to the knowledge loop. Links building block outputs to their underlying documents.

## When to use

Any session that produces multiple deliverables that need to be tracked, linked, and eventually shared to the Document Hub. The registry is the bridge between session outputs and the team's persistent knowledge base.

## Data shape

```
DocumentRegistry {
  sessionId: string               — Which session produced these
  documents: DocumentRef[]
}

DocumentRef {
  id: string                      — Unique identifier
  title: string                   — Document title
  url: string                     — Where the document lives
  blockId: string                 — Which building block this supports
  createdDate: string             — ISO date
  createdBy: string               — Who created it
  type: string                    — "exploration" | "decision" | "reference" | "artifact"
  sharedToHub: boolean            — Whether this has been shared via share-with-team
  hubPageId: string | null        — Notion page ID if shared
}
```

## Connection to the knowledge loop

Documents in the registry can be in three states:

1. **Session-local** — produced during the session but not yet shared. Exists as a file or in-conversation artifact.
2. **Shared to Hub** — pushed to the Document Hub via share-with-team. `sharedToHub: true`, `hubPageId` set.
3. **External** — lives outside the system (Google Drive, GitHub, etc.). Tracked by URL only.

When a user says "share this with the team" at the end of a session, the registry helps identify what's been produced and what hasn't been shared yet. The share-with-team skill can use the registry to batch-share multiple outputs.

## Rendering

The registry renders in two contexts:

### Inside a decision framework (via HoverDetailCard)
Each building block's tooltip shows its linked documents with "View all documents →" as a link to the full registry or external document.

### As a standalone session output
At the end of a session, the registry can render as a summary view:
- List of all documents produced, grouped by phase/block
- Status badges: shared / not shared / external
- Action: "Share remaining items to Document Hub"

## Extending

To add a document to the registry during a session:
1. Create the document (file, artifact, Notion page)
2. Add a DocumentRef entry linking it to the relevant building block
3. When the session completes, prompt the user to share unshared items
