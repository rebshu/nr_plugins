import { useState } from "react";

const VIEWS = ["Architecture", "Phasing", "Schema", "Authority", "Integration Points", "Flow"];

// Mode 2: Structured / Internal
const theme = {
  bg: "#F5F2ED",
  surface: "#FAFAF7",
  border: "rgba(120,110,100,0.12)",
  borderActive: "rgba(120,110,100,0.3)",
  text: "#2C2A26",
  textMuted: "#7A756D",
  accent: "#3D3B37",
  mono: "'IBM Plex Mono', 'SF Mono', monospace",
  sans: "'IBM Plex Sans', 'Inter', system-ui, sans-serif",
  pill: { bg: "#2C2A26", text: "#F5F2ED" },
  tag: { bg: "rgba(120,110,100,0.08)", text: "#5A5650" },
  layers: {
    L0: "#B8D4C8", L1: "#C4B8D4", L2a: "#8BB8D0", L2b: "#D4C8B8",
    L3: "#A8C8A8", L4: "#C8B8A0", L5: "#D0A8A8",
  },
};

function Pill({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: theme.mono,
        fontSize: 12,
        padding: "6px 16px",
        borderRadius: 100,
        border: "none",
        cursor: "pointer",
        background: active ? theme.pill.bg : "transparent",
        color: active ? theme.pill.text : theme.textMuted,
        fontWeight: 500,
        transition: "all 0.15s ease",
      }}
    >
      {children}
    </button>
  );
}

function Tag({ children, color }) {
  return (
    <span
      style={{
        fontFamily: theme.mono,
        fontSize: 10,
        padding: "2px 8px",
        borderRadius: 100,
        background: color || theme.tag.bg,
        color: color ? theme.accent : theme.tag.text,
        fontWeight: 500,
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </span>
  );
}

function Section({ title, children, indent }) {
  return (
    <div style={{ marginBottom: 28, marginLeft: indent ? 20 : 0 }}>
      <div
        style={{
          fontFamily: theme.mono,
          fontSize: 11,
          color: theme.textMuted,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 10,
          fontWeight: 600,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function SchemaBlock({ name, fields, note }) {
  return (
    <div
      style={{
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: 6,
        padding: 16,
        marginBottom: 12,
        fontFamily: theme.mono,
        fontSize: 12,
        lineHeight: 1.7,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 8, color: theme.accent, fontSize: 13 }}>
        {name}
      </div>
      {fields.map((f, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <span style={{ color: theme.textMuted, minWidth: 140, flexShrink: 0 }}>{f.name}</span>
          <span style={{ color: theme.accent }}>{f.type}</span>
          {f.note && (
            <span style={{ color: theme.textMuted, fontSize: 11, fontStyle: "italic" }}>
              — {f.note}
            </span>
          )}
        </div>
      ))}
      {note && (
        <div
          style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: `1px solid ${theme.border}`,
            color: theme.textMuted,
            fontSize: 11,
            fontFamily: theme.sans,
            lineHeight: 1.5,
          }}
        >
          {note}
        </div>
      )}
    </div>
  );
}

function LayerRow({ id, label, color, description, retrievalUse }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 6,
        cursor: "pointer",
        background: open ? `${color}18` : "transparent",
        border: `1px solid ${open ? `${color}40` : "transparent"}`,
        transition: "all 0.15s ease",
        marginBottom: 4,
      }}
    >
      <div
        style={{
          width: 36,
          height: 24,
          borderRadius: 4,
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: theme.mono,
          fontSize: 10,
          fontWeight: 700,
          color: theme.accent,
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        {id}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: theme.sans, fontSize: 13, fontWeight: 600, color: theme.text }}>
          {label}
        </div>
        {open && (
          <div style={{ marginTop: 6 }}>
            <div style={{ fontFamily: theme.sans, fontSize: 12, color: theme.textMuted, lineHeight: 1.5, marginBottom: 6 }}>
              {description}
            </div>
            <div
              style={{
                fontFamily: theme.mono,
                fontSize: 11,
                color: theme.accent,
                background: `${color}15`,
                padding: "6px 10px",
                borderRadius: 4,
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: theme.textMuted }}>retrieval use →</span> {retrievalUse}
            </div>
          </div>
        )}
      </div>
      <span style={{ fontFamily: theme.mono, fontSize: 10, color: theme.textMuted }}>
        {open ? "▾" : "▸"}
      </span>
    </div>
  );
}

function ArchitectureView() {
  return (
    <div>
      <div style={{ fontFamily: theme.sans, fontSize: 14, color: theme.textMuted, lineHeight: 1.6, marginBottom: 28 }}>
        Two retrieval dimensions converge through the Decomposition Resolver. The intent payload
        tells the system <em>what kind of knowledge</em> to retrieve. The Document Hub provides
        the corpus. The resolver coordinates both using the L0–L5 layer structure as its query grammar.
      </div>

      <Section title="Previous State — load-context v0.2.0">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
          }}
        >
          {[
            { mode: "Mode 1", label: "General Briefing", input: "No intent. Recency-based scan.", output: "Category-grouped summary" },
            { mode: "Mode 2", label: "Topic Lookup", input: "Topic keyword.", output: "Synthesized briefing" },
            { mode: "Mode 3", label: "Session Priming", input: "Task description (unstructured).", output: "Silent context load" },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 6,
                padding: 14,
              }}
            >
              <Tag>{m.mode}</Tag>
              <div style={{ fontFamily: theme.sans, fontSize: 13, fontWeight: 600, marginTop: 8, marginBottom: 6 }}>
                {m.label}
              </div>
              <div style={{ fontFamily: theme.mono, fontSize: 11, color: theme.textMuted, lineHeight: 1.5 }}>
                <div><span style={{ opacity: 0.6 }}>in:</span> {m.input}</div>
                <div><span style={{ opacity: 0.6 }}>out:</span> {m.output}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Current State — load-context v0.3.0 (shipped)">
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <div
            style={{
              flex: 1,
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: 6,
              padding: 16,
            }}
          >
            <div style={{ fontFamily: theme.mono, fontSize: 11, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, fontWeight: 600 }}>
              Dimension 1 — Supply
            </div>
            <div style={{ fontFamily: theme.sans, fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
              What Exists
            </div>
            <div style={{ fontFamily: theme.sans, fontSize: 12, color: theme.textMuted, lineHeight: 1.5 }}>
              Document Hub corpus, indexed and optionally decomposed into L0–L5 layers. Each artifact tagged with a <strong>context authority</strong> level. Retrieval via Context Index (structured) + vector search (semantic).
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", fontFamily: theme.mono, fontSize: 18, color: theme.textMuted }}>×</div>
          <div
            style={{
              flex: 1,
              background: theme.surface,
              border: `1px solid ${theme.borderActive}`,
              borderRadius: 6,
              padding: 16,
            }}
          >
            <div style={{ fontFamily: theme.mono, fontSize: 11, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, fontWeight: 600 }}>
              Dimension 2 — Demand (new)
            </div>
            <div style={{ fontFamily: theme.sans, fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
              What You Need
            </div>
            <div style={{ fontFamily: theme.sans, fontSize: 12, color: theme.textMuted, lineHeight: 1.5 }}>
              Intent payload: stage, goal, task archetype, target layers. Tells the retrieval system what <em>kind</em> of thinking the user needs, not just what <em>topic</em>.
            </div>
          </div>
        </div>

        {/* Three-phase retrieval */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[
            { phase: "Phase 1", label: "Pre-load foundational", desc: "Brand guidelines, legal, values — always loaded when domain matches. Bypasses scoring.", color: "#C8B8A0" },
            { phase: "Phase 2", label: "Score & retrieve", desc: "Referential + exploratory docs scored by intent × layer × recency. Ranked retrieval.", color: theme.layers.L2a },
            { phase: "Phase 3", label: "Gap check & report", desc: "Compare coverage vs. intent needs. Surface missing layers. Prompt decomposition.", color: theme.layers.L3 },
          ].map((p, i) => (
            <div key={i} style={{ flex: 1, background: `${p.color}15`, border: `1px solid ${p.color}40`, borderRadius: 6, padding: 14 }}>
              <div style={{ fontFamily: theme.mono, fontSize: 10, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{p.phase}</div>
              <div style={{ fontFamily: theme.sans, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{p.label}</div>
              <div style={{ fontFamily: theme.sans, fontSize: 11, color: theme.textMuted, lineHeight: 1.4 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: `${theme.layers.L2a}15`,
            border: `1px solid ${theme.layers.L2a}40`,
            borderRadius: 6,
            padding: 16,
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: theme.mono, fontSize: 11, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4, fontWeight: 600 }}>
            Convergence Point
          </div>
          <div style={{ fontFamily: theme.sans, fontSize: 14, fontWeight: 600 }}>
            resolveRetrieval(intentPayload, corpusIndex) → RetrievalPlan
          </div>
          <div style={{ fontFamily: theme.sans, fontSize: 12, color: theme.textMuted, marginTop: 4 }}>
            Pre-loads foundational context → scores remaining by intent × layer → merges into ranked set with authority annotations
          </div>
        </div>
      </Section>
    </div>
  );
}

function PhasingView() {
  const phases = [
    {
      version: "v0.3.0",
      label: "Ship Now",
      color: theme.layers.L3,
      description: "Core thesis: intent-aware retrieval with authority-differentiated context. Three changes to load-context, one to share-with-team. Works with the existing 60-doc knowledge base, existing Notion infrastructure, no new background processes.",
      items: [
        {
          type: "Integration",
          id: "IP-1",
          title: "Intent Construction",
          detail: "Add IntentPayload construction before index fetch. Infer archetype from user request. This is the single highest-value change — structures what was previously implicit.",
          effort: "Small — one new step in SKILL.md instructions",
        },
        {
          type: "Integration",
          id: "IP-0",
          title: "Authority Tagging (simplified)",
          detail: "Add authority level question to share-with-team. Only the level field (foundational / referential / exploratory). No scope, no expiration, no supersedes. Default to referential — one tap for most shares.",
          effort: "Small — one AskUserQuestion + one metadata field on Notion page",
        },
        {
          type: "Integration",
          id: "IP-4",
          title: "Gap Reporting",
          detail: "After retrieval, compare what was loaded against what the archetype needs. Surface missing layers as actionable prompts. Drives decomposition organically.",
          effort: "Small — additive step after existing retrieval",
        },
        {
          type: "Schema",
          id: "IntentPayload",
          title: "IntentPayload (simplified)",
          detail: "task, goal, archetype, entityType, domain. No version tracking, no previousArchetypes. Constructed once per session. Archetype is mutable by re-invoking load-context, not by automatic detection.",
          effort: "Definition only — consumed by SKILL.md instructions, not code",
        },
        {
          type: "Schema",
          id: "ContextAuthority",
          title: "ContextAuthority (level only)",
          detail: "Just the level field. Tagged at share time. Foundational docs get pre-loaded when domain matches. Everything else scored normally. No expiration, no supersedes, no scope.",
          effort: "One metadata field on Document Hub entries",
        },
        {
          type: "Rule",
          id: "Contradiction",
          title: "Contradiction rule (not schema)",
          detail: "If two retrieved docs cover the same domain and say different things, flag it in the output. Plain language, not a typed schema. 'Note: [doc A] and [doc B] differ on market sizing — presenting both.' No persistent storage, no resolution workflow.",
          effort: "Behavioral instruction in SKILL.md — no schema needed",
        },
      ],
    },
    {
      version: "v0.4.0",
      label: "Next Quarter",
      color: theme.layers.L2a,
      description: "Layer-aware retrieval and decomposition integration. Requires decomposed content to exist in the Document Hub. Ship after the team has decomposed 10-15 knowledge items into L0–L5 layers.",
      prereq: "Prerequisite: team has tagged 10+ docs with layer metadata through regular use",
      items: [
        {
          type: "Integration",
          id: "IP-2",
          title: "Layer-Aware Index Filtering",
          detail: "Score index entries against IntentPayload's target layers. Decomposed entries rank by layer match. Undecomposed entries fall back to current behavior.",
          effort: "Medium — requires layer metadata on index entries",
        },
        {
          type: "Integration",
          id: "IP-3",
          title: "Decomposition Resolver Bridge",
          detail: "For decomposed entries, call resolveDecomposition to get stage-filtered, flattened knowledge at requested layers. The L0–L5 schema starts being consumed.",
          effort: "Medium — new utility function, depends on decomposed primitives",
        },
        {
          type: "Schema",
          id: "ContextAuthority",
          title: "ContextAuthority (full)",
          detail: "Add scope (universal / domain / entity), expires, and supersedes fields. Needed when you have enough foundational docs that versioning and scoping matter.",
          effort: "Schema extension + share-with-team conditional prompts",
        },
        {
          type: "Schema",
          id: "LayerPriority",
          title: "LayerPriority with archetype defaults",
          detail: "Formalize the archetype → layer mapping. Still as natural language priorities in SKILL.md, not numeric weights. 'For Decide, prioritize decisions and dependencies.'",
          effort: "SKILL.md refinement — no scoring engine",
        },
        {
          type: "Schema",
          id: "RetrievalPlan",
          title: "RetrievalPlan (three tiers)",
          detail: "Formalize foundational / structured / unstructured separation. Foundational pre-loads, structured from decomposed items, unstructured fills gaps.",
          effort: "Structural change to how load-context organizes its output",
        },
      ],
    },
    {
      version: "v0.5.0",
      label: "Scale Phase",
      color: theme.layers.L1,
      description: "Systems that become valuable at 200+ docs, multiple team members, and cross-session patterns. These solve problems you don't have yet but will hit as the knowledge base grows.",
      prereq: "Prerequisite: 150+ Document Hub entries, vector retrieval path active, 3+ active team members",
      items: [
        {
          type: "Integration",
          id: "IP-5",
          title: "Contradiction Detection (full schema)",
          detail: "ContextContradiction with severity, typed resolution methods, persistent storage. Pairwise comparison of retrieved docs. Scoped resolution for context-dependent truths.",
          effort: "Medium-high — new schema, detection logic, resolution workflow",
        },
        {
          type: "Integration",
          id: "IP-6",
          title: "Mutable Archetype with Incremental Retrieval",
          detail: "IntentPayload versioning, automatic archetype shift detection, delta-based re-retrieval. Foundational persists, only scored docs re-run on shift.",
          effort: "High — requires intent monitoring and incremental retrieval logic",
        },
        {
          type: "Integration",
          id: "IP-7",
          title: "Semantic Density Monitoring",
          detail: "Background process computing ρ per domain × layer. Alerts when retrieval accuracy likely degrading. Runs against the actual database on a schedule.",
          effort: "Medium — scheduled process, embedding computation, health dashboard",
        },
        {
          type: "Schema",
          id: "SemanticDensityReport",
          title: "SemanticDensityReport",
          detail: "Full schema with ρ thresholds, cluster identification, auto-generated consolidation recommendations.",
          effort: "Schema + background process + alerting",
        },
        {
          type: "Schema",
          id: "ContradictionResolution",
          title: "ContradictionResolution (typed methods)",
          detail: "recency, authority, corroboration, manual, scoped. Resolution workflow with rationale tracking and team member attribution.",
          effort: "Schema + UX for resolution flow",
        },
      ],
    },
  ];

  return (
    <div>
      <div style={{ fontFamily: theme.sans, fontSize: 14, color: theme.textMuted, lineHeight: 1.6, marginBottom: 28 }}>
        The full spec has seven types and eight integration points. Not all of it needs to ship at once.
        This phasing maps what to build now vs. what to build when the system earns the complexity — based
        on knowledge base size, decomposition coverage, and team usage patterns.
      </div>

      {phases.map((phase, pi) => (
        <div key={pi} style={{ marginBottom: 32 }}>
          {/* Phase header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{
              background: phase.color,
              borderRadius: 100,
              padding: "5px 14px",
              fontFamily: theme.mono,
              fontSize: 12,
              fontWeight: 700,
              color: theme.accent,
            }}>
              {phase.version}
            </div>
            <span style={{ fontFamily: theme.sans, fontSize: 16, fontWeight: 600 }}>{phase.label}</span>
          </div>

          <div style={{
            fontFamily: theme.sans, fontSize: 13, color: theme.textMuted, lineHeight: 1.6,
            marginBottom: phase.prereq ? 8 : 14, paddingLeft: 2,
          }}>
            {phase.description}
          </div>

          {phase.prereq && (
            <div style={{
              fontFamily: theme.mono, fontSize: 11, color: phase.color,
              marginBottom: 14, paddingLeft: 2,
              fontStyle: "italic",
            }}>
              {phase.prereq}
            </div>
          )}

          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {phase.items.map((item, ii) => (
              <div key={ii} style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderLeft: `3px solid ${phase.color}`,
                borderRadius: 6,
                padding: "12px 16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{
                    fontFamily: theme.mono, fontSize: 9, fontWeight: 600,
                    background: theme.tag.bg, color: theme.tag.text,
                    padding: "2px 7px", borderRadius: 100,
                    textTransform: "uppercase", letterSpacing: "0.06em",
                  }}>
                    {item.type}
                  </span>
                  <span style={{
                    fontFamily: theme.mono, fontSize: 10, color: theme.textMuted,
                  }}>
                    {item.id}
                  </span>
                  <span style={{ fontFamily: theme.sans, fontSize: 13, fontWeight: 600, color: theme.text }}>
                    {item.title}
                  </span>
                </div>
                <div style={{ fontFamily: theme.sans, fontSize: 12, color: theme.textMuted, lineHeight: 1.5, marginBottom: 6, paddingLeft: 2 }}>
                  {item.detail}
                </div>
                <div style={{ fontFamily: theme.mono, fontSize: 10, color: theme.textMuted, paddingLeft: 2 }}>
                  effort: {item.effort}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Summary bar */}
      <div style={{
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: 6,
        padding: 16,
        marginTop: 8,
      }}>
        <div style={{ fontFamily: theme.mono, fontSize: 11, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10, fontWeight: 600 }}>
          Complexity Budget
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { v: "v0.3.0", types: 2, ips: 3, rule: "+ 1 behavioral rule", color: phases[0].color },
            { v: "v0.4.0", types: "+2 extended", ips: "+2", rule: "", color: phases[1].color },
            { v: "v0.5.0", types: "+3 new", ips: "+3", rule: "+ background process", color: phases[2].color },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
              <div style={{ fontFamily: theme.mono, fontSize: 11 }}>
                <span style={{ fontWeight: 700 }}>{s.v}</span>
                <span style={{ color: theme.textMuted }}> — {s.types} types, {s.ips} IPs{s.rule ? `, ${s.rule}` : ""}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SchemaView() {
  return (
    <div>
      <div style={{ fontFamily: theme.sans, fontSize: 14, color: theme.textMuted, lineHeight: 1.6, marginBottom: 28 }}>
        Seven types. IntentPayload packages what the user is trying to accomplish — and is
        mutable mid-session as work mode shifts. ContextAuthority determines how each artifact
        participates in retrieval. ContextContradiction surfaces conflicts instead of silently
        serving both sides. SemanticDensityReport monitors retrieval health at the database level.
      </div>

      <SchemaBlock
        name="IntentPayload"
        fields={[
          { name: "task", type: "string", note: "what the user is doing" },
          { name: "goal", type: "string", note: "why — the outcome they want" },
          { name: "stage", type: "CompanyStage?", note: "from OrgProfile if available" },
          { name: "archetype", type: "TaskArchetype", note: "Orient | Explore | Decide | Build | Review | Share — MUTABLE" },
          { name: "targetLayers", type: "LayerPriority[]?", note: "re-inferred when archetype changes" },
          { name: "entityType", type: "string?", note: "client, product, market, team, etc." },
          { name: "domain", type: "string?", note: "used to match foundational docs for pre-load" },
          { name: "priorContext", type: "string[]?", note: "doc IDs already loaded this session" },
          { name: "version", type: "number", note: "increments on each reconstruction — starts at 1" },
          { name: "previousArchetypes", type: "TaskArchetype[]?", note: "history of archetype shifts this session" },
        ]}
        note="Constructed at session start, reconstructed mid-session when work mode shifts. 'Pull up our pricing decision' (Orient) → 'how does that compare to competitors' (Explore) → 'draft me a pricing page' (Build). Each shift reconstructs targetLayers and may trigger incremental retrieval for newly-needed layers. Foundational context persists across reconstructions — only scored retrieval re-runs."
      />

      <SchemaBlock
        name="ContextAuthority"
        fields={[
          { name: "level", type: "'foundational' | 'referential' | 'exploratory'" },
          { name: "domains", type: "string[]", note: "which domains this binds to — brand, legal, product, etc." },
          { name: "scope", type: "'universal' | 'domain' | 'entity'", note: "universal = always, domain = when domain matches, entity = specific entity only" },
          { name: "expires", type: "date?", note: "foundational docs can expire (e.g. quarterly OKRs)" },
          { name: "supersedes", type: "string?", note: "docId this replaces — prevents loading stale foundational docs" },
        ]}
        note="Tagged at share time (share-with-team). Foundational docs bypass relevance scoring and are pre-loaded when domain matches the intent. Referential docs are scored normally. Exploratory docs carry a penalty weight — they surface only when highly relevant, and are presented as input rather than settled knowledge."
      />

      <SchemaBlock
        name="LayerPriority"
        fields={[
          { name: "layer", type: "L0 | L1 | L2a | L2b | L3 | L4 | L5" },
          { name: "weight", type: "number", note: "0–1, how much this layer matters for this intent" },
          { name: "required", type: "boolean", note: "must have this layer or retrieval is incomplete" },
        ]}
        note="Different archetypes produce different default layer priorities. 'Decide' weights L0 + L2a heavily. 'Build' weights L3 + L2b. 'Orient' distributes evenly."
      />

      <SchemaBlock
        name="ContextContradiction"
        fields={[
          { name: "id", type: "string", note: "hash(docA_id ‖ docB_id ‖ domain)" },
          { name: "docA", type: "string", note: "first document ID" },
          { name: "docB", type: "string", note: "second document ID" },
          { name: "domain", type: "string", note: "which domain the conflict lives in" },
          { name: "layer", type: "Layer?", note: "which decomposition layer, if both are decomposed" },
          { name: "description", type: "string", note: "what the contradiction is, in plain language" },
          { name: "severity", type: "'blocking' | 'material' | 'minor'", note: "blocking = can't proceed without resolution" },
          { name: "resolution", type: "ContradictionResolution?", note: "null until resolved" },
          { name: "detectedAt", type: "date" },
          { name: "detectedBy", type: "'retrieval' | 'share' | 'density-monitor'", note: "when was it caught" },
        ]}
        note="Created when two retrieved artifacts make conflicting claims. Key design: contradictions are surfaced to the user, never silently resolved. The system holds the tension and presents both sides with context. Resolution requires explicit human action."
      />

      <SchemaBlock
        name="ContradictionResolution"
        fields={[
          { name: "method", type: "'recency' | 'authority' | 'corroboration' | 'manual' | 'scoped'", note: "how it was resolved" },
          { name: "winner", type: "string?", note: "docId that prevails (null if scoped — both valid in different contexts)" },
          { name: "rationale", type: "string", note: "why this resolution was chosen" },
          { name: "resolvedBy", type: "string", note: "team member who made the call" },
          { name: "resolvedAt", type: "date" },
        ]}
        note="'scoped' is the key method — both docs are correct but in different contexts (e.g. market size varies by methodology). Scoped resolution adds context annotations rather than picking a winner."
      />

      <SchemaBlock
        name="RetrievalPlan"
        fields={[
          { name: "foundational", type: "RetrievalItem[]", note: "pre-loaded, not scored — the ground truth floor" },
          { name: "structured", type: "RetrievalItem[]", note: "from decomposed primitives, scored by layer match" },
          { name: "unstructured", type: "RetrievalItem[]", note: "from index/vector search, broader coverage" },
          { name: "contradictions", type: "ContextContradiction[]", note: "conflicts detected in retrieved set — ALWAYS surfaced" },
          { name: "layerCoverage", type: "Map<Layer, number>", note: "how well each requested layer is covered" },
          { name: "gaps", type: "string[]", note: "layers requested but not found — surface to user" },
          { name: "intentVersion", type: "number", note: "which IntentPayload version produced this plan" },
        ]}
        note="Four tiers. Foundational (floor) → Structured (precision) → Unstructured (breadth) → Contradictions (always surfaced, never hidden). intentVersion tracks which reconstruction of the payload produced this plan, enabling incremental retrieval on archetype shifts."
      />

      <SchemaBlock
        name="RetrievalItem"
        fields={[
          { name: "docId", type: "string" },
          { name: "title", type: "string" },
          { name: "source", type: "'decomposed' | 'index' | 'vector' | 'search'" },
          { name: "authority", type: "ContextAuthority", note: "foundational / referential / exploratory" },
          { name: "layers", type: "Layer[]", note: "which L0–L5 layers this doc provides" },
          { name: "relevanceScore", type: "number", note: "composite: layer match + recency + semantic (0 for foundational)" },
          { name: "stageMatch", type: "boolean", note: "does this doc's stage context match the intent?" },
          { name: "contradicts", type: "string[]?", note: "docIds this item conflicts with — links to ContextContradiction" },
        ]}
        note="Foundational items have relevanceScore = 0 (not scored, just loaded). Structured items rank above unstructured at equal relevance. Exploratory items carry a 0.7× penalty. Items with active contradictions are always flagged in presentation."
      />

      <SchemaBlock
        name="SemanticDensityReport"
        fields={[
          { name: "domain", type: "string", note: "which knowledge domain" },
          { name: "layer", type: "Layer?", note: "optional — density per layer within domain" },
          { name: "docCount", type: "number", note: "how many docs in this domain/layer" },
          { name: "rho", type: "number", note: "mean pairwise cosine similarity — higher = more crowded" },
          { name: "rhoThreshold", type: "number", note: "alert when ρ exceeds this (default 0.85)" },
          { name: "status", type: "'healthy' | 'crowding' | 'critical'", note: "healthy < 0.75, crowding 0.75–0.85, critical > 0.85" },
          { name: "topCluster", type: "string[]", note: "docIds of the most tightly clustered group — candidates for consolidation" },
          { name: "recommendation", type: "string", note: "auto-generated: consolidate, decompose further, or add disambiguating metadata" },
          { name: "computedAt", type: "date" },
        ]}
        note="Generated by background process running against the Document Hub database. Not part of the retrieval flow — runs on a schedule (daily or on-share). Surfaces as a system health metric. When ρ crosses threshold, the team gets a prompt: 'Your [domain] knowledge is getting crowded — retrieval accuracy may degrade. Consider consolidating these 5 docs or adding layer decomposition.'"
      />

      <Section title="Archetype → Layer Mapping (Defaults)">
        <div style={{ fontFamily: theme.mono, fontSize: 12, lineHeight: 1.8 }}>
          {[
            { arch: "Orient", layers: "L0 (0.8) · L1 (0.6) · L3 (0.3)", note: "problem + framework, light on tasks" },
            { arch: "Explore", layers: "L0 (0.9) · L1 (0.8) · L4 (0.5)", note: "problem + frameworks + what connects" },
            { arch: "Decide", layers: "L0 (0.7) · L2a (1.0) · L4 (0.6) · L5 (0.4)", note: "decisions + dependencies + audit trail" },
            { arch: "Build", layers: "L2b (0.9) · L3 (1.0) · L4 (0.7)", note: "process + tasks + dependencies" },
            { arch: "Review", layers: "L0 (0.6) · L2a (0.8) · L5 (0.9)", note: "original intent + decisions + audit" },
            { arch: "Share", layers: "L0 (0.5) · L1 (0.4) · L3 (0.3)", note: "light context, enough to frame the output" },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 1fr",
                gap: 12,
                padding: "6px 10px",
                borderRadius: 4,
                background: i % 2 === 0 ? `${theme.border}` : "transparent",
              }}
            >
              <span style={{ fontWeight: 700 }}>{row.arch}</span>
              <span>{row.layers}</span>
              <span style={{ color: theme.textMuted, fontSize: 11, fontStyle: "italic" }}>{row.note}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function AuthorityView() {
  const levels = [
    {
      level: "Foundational",
      color: "#8B7355",
      behavior: "Always pre-loaded when domain matches. Bypasses relevance scoring. Treated as constraints, not suggestions.",
      examples: "Brand guidelines, legal constraints, company values, established pricing model, approved messaging framework, security policies",
      retrieval: "Loaded before scored retrieval runs. Forms the context floor. Cannot be outranked by exploratory content.",
      sharePrompt: "When sharing, ask: 'Is this a rule/constraint the team must follow, or input for consideration?'",
      scope: "Typically universal or domain-scoped. Rarely entity-specific.",
    },
    {
      level: "Referential",
      color: theme.layers.L2a,
      behavior: "Scored by relevance engine. Loaded when layer + domain + recency match the intent. Treated as settled knowledge.",
      examples: "Ratified decisions, validated frameworks, completed analyses, client research synthesis, architecture docs, post-mortems",
      retrieval: "Normal scoring: layer match × recency × semantic similarity × stage match. Ranked in the structured or unstructured tiers.",
      sharePrompt: "Default level. Most team knowledge is referential — it's been produced and reviewed but isn't a binding constraint.",
      scope: "Usually domain-scoped. Decision records may be entity-specific.",
    },
    {
      level: "Exploratory",
      color: theme.layers.L1,
      behavior: "Scored with a 0.7× penalty. Only surfaces when highly relevant. Presented as input, not conclusion.",
      examples: "Early research, brainstorm outputs, market hypotheses, draft strategies, competitive scans, speculative frameworks",
      retrieval: "Penalty weight means exploratory content only surfaces when the intent strongly matches. Prevents half-formed ideas from displacing settled knowledge.",
      sharePrompt: "When sharing, ask: 'Is this still being evaluated, or has the team validated it?'",
      scope: "Often entity-specific or time-bound. May graduate to referential after validation.",
    },
  ];

  return (
    <div>
      <div style={{ fontFamily: theme.sans, fontSize: 14, color: theme.textMuted, lineHeight: 1.6, marginBottom: 28 }}>
        Context authority is a property of the <em>artifact</em>, not the layer. Two L1 frameworks
        can have different authority — a validated pricing model is foundational, an early market
        hypothesis is exploratory. Authority determines how the retrieval system treats each
        artifact: as a constraint, as knowledge, or as input.
      </div>

      {/* Spectrum visualization */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 8 }}>
          <div style={{ flex: 1, height: 6, borderRadius: "3px 0 0 3px", background: `linear-gradient(90deg, #8B7355, ${theme.layers.L2a})` }} />
          <div style={{ flex: 1, height: 6, borderRadius: "0 3px 3px 0", background: `linear-gradient(90deg, ${theme.layers.L2a}, ${theme.layers.L1})` }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: theme.mono, fontSize: 10, color: theme.textMuted }}>
          <span>rules-based · binding</span>
          <span>settled knowledge</span>
          <span>exploratory · input</span>
        </div>
      </div>

      {levels.map((l, i) => (
        <div
          key={i}
          style={{
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderLeft: `3px solid ${l.color}`,
            borderRadius: 6,
            padding: 18,
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{
              fontFamily: theme.mono, fontSize: 12, fontWeight: 700,
              background: `${l.color}20`, color: l.color === "#8B7355" ? "#8B7355" : theme.accent,
              padding: "4px 12px", borderRadius: 100,
            }}>
              {l.level}
            </span>
          </div>

          {[
            { label: "behavior", value: l.behavior },
            { label: "examples", value: l.examples },
            { label: "retrieval", value: l.retrieval },
            { label: "share-time prompt", value: l.sharePrompt },
            { label: "typical scope", value: l.scope },
          ].map((row, j) => (
            <div key={j} style={{ display: "flex", gap: 12, marginBottom: 6, alignItems: "flex-start" }}>
              <span style={{ fontFamily: theme.mono, fontSize: 10, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", minWidth: 120, flexShrink: 0, paddingTop: 2 }}>
                {row.label}
              </span>
              <span style={{ fontFamily: theme.sans, fontSize: 12, color: theme.text, lineHeight: 1.5 }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      ))}

      <Section title="Authority × Layer Interaction">
        <div style={{ fontFamily: theme.sans, fontSize: 13, color: theme.textMuted, lineHeight: 1.6, marginBottom: 16 }}>
          Authority is orthogonal to layers — any layer can have any authority level. But some combinations are more common, and the retrieval system should recognize the natural affinities.
        </div>
        <div style={{ fontFamily: theme.mono, fontSize: 12, lineHeight: 1.8 }}>
          {[
            { combo: "L0 + Foundational", example: "Core mission statement, non-negotiable problem framing", freq: "Common" },
            { combo: "L1 + Foundational", example: "Validated pricing model, approved brand framework", freq: "Common" },
            { combo: "L1 + Exploratory", example: "Draft market segmentation hypothesis", freq: "Common" },
            { combo: "L2a + Referential", example: "Board-approved equity split decision", freq: "Typical" },
            { combo: "L2a + Exploratory", example: "Preliminary thoughts on pricing tiers", freq: "Common" },
            { combo: "L2b + Foundational", example: "Legal compliance process, security review flow", freq: "Occasional" },
            { combo: "L3 + Referential", example: "Sprint tasks, quarterly priorities", freq: "Typical" },
            { combo: "L5 + Foundational", example: "Regulatory audit trail, governance log", freq: "Occasional" },
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "180px 1fr 80px", gap: 12,
              padding: "6px 10px", borderRadius: 4,
              background: i % 2 === 0 ? theme.border : "transparent",
            }}>
              <span style={{ fontWeight: 600 }}>{row.combo}</span>
              <span style={{ color: theme.textMuted, fontSize: 11 }}>{row.example}</span>
              <span style={{ color: theme.textMuted, fontSize: 10, textAlign: "right" }}>{row.freq}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Lifecycle: Authority Can Change">
        <div style={{ fontFamily: theme.sans, fontSize: 13, color: theme.textMuted, lineHeight: 1.6 }}>
          Artifacts aren't locked to an authority level forever. A common pattern: research starts as
          exploratory, gets validated through a founder panel or client test, and graduates to referential.
          If the team then adopts it as a standard, it becomes foundational. The share-with-team skill
          should support re-tagging authority on existing docs, not just new ones. Foundational docs
          can also expire (quarterly OKRs, time-bound strategies) — the <code>expires</code> field
          handles this, automatically demoting to referential when the date passes.
        </div>
      </Section>
    </div>
  );
}

function IntegrationView() {
  return (
    <div>
      <div style={{ fontFamily: theme.sans, fontSize: 14, color: theme.textMuted, lineHeight: 1.6, marginBottom: 28 }}>
        Eight integration points between the plugin skill layer and the decomposition schema.
        IP-0 through IP-4 are retrieval-time. IP-5 is contradiction detection. IP-6 enables
        mid-session archetype shifts. IP-7 is a background process on the database.
      </div>

      {[
        {
          id: "IP-0",
          title: "Authority Tagging at Share Time",
          where: "share-with-team SKILL.md — metadata collection step",
          what: "When a team member shares an artifact to the Document Hub, prompt them to classify its context authority: foundational (this is a rule/constraint), referential (this is settled knowledge), or exploratory (this is still being evaluated). Also capture domain scope and expiration if foundational.",
          change: "Add an authority question to the share-with-team intake. Default to referential. If the user selects foundational, prompt for domain scope (universal, domain-specific, entity-specific) and optional expiration date. Store as metadata on the Notion page.",
          risk: "Low. One additional question at share time. The key risk is user fatigue — keep the default path fast (referential, no follow-ups). Foundational should feel deliberate.",
        },
        {
          id: "IP-1",
          title: "Intent Construction",
          where: "load-context SKILL.md — Mode 3 entry point",
          what: "Before fetching the Context Index, construct an IntentPayload from the user's request. Infer archetype from the skill/session being invoked. If the user said 'I'm writing a proposal for X', archetype = Build, entityType = client, goal = 'produce client-ready proposal'.",
          change: "Add a Step -1 before Step 0. Parse user input → IntentPayload. If mode is 1 (general briefing), archetype defaults to Orient with no goal. If mode is 2 (topic), archetype defaults to Explore with the topic as goal.",
          risk: "Low. Additive change. Doesn't break existing modes — just adds a structured representation of what was previously implicit.",
        },
        {
          id: "IP-2",
          title: "Layer-Aware Index Filtering",
          where: "load-context SKILL.md — Step 0 (Context Index scan)",
          what: "After fetching the Context Index, score each entry against the IntentPayload's target layers. Entries with decomposition metadata get scored by layer match. Entries without metadata get scored by category/recency (current behavior).",
          change: "Modify the index scan to produce a ranked list instead of a flat category grouping. Decomposed entries with layer annotations rank by layer relevance. Undecomposed entries use the existing heuristics as fallback.",
          risk: "Medium. Requires decomposition metadata on index entries. In early days, most entries won't have it — the fallback path must remain solid.",
        },
        {
          id: "IP-3",
          title: "Decomposition Resolver Bridge",
          where: "New utility — called by load-context after index scan",
          what: "For entries that have been decomposed into L0–L5, call resolveDecomposition(raw, { stage, entityType }) to get the flattened, stage-specific version. Return only the layers that match the IntentPayload's priorities.",
          change: "New function. Takes a set of decomposed primitives + IntentPayload, returns filtered/flattened knowledge at the requested layers. This is where the L0–L5 schema actually gets consumed.",
          risk: "Medium-high. Depends on decomposed primitives existing. This is the cold-start problem — the function is only useful once enough knowledge has been decomposed.",
        },
        {
          id: "IP-4",
          title: "Gap Reporting",
          where: "load-context SKILL.md — after retrieval, before presenting results",
          what: "Compare the RetrievalPlan's layerCoverage against the IntentPayload's targetLayers. If a required layer has low coverage, surface this as a gap. 'You're trying to make a decision about X, but I don't have the decision framework (L2a) for this domain — you may want to create one.'",
          change: "Add a gap-check step between retrieval and presentation. This turns retrieval failures into visible, actionable prompts — and drives the team to decompose more of their knowledge.",
          risk: "Low. Purely additive. Worst case, it surfaces gaps the user can ignore.",
        },
        {
          id: "IP-5",
          title: "Contradiction Detection",
          where: "load-context SKILL.md — after merge, before gap check",
          what: "Scan the merged RetrievalPlan for conflicting claims across retrieved docs. Compare key assertions in overlapping domain/layer combinations. When two docs make incompatible claims (market size, headcount, pricing, strategy direction), create a ContextContradiction and attach it to both RetrievalItems. Present to the user with both sources and context — never silently pick a winner.",
          change: "New step in the retrieval flow. Pairwise comparison of retrieved docs within the same domain/layer. Uses structured_data fields for exact conflicts (numbers, dates, names) and semantic comparison for softer conflicts (strategic direction, framing). Contradictions are stored persistently — once detected, they stay flagged until explicitly resolved.",
          risk: "Medium. False positives are the main risk — two docs might look contradictory but be scoped differently (TAM vs SAM). The 'scoped' resolution type handles this, but the initial detection needs to be calibrated to avoid alert fatigue.",
        },
        {
          id: "IP-6",
          title: "Mutable Archetype — Mid-Session Intent Reconstruction",
          where: "load-context SKILL.md — continuous, not just at session start",
          what: "Monitor for signals that the user's work mode has shifted. 'Pull up our pricing decision' is Orient/Explore. 'Draft me a pricing page' is Build. When the archetype changes, reconstruct the IntentPayload (increment version), re-infer targetLayers, and run incremental retrieval for newly-needed layers. Foundational context persists — only scored retrieval re-runs.",
          change: "IntentPayload becomes a versioned, mutable object. Each reconstruction produces a new version with updated archetype and targetLayers. The RetrievalPlan tracks which intentVersion it was built from. Incremental retrieval only fetches docs needed for the delta between old and new layer priorities — doesn't re-fetch everything.",
          risk: "Medium. The trigger for reconstruction needs to be reliable — too sensitive and you're constantly re-retrieving, too conservative and context goes stale as work mode shifts. Start with explicit user signals ('now I want to...') before attempting inference.",
        },
        {
          id: "IP-7",
          title: "Semantic Density Monitoring",
          where: "Background process — runs against Document Hub database, not in the retrieval flow",
          what: "Compute ρ (mean pairwise cosine similarity) across document embeddings, grouped by domain and layer. When ρ exceeds threshold (0.85 = critical), the system flags that domain/layer as semantically crowded — meaning retrieval accuracy is likely degrading because docs are too similar for the vector search to distinguish. Generates a SemanticDensityReport with specific recommendations.",
          change: "New scheduled process. Runs daily or triggered on share-with-team (when a new doc enters a domain). Computes density per domain × layer combination. Stores reports in a health dashboard. Surfaces alerts to the team: 'Your competitive-intel domain has 14 docs with ρ = 0.89 — consider consolidating or adding layer decomposition to improve retrieval precision.'",
          risk: "Low for the monitoring itself. The action it recommends (consolidation, decomposition) requires team effort. The key is making the alert actionable — not just 'density is high' but 'these 5 docs are the cluster, here's what to do about them.'",
        },
      ].map((ip) => (
        <div
          key={ip.id}
          style={{
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: 6,
            padding: 18,
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span
              style={{
                fontFamily: theme.mono,
                fontSize: 11,
                fontWeight: 700,
                background: theme.pill.bg,
                color: theme.pill.text,
                padding: "3px 10px",
                borderRadius: 100,
              }}
            >
              {ip.id}
            </span>
            <span style={{ fontFamily: theme.sans, fontSize: 15, fontWeight: 600 }}>{ip.title}</span>
          </div>
          <div style={{ fontFamily: theme.mono, fontSize: 11, color: theme.textMuted, marginBottom: 10 }}>
            {ip.where}
          </div>
          <div style={{ fontFamily: theme.sans, fontSize: 13, color: theme.text, lineHeight: 1.6, marginBottom: 10 }}>
            {ip.what}
          </div>
          <div
            style={{
              fontFamily: theme.sans,
              fontSize: 12,
              color: theme.accent,
              background: `rgba(120,110,100,0.05)`,
              padding: "10px 12px",
              borderRadius: 4,
              lineHeight: 1.5,
              marginBottom: 8,
            }}
          >
            <span style={{ fontFamily: theme.mono, fontSize: 10, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              change:{" "}
            </span>
            {ip.change}
          </div>
          <div style={{ fontFamily: theme.mono, fontSize: 11, color: theme.textMuted }}>
            <span style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>risk: </span>
            {ip.risk}
          </div>
        </div>
      ))}
    </div>
  );
}

function FlowView() {
  const steps = [
    {
      label: "User initiates session",
      detail: '"I\'m writing a proposal for [client]"',
      type: "input",
    },
    {
      label: "Construct IntentPayload",
      detail: "archetype: Build, goal: proposal, entityType: client, domain: client-engagement, stage: Pre-Seed→Seed",
      type: "process",
    },
    {
      label: "Infer LayerPriority[]",
      detail: "Build → L2b (0.9) + L3 (1.0) + L4 (0.7). Override: add L0 (0.6) for client framing.",
      type: "process",
    },
    {
      label: "Pre-load foundational context",
      detail: "Scan index for authority: foundational where domain ∈ [client-engagement, brand, universal]. Load brand guidelines, proposal standards, pricing constraints. No scoring — these are the floor.",
      type: "foundation",
    },
    {
      label: "Fetch Context Index",
      detail: "notion-fetch on index page. Returns 60+ entries. Filter out already-loaded foundational docs.",
      type: "fetch",
    },
    {
      label: "Score remaining entries against intent",
      detail: "Referential docs: layer match × recency × semantic. Exploratory docs: same scoring × 0.7 penalty. Decomposed entries get layer-match bonus.",
      type: "process",
    },
    {
      label: "Resolve decomposed primitives",
      detail: "For top-scoring decomposed entries, call resolveDecomposition(raw, {stage, entityType}). Flatten to requested layers.",
      type: "process",
    },
    {
      label: "Merge into RetrievalPlan",
      detail: "Four tiers: foundational (pre-loaded) → structured (decomposed) → unstructured (index/search) → contradictions (detected). Dedup by docId.",
      type: "process",
    },
    {
      label: "Detect contradictions",
      detail: "Scan retrieved set for conflicting claims. Market size doc says $2B, later analysis says $800M. Don't pick a winner — surface both with context. Severity: material.",
      type: "contradiction",
    },
    {
      label: "Check layer coverage",
      detail: "L2b: ✓ (process docs found), L3: ✓ (tasks found), L4: △ (partial), L0: ✓ (client context + brand guidelines loaded)",
      type: "check",
    },
    {
      label: "Fetch top 3–5 scored docs",
      detail: "notion-fetch on highest-scoring referential + exploratory items. Read fully. Layer-annotated for downstream use.",
      type: "fetch",
    },
    {
      label: "Report gaps + contradictions + confirm",
      detail: '"Loaded brand guidelines + client context + task framework. ⚠ Conflict: market sizing differs between [doc A] and [doc B] — presenting both. L4 is thin."',
      type: "output",
    },
    {
      label: "Mid-session: user shifts mode",
      detail: '"Actually, before the proposal, let me review what we decided about pricing." → archetype shifts Build → Decide. IntentPayload v2. Incremental retrieval for L2a (decisions).',
      type: "shift",
    },
    {
      label: "Incremental retrieval",
      detail: "Foundational context persists (no re-fetch). Only re-score for newly-needed layers (L2a now weighted 1.0). Append new docs to existing RetrievalPlan. Re-check contradictions.",
      type: "process",
    },
  ];

  const typeColors = {
    input: theme.layers.L0,
    process: theme.layers.L2a,
    fetch: theme.layers.L1,
    foundation: "#8B7355",
    contradiction: "#C85A5A",
    check: theme.layers.L3,
    output: theme.layers.L5,
    shift: "#D4A848",
  };

  return (
    <div>
      <div
        style={{
          fontFamily: theme.sans,
          fontSize: 14,
          color: theme.textMuted,
          lineHeight: 1.6,
          marginBottom: 28,
        }}
      >
        End-to-end flow for a Mode 3 session priming with intent-aware retrieval,
        including contradiction detection and a mid-session archetype shift. The shift
        triggers incremental retrieval — foundational context persists, only scored docs re-run.
      </div>

      <div style={{ position: "relative" }}>
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 14,
              marginBottom: 2,
              position: "relative",
            }}
          >
            {/* Timeline */}
            <div
              style={{
                width: 30,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: typeColors[step.type],
                  border: `2px solid ${theme.bg}`,
                  boxShadow: `0 0 0 1px ${typeColors[step.type]}`,
                  zIndex: 1,
                  marginTop: 6,
                }}
              />
              {i < steps.length - 1 && (
                <div
                  style={{
                    width: 1,
                    flex: 1,
                    background: theme.border,
                    minHeight: 30,
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingBottom: 16, flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: theme.mono,
                    fontSize: 10,
                    color: theme.textMuted,
                    opacity: 0.6,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: theme.sans,
                    fontSize: 13,
                    fontWeight: 600,
                    color: theme.text,
                  }}
                >
                  {step.label}
                </span>
              </div>
              <div
                style={{
                  fontFamily: theme.mono,
                  fontSize: 11,
                  color: theme.textMuted,
                  lineHeight: 1.5,
                  paddingLeft: 24,
                }}
              >
                {step.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DecompositionLayers() {
  return (
    <Section title="L0–L5 Layer Definitions × Retrieval Role">
      <LayerRow
        id="L0"
        color={theme.layers.L0}
        label="Problem"
        description="The foundational problem statement. Universal framing, optionally refined by stage and entity type. This is the 'why does this exist' layer."
        retrievalUse="Surfaces when context needs grounding. Every archetype benefits from L0, but Explore and Orient weight it highest. Critical for new team members and cross-domain work."
      />
      <LayerRow
        id="L1"
        color={theme.layers.L1}
        label="Framework"
        description="Mental models, kernel references, and conceptual scaffolding. The team's shared vocabulary for thinking about a domain."
        retrievalUse="High value for Explore and Orient. When building, provides the 'how we think about this' context that prevents reinventing frameworks."
      />
      <LayerRow
        id="L2a"
        color={theme.layers.L2a}
        label="Decisions"
        description="Open and resolved decisions with stakes, framing by stage, and trade-off documentation. The team's decision architecture."
        retrievalUse="Primary layer for Decide archetype. Also critical for Review (was the decision sound?) and Orient (what's been decided already?)."
      />
      <LayerRow
        id="L2b"
        color={theme.layers.L2b}
        label="Process"
        description="Triggers, phases, and failure modes. How work flows through a domain. The procedural knowledge layer."
        retrievalUse="Primary for Build archetype. Process docs tell you how to execute, not just what to think. Also valuable for onboarding (Orient + Build)."
      />
      <LayerRow
        id="L3"
        color={theme.layers.L3}
        label="Tasks"
        description="Concrete work items with priority, effort, and ownership. Stage-filtered — different tasks surface at different company stages."
        retrievalUse="Highest weight for Build. Stage-filtering is already built into the schema, so the resolver naturally returns tasks relevant to current stage."
      />
      <LayerRow
        id="L4"
        color={theme.layers.L4}
        label="Dependencies"
        description="What requires what, what enables what, and where tensions exist between domains. The connective tissue."
        retrievalUse="Critical for Decide (understanding downstream effects) and Build (knowing what's blocked). Also surfaces unexpected connections for Explore."
      />
      <LayerRow
        id="L5"
        color={theme.layers.L5}
        label="Audit"
        description="Activation timestamps, deactivation conditions, and override history. The change log and governance layer."
        retrievalUse="Primary for Review archetype. 'When was this activated? Has it been overridden? Under what conditions does it expire?'"
      />
    </Section>
  );
}

export default function IntentAwareRetrievalSchema() {
  const [view, setView] = useState("Architecture");

  return (
    <div
      style={{
        background: theme.bg,
        minHeight: "100vh",
        padding: "32px 40px",
        fontFamily: theme.sans,
        color: theme.text,
        maxWidth: 860,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontFamily: theme.mono,
            fontSize: 10,
            color: theme.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 6,
          }}
        >
          New Radicle OS · Context Architecture
        </div>
        <h1
          style={{
            fontFamily: theme.sans,
            fontSize: 26,
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Intent-Aware Retrieval
        </h1>
        <div
          style={{
            fontFamily: theme.sans,
            fontSize: 14,
            color: theme.textMuted,
            marginTop: 6,
          }}
        >
          load-context v0.3.0 (shipped) — L0–L5 decomposition layers integrated with intent-based context retrieval
        </div>
      </div>

      {/* Nav */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 28,
          borderBottom: `1px solid ${theme.border}`,
          paddingBottom: 12,
        }}
      >
        {VIEWS.map((v) => (
          <Pill key={v} active={view === v} onClick={() => setView(v)}>
            {v}
          </Pill>
        ))}
      </div>

      {/* Content */}
      {view === "Architecture" && <ArchitectureView />}
      {view === "Phasing" && <PhasingView />}
      {view === "Schema" && <SchemaView />}
      {view === "Authority" && <AuthorityView />}
      {view === "Integration Points" && <IntegrationView />}
      {view === "Flow" && <FlowView />}

      {/* Layers — always visible */}
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${theme.border}` }}>
        <DecompositionLayers />
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 32,
          paddingTop: 16,
          borderTop: `1px solid ${theme.border}`,
          fontFamily: theme.mono,
          fontSize: 10,
          color: theme.textMuted,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>v0.3.0 shipped · March 2026</span>
        <span>three-tier retrieval: foundational (pre-load) → structured (L0–L5) → unstructured (index/vector)</span>
      </div>
    </div>
  );
}