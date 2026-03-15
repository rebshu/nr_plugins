# Scoring System

Multi-lens view system that lets users see the same set of building blocks through different scoring dimensions. Renders as tab toggles with configurable dot scales and legends.

## When to use

Any decision framework that benefits from viewing progress through multiple lenses. Common pairings:
- **Readiness + Importance** (Kelly's ownership structure)
- **Readiness + Risk + Complexity** (architecture review)
- **Progress + Urgency + Difficulty** (hiring plan)
- **Completion + Impact + Confidence** (product roadmap)

## Data shape

```
ScoringView {
  id: string              — Unique identifier (e.g., "readiness", "importance")
  name: string            — Tab label (e.g., "Where we are", "How important it is")
  description: string     — Explanatory text shown when this view is active
  scale: ScoreLevel[]     — 2-5 levels from lowest to highest
}

ScoreLevel {
  value: number           — Numeric value (1 = lowest, 4 = highest)
  label: string           — Full label (e.g., "Complete & aligned")
  color: string           — CSS color for the dots
  legendLabel: string     — Short label for the bottom legend bar
}
```

## Rendering

- **Tabs** render as pill-shaped toggles at the top of the framework. Active tab is dark fill, inactive is outline.
- **Description text** appears below the tabs explaining what the active view shows.
- **Dots** on each building block update to reflect the active view's scale and colors.
- **Legend bar** at the bottom shows all levels in the active view's scale with their colors and labels.

## Pre-built scales

Common scales that sessions can reference by id instead of defining from scratch:

### readiness (4 levels)
1. Drafted, gaps remain (red/coral)
2. Produced, pending sign-off (orange/amber)
3. Produced, not fully closed (dark green, partially filled)
4. Complete & aligned (full green)

### importance (4 levels)
1. Low importance (1 navy dot)
2. Medium importance (2 navy dots)
3. High importance (3 navy dots)
4. Critical (4 navy dots)

### risk (3 levels)
1. Low risk (green)
2. Medium risk (amber)
3. High risk (red)

### confidence (4 levels)
1. Speculative (1 dot)
2. Hypothesis (2 dots)
3. Validated (3 dots)
4. Proven (4 dots)

Sessions can define custom scales or override the pre-built ones.
