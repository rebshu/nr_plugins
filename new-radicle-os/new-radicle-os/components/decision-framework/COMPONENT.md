# Decision Framework Map

A reusable layout for decomposing complex, multi-stakeholder decisions into ordered phases and trackable building blocks. Produces a single-file React artifact.

## When to use

Use this component whenever a session needs to:
- Break a complex decision into discrete building blocks
- Track readiness/progress of each block
- Show multiple scoring dimensions on the same items
- Link blocks to underlying documents and deliverables

Typical sessions: ownership structure, pricing strategy, go-to-market planning, architecture review, hiring plan, reorg planning.

## Data shape

The session provides a `framework-data.json` that conforms to the schema in `schema.json`. The data defines:
- **Title and subtitle** for the overall framework
- **Phases** — ordered groups (e.g., "01 WHO WE ARE", "02 HOW WE'RE SET UP")
- **Building blocks** within each phase — each with name, description, output summary, document links, and scores
- **Scoring views** — the tabs/lenses (e.g., "Where we are" = readiness, "How important it is" = priority)

## How to generate the artifact

When a session uses this component, Claude should:

1. **Read the session's `framework-data.json`** to get the phases, blocks, and scoring views.
2. **Generate a single-file React (.jsx) artifact** using the data. The artifact should render:
   - A header with title, subtitle, and view toggle tabs
   - Numbered phase sections with building block cards
   - Status dots on each card matching the active scoring view
   - Hover tooltips showing block description, output summary, and document links
   - A legend bar at the bottom explaining the dot scale
   - The user's design language preferences (Mode 2: structured/internal unless specified otherwise)

3. **Style conventions:**
   - Off-white/warm stone background (#F5F2ED or similar)
   - Monospace font for labels and metadata
   - Cards with subtle borders, no heavy shadows
   - Dark tooltip on hover with structured sections
   - Dot colors: green spectrum for readiness, navy fill-level for importance, configurable per scoring view

4. **Save to the workspace folder** and provide the user a link.

## Extending for new sessions

To create a new decision framework for a different domain:

1. Copy the schema structure from `schema.json`
2. Define your phases and blocks specific to the decision
3. Define 1-3 scoring views relevant to the decision
4. Place the data file in your session's folder as `framework-data.json`
5. The SKILL.md in your session should reference this component for artifact generation

## Composition with other components

- **Building blocks** use the `building-block` component schema for their internal structure
- **Scoring views** use the `scoring-system` component for their scale definitions
- **Document links** within blocks connect to the `document-registry` component and the knowledge loop (share-with-team)
