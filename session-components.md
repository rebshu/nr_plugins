# Abstractable Components from Kelly's Ownership Structure Session

**Source:** Kelly's cap table / ownership structure artifact
**Purpose:** Identify what's NR-specific vs what's a reusable primitive for the marketplace

---

## What the artifact actually is

Not a calculator — it's a **decision architecture tracker**. It maps the full landscape of building blocks that feed a complex, multi-stakeholder decision (founding ownership split), tracks readiness of each block, scores importance, and links to underlying documents. The decision itself is one phase among six.

This pattern applies to any high-stakes, multi-input decision: pricing strategy, go-to-market, org restructuring, product architecture, fundraising strategy.

---

## Six abstractable components

### 1. DecisionFrameworkMap (layout primitive)

**What it does in the artifact:** Organizes 17 building blocks into 6 numbered phases, rendering them as a visual map with sections and cards.

**What's NR-specific:** The six phases (Who We Are, How We're Set Up, etc.) and their specific blocks.

**What generalizes:** The pattern of decomposing a complex decision into ordered phases, each containing discrete building blocks. Every Evaluate-phase session in the marketplace could use this as its output format.

**Abstraction:**
```
DecisionFramework {
  title: string
  subtitle: string
  phases: Phase[] {
    number: number
    name: string
    blocks: BuildingBlock[]
  }
  views: ScoringView[]       // Multiple lenses on the same blocks
}
```

**Reuse examples:** Pricing strategy (Market Context → Cost Structure → Value Analysis → Pricing Model → Testing Plan), GTM launch (Audience → Channels → Messaging → Metrics → Timeline), Hiring plan (Role Definition → Market → Interview Design → Comp → Onboarding).

---

### 2. BuildingBlock (atomic work unit)

**What it does in the artifact:** Each card shows a name, a 4-dot status score, and a hover tooltip with description, what was produced, and document links.

**What's NR-specific:** The 17 specific blocks (Founding Principles, Entity Structure, Vision Alignment, etc.) and their content.

**What generalizes:** A tracked work item with: name, status, description, deliverable summary, and document references. This is the atomic unit that any session can produce and track.

**Abstraction:**
```
BuildingBlock {
  id: string
  name: string
  description: string                  // "What it is"
  output: string                       // "What we produced"
  documentLinks: DocumentRef[]         // Links to deliverables
  scores: Record<ScoringViewId, Score> // Status per view
  phase: PhaseRef                      // Which phase it belongs to
}
```

**Reuse examples:** Any session that produces multiple discrete deliverables. A competitive deep-dive might have blocks for "Market Map", "Competitor Profiles", "Positioning Gap Analysis", "Strategic Recommendations" — each with its own completion status and output.

---

### 3. DualScoringSystem (multi-lens view)

**What it does in the artifact:** Two tabs — "Where we are" (readiness) and "How important it is" (priority). Same blocks, different dot colors and legend. Readiness uses green→orange→red; importance uses filled navy dots.

**What's NR-specific:** The two specific dimensions (readiness + importance to founding split).

**What generalizes:** The ability to view the same set of work items through multiple scoring dimensions. A session could define any number of views — readiness, importance, risk, confidence, effort — each with its own scale and color scheme.

**Abstraction:**
```
ScoringView {
  id: string
  name: string                          // Tab label
  description: string                   // Explanatory text under tab
  scale: ScoreLevel[] {
    value: number                       // 1-4
    label: string                       // "Complete & aligned"
    color: string                       // Dot color
    legendLabel: string                 // Legend text
  }
}
```

**Reuse examples:** Engineering architecture review (Readiness + Risk + Complexity), hiring plan (Progress + Urgency + Difficulty), product roadmap (Completion + Impact + Confidence).

---

### 4. StatusDots (visual encoding)

**What it does in the artifact:** 4 dots per block, filled/colored to indicate level. Compact, glanceable, no percentages.

**What's NR-specific:** Nothing — this is already generic.

**What generalizes:** A compact status indicator that works at any scale (4 items or 40). Better than progress bars for qualitative assessments where "60% complete" doesn't mean anything.

**Abstraction:**
```
StatusDots {
  count: number                         // Default 4
  filled: number                        // How many are filled
  colorScheme: "readiness" | "importance" | "risk" | custom
}
```

---

### 5. HoverDetailCard (progressive disclosure)

**What it does in the artifact:** Hovering a building block reveals a dark tooltip with structured content: a label field ("What it is" / "Importance to founding split"), a description, a "What we produced" section, and a document link.

**What's NR-specific:** The specific field labels and content.

**What generalizes:** Progressive disclosure for dashboard items. Any session that produces a map/overview needs a way to show detail without navigating away. The tooltip structure (context field + detail field + link) is universal.

**Abstraction:**
```
HoverDetail {
  sections: DetailSection[] {
    label: string                       // Field label (uppercase, monospace)
    content: string                     // Description text
  }
  link?: {
    label: string                       // "View all documents →"
    url: string
  }
}
```

---

### 6. DocumentRegistry (deliverable tracking)

**What it does in the artifact:** Each block links to underlying documents via "View all documents →". The artifact is a map of a decision; the documents are the actual work products.

**What's NR-specific:** The specific documents (founding principles doc, entity structure analysis, etc.).

**What generalizes:** A session that produces multiple deliverables needs a registry that tracks: what was produced, when, by whom, where it lives, and which building block it supports. This connects to the knowledge loop — documents shared via share-with-team become entries in the registry.

**Abstraction:**
```
DocumentRegistry {
  documents: DocumentRef[] {
    title: string
    url: string
    blockId: string                     // Which building block this supports
    createdDate: string
    createdBy: string
    type: "exploration" | "decision" | "reference" | "artifact"
  }
}
```

---

## How these map to the marketplace file structure

```
domains/finance/sessions/ownership-structure/
├── session.json          # SessionTemplate with intake, workflow, checkpoints
├── SKILL.md              # Orchestration: how to guide the ownership conversation
├── trigger.json          # Evaluate × Validating × Finance
└── components/           # NEW: reusable UI/data components
    └── framework-map.json  # DecisionFramework definition for this session
                            # (phases, blocks, scoring views — NR-specific content)

core/components/            # NEW: shared primitives
├── decision-framework/     # The DecisionFrameworkMap renderer
│   ├── schema.json         # DecisionFramework schema
│   └── COMPONENT.md        # How to generate a framework map artifact
├── building-block/         # BuildingBlock + StatusDots + HoverDetail
│   ├── schema.json
│   └── COMPONENT.md
├── scoring-system/         # DualScoringSystem with configurable views
│   ├── schema.json
│   └── COMPONENT.md
└── document-registry/      # DocumentRegistry linked to knowledge loop
    ├── schema.json
    └── COMPONENT.md
```

The session provides the **content** (which phases, which blocks, which scoring dimensions). The core components provide the **rendering and interaction patterns**. A new session in a different domain reuses the same components with different content — a pricing strategy session uses DecisionFrameworkMap with pricing-specific phases and blocks, rendered with the same StatusDots and HoverDetailCards.

---

## The key insight

Kelly's artifact isn't really a "cap table tool." It's a **decision architecture dashboard** — a way to decompose a complex multi-stakeholder decision into building blocks, track their readiness, assess their importance, and link to the underlying work products. The ownership split is the content; the framework map is the structure.

That structure is the reusable primitive. Every Evaluate-phase session in the marketplace could produce one of these as its output artifact.
