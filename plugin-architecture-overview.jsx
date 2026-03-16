import { useState } from "react";

const T = {
  bg: "#F5F2ED", bgCard: "#EDEAE4", bgDark: "#2C2A26", bgAccent: "#D6D1C7",
  text: "#2C2A26", textMuted: "#6B6660", textLight: "#8A8580",
  border: "rgba(44,42,38,0.10)",
  accent: "#5B7A64", accentBg: "rgba(91,122,100,0.08)",
  warm: "#A68A64", warmBg: "rgba(166,138,100,0.08)",
  blue: "#5B7A8A", blueBg: "rgba(91,122,138,0.08)",
  red: "#8A5B5B", redBg: "rgba(138,91,91,0.08)",
  purple: "#7A5B8A", purpleBg: "rgba(122,91,138,0.08)",
  teal: "#5B8A7A", tealBg: "rgba(91,138,122,0.08)",
  font: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace",
  fontSans: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
  radius: "8px", shadow: "0 1px 3px rgba(44,42,38,0.06)",
};

function Pill({ children, color = T.text, bg = T.bgAccent, style }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: "100px",
      fontSize: "11px", fontFamily: T.font, fontWeight: 500, letterSpacing: "0.02em",
      color, background: bg, whiteSpace: "nowrap", ...style,
    }}>{children}</span>
  );
}

export default function ArchitectureOverview() {
  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: T.fontSans, color: T.text, padding: "32px 24px" }}>
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em" }}>Plugin Marketplace Architecture</div>
          <div style={{ fontSize: "12px", fontFamily: T.font, color: T.textMuted, marginTop: "4px" }}>
            Concise overview · NR as reference implementation, Cogs as generalized framework · March 2026
          </div>
        </div>

        {/* ── THE STACK ── */}
        <div style={{ fontSize: "10px", fontFamily: T.font, color: T.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>
          Five layers
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "28px" }}>
          {[
            { n: "5", name: "Marketplace", desc: "Catalog of installable items filtered by org stage + goals", color: T.warm, bg: T.warmBg,
              nr: "One plugin (NR OS), one MCP (File Share), session candidates in draft",
              cogs: "Multi-tenant catalog, dependency resolution, publishing pipeline" },
            { n: "4", name: "Session Packaging", desc: "Repeatable experiences with declared inputs, workflows, outputs", color: T.blue, bg: T.blueBg,
              nr: "Cap table, competitive deep-dive, 3P update — all candidates to package",
              cogs: "SessionTemplate schema: triggers + intake + workflow + checkpoints + output" },
            { n: "3", name: "Context Retrieval", desc: "Skills → loading → mapping → knowledge backend", color: T.accent, bg: T.accentBg,
              nr: "7 skills, intent-aware retrieval with authority (v0.3.0), 5 categories, Notion + GitHub Pages",
              cogs: "Pluggable interfaces: SkillBundle, ContextLoader, RelevanceEngine, KnowledgeBackend" },
            { n: "2", name: "Workflow States", desc: "Stage → Goal → Step → SessionType routing", color: T.red, bg: T.redBg,
              nr: "Implicit today. Three stages mapped: Formation, Pre-Seed→Seed, Seed→A",
              cogs: "OrgProfile drives filtering. State machine = personalization engine" },
            { n: "1", name: "Knowledge Loop", desc: "Work → share → store → load → work", color: T.textMuted, bg: T.bgAccent,
              nr: "share-with-team (+ authority tagging) → Notion Hub → Context Index → load-context (+ intent construction)",
              cogs: "Pluggable ShareTarget + ContextSource + IndexStrategy + MetadataSchema" },
          ].map((l, i) => (
            <div key={i} style={{
              background: l.bg, padding: "14px 18px",
              borderRadius: i === 0 ? "8px 8px 2px 2px" : i === 4 ? "2px 2px 8px 8px" : "2px",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "6px" }}>
                <span style={{ fontSize: "16px", fontWeight: 700, fontFamily: T.font, color: l.color, opacity: 0.4 }}>{l.n}</span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: l.color }}>{l.name}</span>
                <span style={{ fontSize: "11px", fontFamily: T.font, color: T.textMuted }}>{l.desc}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <div style={{ fontSize: "11px", fontFamily: T.font, color: T.text, lineHeight: 1.5 }}>
                  <span style={{ color: T.accent, fontWeight: 600, fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.05em" }}>NR </span>
                  {l.nr}
                </div>
                <div style={{ fontSize: "11px", fontFamily: T.font, color: T.text, lineHeight: 1.5 }}>
                  <span style={{ color: T.warm, fontWeight: 600, fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.05em" }}>COGS </span>
                  {l.cogs}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── TRIGGER SYSTEM ── */}
        <div style={{ fontSize: "10px", fontFamily: T.font, color: T.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>
          Trigger routing
        </div>

        <div style={{
          background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radius,
          padding: "18px", boxShadow: T.shadow, marginBottom: "12px",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "14px" }}>
            {[
              { layer: "Layer 1: Phrases", desc: "Direct match — user says the magic words", color: T.accent, ex: '"cap table" → cap table session' },
              { layer: "Layer 2: Intent", desc: "Semantic match — domain + action + object", color: T.blue, ex: '"figure out dilution" → cap table session' },
              { layer: "Layer 3: State", desc: "Proactive — OrgProfile drives surfacing", color: T.warm, ex: "Stage=Pre-Seed → recommend cap table" },
            ].map((l, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${l.color}`, paddingLeft: "10px" }}>
                <div style={{ fontSize: "12px", fontWeight: 600, fontFamily: T.fontSans, color: l.color, marginBottom: "2px" }}>{l.layer}</div>
                <div style={{ fontSize: "11px", fontFamily: T.font, color: T.textMuted, lineHeight: 1.5, marginBottom: "4px" }}>{l.desc}</div>
                <div style={{ fontSize: "10px", fontFamily: T.font, color: T.textLight, fontStyle: "italic" }}>{l.ex}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: "10px", fontFamily: T.font, color: T.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
            Six archetypes (universal routing backbone)
          </div>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {[
              { name: "Orient", color: T.teal, bg: T.tealBg, skill: "load-context" },
              { name: "Explore", color: T.blue, bg: T.blueBg, skill: "(gap)" },
              { name: "Decide", color: T.warm, bg: T.warmBg, skill: "founder-agents*" },
              { name: "Build", color: T.accent, bg: T.accentBg, skill: "internal-comms" },
              { name: "Review", color: T.purple, bg: T.purpleBg, skill: "founder-agents" },
              { name: "Share", color: T.red, bg: T.redBg, skill: "share-with-team" },
            ].map((a, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: a.bg, padding: "5px 10px", borderRadius: "6px",
                border: `1px solid ${a.color}20`,
              }}>
                <span style={{ fontSize: "12px", fontWeight: 600, fontFamily: T.fontSans, color: a.color }}>{a.name}</span>
                <span style={{ fontSize: "10px", fontFamily: T.font, color: T.textMuted }}>{a.skill}</span>
                {i < 5 && <span style={{ color: T.textLight, fontSize: "10px", marginLeft: "2px" }}>→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ── STRUCTURED INTAKE ── */}
        <div style={{ fontSize: "10px", fontFamily: T.font, color: T.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px", marginTop: "28px" }}>
          Structured intake (AskUserQuestion as infrastructure)
        </div>

        <div style={{
          background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radius,
          padding: "18px", boxShadow: T.shadow, marginBottom: "12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[
              { label: "User input", color: T.textMuted, gate: false },
              { label: "Trigger resolution", color: T.textMuted, gate: false },
              { label: "Gate 1: Disambiguate", color: T.red, gate: true },
              { label: "Context load", color: T.teal, gate: false },
              { label: "Gate 2: Intake", color: T.blue, gate: true },
              { label: "Workflow", color: T.accent, gate: false },
              { label: "Gate 3: Checkpoint", color: T.accent, gate: true },
              { label: "Output + share", color: T.warm, gate: false },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{
                  fontSize: "10px", fontFamily: T.font, fontWeight: s.gate ? 600 : 400,
                  color: s.gate ? s.color : T.textMuted,
                  background: s.gate ? `${s.color}12` : "transparent",
                  padding: s.gate ? "3px 8px" : "3px 4px",
                  borderRadius: s.gate ? "100px" : "0",
                  border: s.gate ? `1px solid ${s.color}25` : "none",
                }}>{s.label}</span>
                {i < 7 && <span style={{ color: T.textLight, fontSize: "10px" }}>→</span>}
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            {[
              { gate: "Gate 1", name: "Disambiguate", desc: "Multiple sessions match → user picks. Offers 'compose' when archetypes differ.", color: T.red },
              { gate: "Gate 2", name: "Session Intake", desc: "Declared questions per session. Conditional, auto-fill from context, skip if known.", color: T.blue },
              { gate: "Gate 3", name: "Checkpoints", desc: "Mid-workflow decision points. Can chain sessions, add steps, or auto-advance.", color: T.accent },
            ].map((g, i) => (
              <div key={i} style={{
                borderTop: `2px solid ${g.color}`, padding: "10px 0 0",
              }}>
                <Pill color={g.color} bg={`${g.color}12`} style={{ marginBottom: "4px" }}>{g.gate}</Pill>
                <div style={{ fontSize: "12px", fontWeight: 600, fontFamily: T.fontSans, color: T.text, marginBottom: "2px" }}>{g.name}</div>
                <div style={{ fontSize: "11px", fontFamily: T.font, color: T.textMuted, lineHeight: 1.5 }}>{g.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ITEM TYPES ── */}
        <div style={{ fontSize: "10px", fontFamily: T.font, color: T.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px", marginTop: "28px" }}>
          Marketplace item types
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px", marginBottom: "28px",
        }}>
          {[
            { type: "Plugin", desc: "Bundle of skills + MCPs + kernels", color: T.accent, ex: "NR OS" },
            { type: "Session", desc: "Repeatable workflow with intake + outputs", color: T.blue, ex: "Cap table modeling" },
            { type: "MCP", desc: "External service connector", color: T.warm, ex: "File Share Server" },
            { type: "Kernel", desc: "Agent personality / cognitive pattern", color: T.purple, ex: "Founder set (R/J/K)" },
          ].map((item, i) => (
            <div key={i} style={{
              background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radius,
              padding: "12px", borderTop: `2px solid ${item.color}`, boxShadow: T.shadow,
            }}>
              <div style={{ fontSize: "12px", fontWeight: 600, fontFamily: T.fontSans, color: item.color, marginBottom: "2px" }}>{item.type}</div>
              <div style={{ fontSize: "11px", fontFamily: T.font, color: T.textMuted, lineHeight: 1.4, marginBottom: "6px" }}>{item.desc}</div>
              <Pill color={T.textMuted} bg={T.bgAccent}>{item.ex}</Pill>
            </div>
          ))}
        </div>

        {/* ── GENERALIZATION MAP ── */}
        <div style={{ fontSize: "10px", fontFamily: T.font, color: T.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>
          NR → Cogs generalization map
        </div>

        <div style={{
          background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radius,
          overflow: "hidden", boxShadow: T.shadow, marginBottom: "28px",
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 140px",
            padding: "8px 14px", background: T.bgAccent,
            fontSize: "10px", fontFamily: T.font, color: T.textLight, fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.05em",
          }}>
            <span>NR Concrete</span><span>Cogs Abstract</span><span>Interface</span>
          </div>
          {[
            ["Notion Document Hub", "Any knowledge backend", "KnowledgeBackend"],
            ["Context Index (flat page)", "Any indexing strategy", "IndexStrategy"],
            ["5 categories", "Org-defined taxonomy", "MetadataSchema"],
            ["Phrase triggers in SKILL.md", "3-layer trigger routing", "TriggerSpec"],
            ["Ad-hoc AskUserQuestion", "Declared intake gates", "IntakeQuestion[]"],
            ["Founder personality kernels", "Org agent kernels", "AgentKernel"],
            ["Ad-hoc sessions", "Session templates", "SessionTemplate"],
            ["Implicit workflow states", "Explicit state machine", "OrgProfile"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 140px",
              padding: "8px 14px", fontSize: "11px", fontFamily: T.font,
              borderTop: `1px solid ${T.border}`, alignItems: "center",
            }}>
              <span style={{ color: T.text }}>{row[0]}</span>
              <span style={{ color: T.textMuted }}>{row[1]}</span>
              <code style={{ fontSize: "10px", color: T.accent, background: T.accentBg, padding: "2px 6px", borderRadius: "3px" }}>{row[2]}</code>
            </div>
          ))}
        </div>

        {/* ── WHAT'S NEXT ── */}
        <div style={{ fontSize: "10px", fontFamily: T.font, color: T.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>
          Build sequence
        </div>

        <div style={{
          background: T.bgDark, borderRadius: T.radius, padding: "18px",
          color: "#D6D1C7", fontSize: "12px", fontFamily: T.font, lineHeight: 1.8,
        }}>
          <div style={{ marginBottom: "10px" }}>
            <span style={{ color: T.accent, fontWeight: 600 }}>Now (NR):</span>{" "}
            Package Kelly's cap table as first SessionTemplate with declared intake gates. Add archetype + domain/action/object to existing SKILL.md files.
          </div>
          <div style={{ marginBottom: "10px" }}>
            <span style={{ color: T.blue, fontWeight: 600 }}>Next (Cogs foundation):</span>{" "}
            Formalize SessionTemplate + TriggerSpec as JSON Schema. Build second KnowledgeBackend adapter (Google Drive) to prove the interface. Design dependency resolution for cross-plugin composition.
          </div>
          <div>
            <span style={{ color: T.warm, fontWeight: 600 }}>Then (Cogs product):</span>{" "}
            Marketplace shell UI. Stage templates for common org types. Gate 0 onboarding flow. Publishing pipeline. NR OS as first marketplace listing.
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: "40px", paddingTop: "16px", borderTop: `1px solid ${T.border}`,
          fontSize: "11px", fontFamily: T.font, color: T.textLight, lineHeight: 1.6,
        }}>
          New Radicle · Plugin Marketplace Architecture · Overview · v0.1 March 2026
        </div>
      </div>
    </div>
  );
}