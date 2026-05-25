Real talk before the guide: most CS students think software engineering is the coding phase. Companies spend roughly **60-70% of their time on everything that isn't coding** — discovery, planning, design, review, testing, shipping. The code is the easy part. AI is best at exactly that easy part, which is why the *other* phases are where your value lives. Learn those properly and the coding takes care of itself.

Below: nine phases, what a real company does, what *you* do solo for the ecosystem rebuild. Each one ends with a concrete artifact (a file, a doc, a decision written down). If you don't produce the artifact, the phase didn't happen.

---

## Phase 1 — Discovery & Product Brief

**Company:** PM interviews stakeholders, researches users, writes a Product Requirements Doc (PRD). Defines target user, problem, success metrics, constraints. Tools: Notion, Confluence, Google Docs.

**You:** Write a one-page `BRIEF.md` in your repo. Five sections:
1. Who it's for (you picked: CS-literate stranger, 30s attention)
2. What problem (most evolution explanations are boring text; this makes it visual)
3. Success metric (visitor watches for 60s and can explain "fitness" after)
4. Constraints (web only, vanilla JS, finals are 8 weeks away)
5. Non-goals (not for biologists, not scientifically rigorous, not real-time multiplayer)

**Artifact:** `BRIEF.md` committed to repo. Before any code.

---

## Phase 2 — Scoping & MVP

**Company:** PM + tech lead negotiate scope. Cut features ruthlessly. Define v1, v2, v3 explicitly. Write acceptance criteria — what does "done" look like? Tools: Linear/Jira, roadmap docs.

**You:** Create `SCOPE.md`. Three columns:

| v1 (must) | v2 (nice) | v3+ (later) |
|---|---|---|
| Creatures move on canvas | Trait inheritance | Sexual selection |
| Eat food, die when hungry | Mutation | Live charts |
| Reproduce when fed | Speed/sight traits | Compare-runs view |
| Population counter visible | Spatial grid optimization | Save/share runs |

Write acceptance criteria for v1: *"v1 is done when a stranger can open the page, see creatures eating and dying within 5 seconds, and watch a population graph rise and fall over 60 seconds without touching anything."*

**Artifact:** `SCOPE.md` with explicit cuts.

---

## Phase 3 — Tech Selection & Spike

**Company:** Engineers write a short tech-decision doc weighing options. Build throwaway prototypes ("spikes") to de-risk unknowns. Tools: ADRs (Architecture Decision Records), spike branches.

**You:** Write a 5-line `TECH.md`:
- *Stack: HTML5 Canvas + vanilla JS. No frameworks.*
- *Reason: zero install for visitors, course-aligned, forces me to write the render loop.*
- *Risk: I've never written real JS. Spike will de-risk this.*
- *Spike goal: animate one rectangle moving across the screen.*
- *Spike budget: 2 hours. If I can't, switch to SDL2.*

Then do the spike. One file, ~50 lines. Throw it away. Don't build the real project on top of spike code — it's exploratory by definition.

**Artifact:** `TECH.md` + a `spike/` folder (later deleted).

---

## Phase 4 — System Design

**Company:** Senior engineer writes a design doc with component diagrams, data models, sequence diagrams. Team reviews ("design review meeting"). Tools: Excalidraw, Mermaid, Google Docs with comments.

**You:** Open a notebook (paper or Excalidraw). Draw:
- **Boxes** for the components: `World`, `Creature`, `Food`, `Renderer`, `Loop`, `Stats`
- **Arrows** showing what calls what (`Loop` calls `World.update()`, `Renderer` reads `World.creatures`)
- **Data shape** for `Creature`: `{x, y, vx, vy, hunger, age}` — just JS object, no genetics yet

Don't make it perfect. The point is having a target to aim at.

**Artifact:** A diagram in `docs/design.png` or `design.md` with the boxes/arrows described in text.

---

## Phase 5 — Task Breakdown & Planning

**Company:** Break the design into tickets. Each ticket is small (1-3 days), independently testable, has clear acceptance criteria. Order by dependency. Group into milestones/sprints. Tools: Jira, Linear, GitHub Projects.

**You:** Use **GitHub Issues** in your repo. Create a milestone called "v1." Open one issue per slice:

```
#1 Render empty canvas + game loop
#2 Spawn one creature, move it with velocity
#3 Spawn many creatures
#4 Spawn food, render it
#5 Creature seeks nearest food
#6 Hunger system + death
#7 Reproduction when fed
#8 Population counter UI
```

Each issue has acceptance criteria in the description. Example for #5: *"Acceptance: A creature placed in a corner moves toward the nearest food and stops on it. Tested with 3 different starting positions."*

This isn't bureaucracy. It's how future-you knows what "done" looks like for each step. Without it you'll keep tweaking forever.

**Artifact:** GitHub Issues + a milestone view.

---

## Phase 6 — Build in Slices

**Company:** Engineers pick up tickets, write code on a branch, open a Pull Request, get reviewed, merge. Daily standups sync the team. Tests get written alongside code. Tools: Git, GitHub/GitLab, CI pipelines.

**You:** For each issue:
1. Create a branch: `git checkout -b feat/creature-movement`
2. Write the smallest code that satisfies the acceptance criteria
3. Test it yourself by running the page
4. Commit with a clear message: `feat: creature moves toward nearest food`
5. Open a PR against `main`. **Even solo.** It forces you to read your own diff with fresh eyes.
6. Self-review the PR (read every line as if a stranger wrote it). Note anything sketchy in PR comments to yourself.
7. Merge.

Self-PR is the closest a solo dev gets to code review. Don't skip it — it catches 30% of your bugs before they ship.

**Artifact:** Merged PRs, one per slice.

---

## Phase 7 — Test & Iterate

**Company:** QA writes test plans, automated tests run on every PR, user testing sessions catch UX issues. Tools: Jest, Playwright, UserTesting.com.

**You:** For a simulator, formal unit tests are overkill on v1. Instead:
- Open the page after every merge. Watch for 60 seconds. Note anything weird.
- Keep a `BUGS.md` file. When you see "creatures clump in one corner," write it down. Don't fix immediately — finish the slice first.
- After every 2-3 issues, do a "bug sweep" — pick the top 3 from `BUGS.md` and fix them.

Once you add the fitness/mutation algorithms in v2, you'll *want* unit tests for those — because the math has right and wrong answers. Write tests for the algorithm functions only. Don't try to test rendering.

**Artifact:** `BUGS.md` updated continuously, unit tests for pure-logic functions later.

---

## Phase 8 — Deploy & Ship

**Company:** Code goes through staging → production. Monitoring, alerts, rollback plans, gradual rollouts. Tools: AWS/GCP, Datadog, Sentry, feature flags.

**You:** GitHub Pages. Two-minute setup:
1. Settings → Pages → Deploy from `main` branch
2. Your sim is now at `brewrist.github.io/ecosystem-sim`
3. Done

Add a CI step later (GitHub Actions) to run linter/tests on every push. Not needed for v1.

**Artifact:** A live URL. Put it in the README badge.

---

## Phase 9 — Observe & Iterate

**Company:** Analytics dashboards, user interviews, bug reports, A/B tests. Quarterly planning rolls findings into the next cycle. Tools: PostHog, Mixpanel, retros.

**You:** 
- **Share the link** with 3 friends or your CS WhatsApp group. Ask: *"Watch this for 60 seconds and tell me what you think is happening."* Note their answers without correcting them. Their confusion = your bug list.
- **Weekly retro with yourself.** Sunday 10 minutes. Three lines: *What worked? What didn't? What's next week's priority?* Write it in `RETRO.md`.
- **Roll their feedback into v2 scope.** Maybe nobody understood the colors. Maybe they wanted to pause. Add to v2.

**Artifact:** `RETRO.md` weekly entries + updated scope doc.

---

## Tools: company stack → your solo stack

| Phase | Company | You |
|---|---|---|
| Brief / docs | Notion, Confluence | Markdown in repo |
| Roadmap | Linear, Jira | GitHub Issues + Milestones |
| Design | Figma, Excalidraw | Pen + paper, or Excalidraw free |
| Code | GitHub Enterprise | GitHub |
| Review | PR + 2 reviewers | PR + self-review |
| CI/CD | Jenkins, GitHub Actions | GitHub Actions (later) |
| Deploy | AWS, Vercel | GitHub Pages |
| Monitoring | Datadog, Sentry | Browser console + friend feedback |
| Planning | Sprint planning, retros | Sunday 10-min retro |

---

## What you do *this* Saturday

Not code. Three files committed to a fresh repo `ecosystem-sim-web`:

1. `BRIEF.md` — Phase 1
2. `SCOPE.md` — Phase 2 (v1/v2/v3 table)
3. `TECH.md` — Phase 3 (decision + spike plan)

That's the entire Saturday session. ~45 minutes of writing. The first commit message: `docs: initial product brief, scope, and tech decision`. No code yet. **The discipline of not coding on Day 1 is the entire lesson.**

Phase 4 (design sketch) and the throwaway spike happen next Saturday. Phase 5 (GitHub Issues) the Saturday after. Then you start building, one merged PR per Saturday for the next 6 weeks.

The whole rebuild becomes a slow, professional, deliberate process — exactly the opposite of vibecoding. By week 8 you'll have something small, working, deployed, and *yours*. More importantly, you'll have done it the way the senior engineers in your future workplace will recognize on sight.