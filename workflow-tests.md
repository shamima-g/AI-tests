# Testing the Stadium 8 template and its workflow

> **Read this first.** This document describes how we test the **current
> epic-branch workflow** — the one explained in [HOW-IT-WORKS.md](HOW-IT-WORKS.md).
> The older `TEST-GUIDE.md`, `TEST-INPUTS.md`, and `TEST-STRATEGY.md` describe a
> retired four-phase version and are **obsolete**. We keep the *good ideas* from
> them (three tiers of testing, a good-and-broken case for everything, throwaway
> folders, permission-hook fuzzing, doc-drift checks) but the strategies below are
> rebuilt around how the template actually works today.

## What this is, in one paragraph

This is the set of tests for the **Stadium 8 template and the way its workflow
runs** — the scripts, hooks, JSON state files, and the agent/command definitions
under `.claude/` that carry a project from a plain-English brief to a built,
tested, merged app, **one epic at a time, each on its own branch**. It tests the
*machinery* a user relies on, not any feature a user builds with it, and it is
**not** the per-story QA that happens inside the workflow. Think of it as a
building inspector: it never cooks a meal (a feature someone asks for), it only
checks that the kitchen, the tools, and the safety rules are sound before anyone
starts cooking.

---

## The rules every test follows (read these first)

Every test here follows all of these. If a proposed test can't, it doesn't belong.

1. **A "good" case *and* a "broken" case for everything.** For each thing we check
   there's a "works when it's right" test **and** a "fails when it's broken" test. A
   test that can only ever pass can't prove it would catch a mistake — the broken
   case proves the check can actually tell good from bad.
2. **Each test cleans up after itself.** Set up, do the work, tidy up — no leftover
   files, no stray git branches. Each test names the rollback recipe it used
   (`RB-0` … `RB-7`, listed below).
3. **No test depends on another.** Any test can run on its own, in any order.
4. **Isolated.** Each test works in **its own throwaway folder** (and, where git is
   involved, its own throwaway repo) in the system's temporary area — never in the
   real project, never on a real branch.
5. **Fast.** The plain unit tests aim for under about a tenth of a second each; the
   state-and-schema checks aim for under about a hundredth of a second.
6. **Never touches the real project.** The suite reaches the template through a
   single resolved path (defaulting to the parent repo, overridable with
   `REPO_ROOT`). It installs nothing into `web/` or the repo root. When no template
   is found, the template-dependent tests **skip with a visible notice** while the
   rest still run — so a standalone copy can never show a fake "all green".

---

## What the template promises (and what we hold it to)

The workflow gives a user a handful of things they can rely on. Each is a promise
the suite tests.

| # | The thing | The promise |
|---|-----------|-------------|
| A | **The stage machine** | Every epic moves through **INTAKE → PLAN → BUILD → EPIC-END → MANUAL-TEST → COMPLETE-ON-BRANCH → COMPLETE** in that order, tracked in the epic's own `state.json`, and never skips a stage whose inputs aren't ready |
| B | **The branch-and-merge machinery** | Each epic is built on its own `epic/<slug>` branch; the epic is merged into `main` **only after you approve**; non-conflicting overlaps between epics combine on their own, real conflicts stop and ask |
| C | **The four approvals** | Nothing important happens without you seeing it first: the intake approval (project facts + epic plan), the story approval, the hands-on approval, and the merge approval — each shows the content *before* the question |
| D | **The four autonomy tiers** | Small choices are made quietly; notable ones are jotted in the epic's notebook; ones that matter later are filed in the right place; and only genuinely risky decisions stop and ask you |
| E | **The quality checks** | The three automatic checks (safe, sound, tests) run light per story and in full over the whole epic, and report pass/fail **truthfully** — a real failure is never dressed up as a pass |
| F | **The safety hooks and permissions** | Dangerous shell commands are blocked, generated files land at the right name and place, every build request is steered into the workflow, and each helper is told which epic/stage/story it's on |
| G | **The generated code and app tests** | The code follows the standing policies (no error suppressions, exact API paths, Shadcn-only UI, one central place for styling, a role on every story, plain-language checklists), and the three test layers cover each behaviour exactly once |

**Why most of this is testable.** A, B, E, and F are predictable — a stage move is
legal or it isn't, a merge happened through a request or it didn't, a command is
blocked or it isn't. G is predictable to *check* even though the way Claude *writes*
the code isn't — we check the finished code against the rules. C and D are
behaviours of the *running* workflow, so we prove the pieces on their own (Tier 1),
prove they left the right traces in a recorded run (Tier 2), and confirm the whole
thing feels right with a person driving it (Tier 3). The one thing we deliberately
**don't** test is whether the AI writes *good* code — that's a judgement no unit
test can make reliably.

---

## What this suite is pinned to

These tests describe **one specific version of the template** and will fail loudly
against a different one. They currently expect:

- **Seven stages per epic:** INTAKE → PLAN → BUILD → EPIC-END → MANUAL-TEST →
  COMPLETE-ON-BRANCH → COMPLETE. The unit of work is the **epic**, built on its own
  branch.
- **Two requirements files:** shared `generated-docs/project.md` on `main`, and a
  per-epic `generated-docs/epics/<epic>/brief.md`. There is **no** single
  "project-brief.md" and no "FRS".
- **Per-epic state on the branch:** `generated-docs/epics/<epic>/state.json`. There
  is **no** repo-wide `workflow-state.json` and **no** "repair" step — recovery is
  just "check out the branch and `/continue`".
- **Four quality checks:** does-it-work (manual, at MANUAL-TEST) plus safe, sound,
  and tests (automatic). There is **no** separate performance gate, **no** Gate 6,
  and **no** spec-compliance watchdog.
- **No telemetry / usage reports and no session logs.** The retired version wrote a
  `telemetry.ndjson` ledger and `.claude/logs/*.md`; both are gone. Their presence is
  a red flag, not a feature.
- **No `code-reviewer` agent.** The end-of-epic review is a built-in step, not a
  helper.

> If a whole batch of tests starts failing after a template update, suspect a
> **version mismatch** against this list before assuming the template is broken.

> **This pinning is now generalised.** The single-version pinning above is the
> *default target*. The suite can be aimed at any template at any version, and each
> version is judged against **its own** recipe — see
> [Testing any template, any version](#testing-any-template-any-version-and-comparing-before-release)
> below. So a "version mismatch" is no longer a wall of red: the drift banner names
> the gap and version-gated checks skip what didn't exist yet.

---

## Testing any template, any version (and comparing before release)

Everything above pins the suite to **one** template version. This section
generalises that: the same tests can be aimed at **any** template, at **any**
version, and can **compare two versions** to answer *"is dev safe to promote to
release?"* — without editing a single test. It leans entirely on the one path the
suite already resolves through (`REPO_ROOT`, via the `target` helper); the new
machinery is a thin front layer, and it is held to every rule above (a good **and**
a broken case, its own throwaway folder, self-cleanup, never touches the real
project).

**The template carries its own version.** Every template records where it stands in
a `template-version.json` at its root (e.g. `{ "templateRef": "v1.1.0" }`) and
documents how it got there in a root `CHANGELOG.md` ([Keep a
Changelog](https://keepachangelog.com/en/1.1.0/) format: `## [1.1.0] - 2026-07-14`
headers with `### Added` / `### Changed` / `### Removed` / `### Fixed` entries). The
suite reads both — the marker to know *which* version it is testing, the changelog
to explain *why* two versions differ.

### Two more promises the suite tests

| # | The thing | The promise |
|---|-----------|-------------|
| H | **Any template, any version** | QA names a template (`dev` / `release` / …) and a version, and the suite tests exactly that — downloading it, aiming itself at it, judging it against *that version's own* recipe, and filing the result under its name and version. No test edits. |
| I | **Safe-to-promote comparison** | Lining dev up against release shows exactly what differs. A difference a changelog entry explains is flagged **pending-promotion** (amber — it does not fail the run); a difference with **no** changelog entry behind it is **unexplained drift** and fails (red). |

### The new machinery (and the real files it leans on)

| Piece | What it is | Leans on |
|-------|-----------|----------|
| `targets.json` | The channel list — each named template → its repo URL and its contract file. One line to add a template. | — |
| `run-target.cjs` | The "tune in" step — clones a named target at a ref into a throwaway checkout, points `REPO_ROOT` at it, runs the suite, files results under `<target>-<ref>`. | `target` helper, `template-version.json` |
| `template-contract.{dev,release}.json` | Two recipes, one per template, so each version is judged against its own shape — never against the other's. | `reconcile-template.cjs` |
| `VERSION` | The suite's own baseline — the template version these tests were written for. | — |
| `helpers/changelog.ts` | Parses a template's `CHANGELOG.md` and returns the entries between two versions. | `CHANGELOG.md` |
| `compare-targets.cjs` | The comparison step — diffs two checkouts' live values and attributes each difference to a changelog entry (explained → amber) or to none (unexplained → red). | `changelog.ts`, `reconcile-template.cjs` |

### New test areas

| # | Area | What it covers | Tier |
|---|------|----------------|------|
| N | **Channel resolution** | `targets.json` + the resolver in `run-target.cjs` — a named target maps to its URL and contract | 1 |
| O | **Per-version contract** | contract selection by active target; each version green against its **own** recipe | 1 |
| P | **Version marker & gap** | `template-version.json` read; suite `VERSION` vs template ref; the drift banner | 1 |
| Q | **Changelog & attribution** | `changelog.ts` parsing + entries-between + explained-vs-unexplained classification | 1 |
| R | **Dev-vs-release comparison** | `compare-targets.cjs` — green / amber (explained) / red (unexplained) | 1 → 2 |
| S | **Version-gated tests** | a check declares "applies from vX.Y" and skips as Not-Applicable on older versions | 1 |
| T | **Grade by own rules** | the suite reads the version's *live* values, never today's hardcoded ones (essential for the live Tier-3 grade) | 1 → 3 |
| U | **Labelled results** | results filed under `<target>-<ref>` so two versions sit side by side | 1 → 2 |

> **Where the live download sits.** The *logic* above (parsing, resolving,
> attributing, gap maths, label routing) is Tier 1 — pure, fast, fed fixtures (a
> sample `targets.json`, a sample `CHANGELOG.md`, two synthetic template trees),
> offline, each with a good and a broken case. The *actual clone* of a real ref is
> network-bound and slow, so it is proven once as a recorded checkout in Tier 2 and
> end-to-end by a person in Tier 3 — the same split the rest of the suite already
> uses.

### Every check has a "good" case and a "broken" case (rule 1)

| Check | "Good" case (passes) | "Broken" case (must go red) |
|-------|----------------------|------------------------------|
| Channel resolves | `dev` / `release` → their repo URL + contract | An unknown target name → clear error, **not** a silent default |
| Checkout aims the suite | After `run-target dev v1.1.0`, the template resolves at the throwaway checkout and is present | A bad ref → fails loudly, **never** falls back to a stale prior checkout |
| Right recipe chosen | Testing `dev` loads `…dev.json`; `release` loads `…release.json` | A declared target with a missing contract file → fails visibly, not silently using the other's |
| Per-version contract | Release live values match the release contract → green | A stage in release's live values but absent from its contract → red |
| Version marker read | Valid `template-version.json` → its `templateRef` parsed | Missing / malformed marker → falls back or reports "unknown", **never** crashes |
| Gap banner | Suite baseline == template ref → "in sync" | Template older than the baseline → the gap is **shown**, not swallowed |
| Changelog parses | Real `CHANGELOG.md` → ordered versions with typed entries | A malformed heading → skipped and flagged; the parser does **not** throw |
| Entries-between | Between `1.0.0` and `1.1.0` → the `1.1.0` entries | A reversed or equal range → empty, not an error |
| Difference attributed | A diff matching a changelog entry → **explained** (amber) | A diff with no entry → **unexplained** (red), surfaced not hidden |
| Comparison verdict | Two identical templates → green; differ only by logged work → amber, run **not** failed | Differ with an unexplained diff → red |
| Version gate | A check marked "from v1.1.0" runs on v1.1.0, **skips** on v1.0.0 | The same gated check *fails* instead of skipping on the older version |
| Grade by own rules | Point at v1.0.0 → reads v1.0.0's rules and grades against them | An old version graded against today's hardcoded rules → fake failure (the thing we prevent) |
| Labelled results | A run for `dev v1.1.0` writes to `…/dev-v1.1.0/` | Two versions' results colliding in one undifferentiated folder → flagged |

### Handling the version gap honestly (the four layers)

When the suite is newer than the template it is testing, a check for something that
did not exist yet must **never** read as a bug. Four layers keep the gap visible and
out of the failure count:

- **A — Show the gap.** Every run prints and saves three facts: the version the
  suite was written for (`VERSION`), the version under test (`template-version.json`
  → `templateRef`), and the gap between them — and, using the changelog, *what*
  changed across that gap. A gap is never a mystery.
- **B — Gate each test by version.** A check declares the versions it applies to;
  checks for later features **skip as Not-Applicable** on older versions, never fail.
  Green = correct for this version · Skipped = not part of it yet · Red = a real
  problem.
- **C — Judge by the version's own rules.** Wherever it grades, the suite reads the
  template's *live* values (its stages, statuses, doc names) from the version under
  test — never today's hardcoded ones. **Essential for the live Tier-3 grade:** the
  app is judged against the rules that shipped *with the version under test*.
- **D — Match the suite to the version.** The cleanest option: the suite is
  versioned too (its `VERSION` file, and its own git tags), so to test a
  3-versions-old template you can run the suite *as it was then* — zero gap. Default
  to **D** for a true like-for-like run; back it with A + B + C so a single suite can
  still stretch across nearby versions honestly.

> **Two versions, two homes (decided).** The **suite's** version lives in its
> committed `VERSION` file (it declares *"I was written for vX.Y"*); the
> **template's** version is its own `template-version.json` (`templateRef`), with the
> git tag as a fallback. The drift banner (Layer A) prints the two side by side and
> lists the changelog entries between them.

---

## The three tiers of tests

Tests run from fast-and-automated (bottom) to slow-and-human (top). Each tier
catches what the tier below it can't, and each is cheaper to run than the one above
— so we lean on the lower tiers for everyday confidence and save the human
walkthrough for releases.

| Tier | What it is | Runs automatically? | Needs a live AI? | Where it lives |
|------|------------|---------------------|------------------|----------------|
| **1** | Unit tests of the scripts, hooks, schemas, docs, git machinery, and generated-code rules | Yes | No | `tier-1-unit/` |
| **2** | Invariant checks over a **recorded real run** — its branches, commits, and `generated-docs/` output | Yes | No (recorded once by hand) | `tier-2-recorded-run/` |
| **3** | A person runs the real workflow with a real AI and confirms it behaves | No (manual) | Yes | The human walkthrough |

**Why three tiers and not just unit tests.** A unit test can prove that
`epic-state.js` does the right thing when you call it. It **cannot** prove the AI
actually advances the stage at the right moment, that a story became exactly one
commit, that the merge waited for your approval, or that a "please double-check"
item was floated to the top of your hands-on check. Those are behaviours of the
running workflow. So Tier 1 proves each piece works on its own; Tier 2 proves the
pieces left the right *traces* in a real run (read from git and the generated files,
no AI needed at test time); Tier 3 proves the whole thing feels right when a human
drives it live.

**What changed from the old design, and why.** The retired suite had a middle tier
that replayed a `telemetry.ndjson` ledger. That ledger no longer exists, so the
same *idea* — "record one real run, then replay it automatically without the AI" —
now reads its truth from the two things a real run *does* leave behind: the **git
history** (branches, commits, the merge) and the **`generated-docs/` tree** (the
plan, the briefs, the story files, the notebook, the registry). It's a sturdier
source of truth anyway, because it's the actual output a user keeps.

---

## What we actually test (the surface area)

Each area maps to a tier and to the real machinery under `.claude/`.

| # | Area | The real files it covers | Tier |
|---|------|--------------------------|------|
| A | **Epic-state machine** | `epic-state.js` (create/read/advance a stage), `mark-epic-complete.js` (freeze after merge), `resolve-state-path.js` (find the branch's state file) | 1 |
| B | **Legacy migration** | `migrate-legacy-state.js` — upgrades an old-shape project to the epic-branch model | 1 |
| C | **Quality-checks runner** | `quality-gates.js` — runs the automatic checks and reports pass/fail | 1 |
| D | **Dashboard & progress** | `collect-dashboard-data.js`, `generate-dashboard-html.js` (pulls every branch together, auto-refresh, fire-and-forget) | 1 |
| E | **Import, scan & setup utilities** | `import-prototype.js`, `scan-doc.js`, `init-preferences.js`, `run-smoke-test.js`, `summarize-playwright.js` | 1 |
| F | **Permission & doc-name hooks** | `bash-permission-checker.js`, `enforce-generated-doc-names.js` (+ `validate-generated-doc-names.js`) | 1 |
| G | **PowerShell hooks** | `workflow-guard.ps1`, `inject-phase-context.ps1`, `inject-agent-context.ps1` (tested with Pester) | 1 |
| H | **Branch & merge machinery** | Epic branch naming and the auto-combine-vs-halt behaviour, exercised in a throwaway git repo | 1 |
| I | **Doc & config consistency** | Agent/command frontmatter, and cross-references between `CLAUDE.md`, the agents `README.md`, and the real files on disk | 1 |
| J | **JSON schema validation** | `state.json` matches its schema (its stage list is imported from the template, not copied) | 1 |
| K | **Generated-code linting** | Rules over the `web/src/` code the workflow produces (see the rule list below) | 1 |
| L | **Recorded-run invariants** | One captured run's branches, commits, and `generated-docs/` output | 2 |
| M | **Live behaviour** | The full workflow with a real AI — the final word | 3 |

> **Some Tier-1 tests ship next to the code.** Several scripts carry their own
> co-located tests (`epic-state.tests.js`, `bash-permission-checker.tests.js`,
> `scan-doc.tests.js`, and so on). The suite in this folder adds the cross-cutting
> checks those can't cover on their own — doc drift, schema, git machinery,
> generated-code linting, and the recorded-run invariants.

### The generated-code rules that Tier 1 checks (area K)

Each rule is a small pure function, tested two ways: fed known-good and known-bad
samples (always runs), and run over the real `web/src/` / `generated-docs/` output
when it exists (skips visibly when it doesn't, so a clean template can't show a fake
green). The rules, each tied to a standing policy:

- **No error suppressions** — no `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`, or
  `eslint-disable` anywhere.
- **Shadcn only** — every UI primitive is imported from `@/components/ui/`, not
  hand-rolled from raw HTML + Tailwind.
- **Exact API paths** — the generated endpoint functions use the exact paths from
  the data-service description, never a guessed one; all data calls go through the
  one shared client, never a raw `fetch()`.
- **One place for styling** — colours, fonts, and spacing reference the central
  tokens, with no one-off colour codes scattered in individual screens.
- **Every story has a role** — each story file carries a non-empty role.
- **Plain language** — the user-facing hands-on checklists contain no engineering
  jargon (`tsc`, `ESLint`, gate numbers, `isLoading`, `Skeleton`, …).

---

## Where things live (the layout the suite expects)

The suite is a self-contained npm workspace with its own `package.json` — carry the
folder anywhere and run `npm install && npm test`. One test file per thing under
test, so a failing file points straight at the piece that broke.

Legend: ✅ present and current · ⬜ planned, not built yet. (Everything that was
wired to the retired model has now been either removed or ported.)

```
AI-tests/
├── helpers/                     Reusable test plumbing (see "The shared helpers")
│   └── schemas/
│       └── intake-manifest.schema.json     ✅ (workflow-state 4-phase schema was removed)
├── fixtures/
│   ├── scenarios/               ✅ Team Task Manager + variants a/b/c (+ manual-verify cases)
│   └── checkpoints/             ✅ CP-N snapshots (optional; synthesised if absent)
│                                  (golden-logs/ and golden-telemetry/ were removed)
├── tier-1-unit/
│   ├── scripts/                 ✅ one file per surviving .claude/scripts/*.js (dashboard tests ported)
│   ├── hooks/                   ✅ bash-permission + Pester (workflow-guard, inject-*)
│   ├── consistency/             ✅ frontmatter + cross-refs + manual-verify-* (ported)
│   ├── schemas/                 ✅ intake-manifest validation
│   └── artifact-lint/           ✅ the generated-code rule checks
├── tier-1-unit/git-machinery/   ✅ epic lifecycle + auto-combine-vs-conflict substrate
├── tier-2-recorded-run/         ✅ scaffolded — invariants skip until fixtures/golden-run/ is captured
├── tier-3-pointer.md            ✅ points to the human walkthrough
├── vitest.config.ts             ✅
├── package.json                 ✅
└── README.md                    ✅ describes the epic-branch model
```

> **What changed in this cleanup.** The retired telemetry/log middle tier
> (`tier-2-log-replay/`), its fixtures (`golden-logs/`, `golden-telemetry/`), the
> session-log helpers (`parse-session-log.ts`, `assertions.ts`), and every Tier-1
> test whose target no longer exists in the template (`transition-phase`,
> `detect-workflow-state`, `validate-phase-output`, the telemetry/traceability/
> progress-index/todo-list report scripts, `copy-with-header`,
> `claude-md-permission-checker`, `gate-6`, the `spec-compliance-watchdog` checks,
> and the 4-phase `workflow-state` schema) were **removed**. What remains either
> already fits the epic-branch model (✅) or is honest not-built-yet work (⬜) —
> see [The suite as it stands today](#the-suite-as-it-stands-today).

---

## Tier 1 — the automated unit tests

Standard Vitest (JavaScript) and Pester (PowerShell) tests. They run on every
change and finish in seconds. A few areas get extra care:

- **Epic-state machine.** `epic-state.js` only accepts valid stage moves (the seven
  stages in order, plus BUILD's per-story loop), refuses to advance a stage whose
  inputs aren't ready (e.g. BUILD before the story list is approved), and creating a
  fresh epic's `state.json` produces the same file every time. `mark-epic-complete.js`
  freezes an epic's record correctly, and `resolve-state-path.js` finds the right
  state file for the branch you're on. These two exact operations get the most care
  because the workflow relies on them being perfectly repeatable.
- **Branch & merge machinery (git sandbox).** In a throwaway repo, we prove: an epic
  branch is named `epic/<slug>`; two epics that touch the central style file or the
  stand-in data in *non-conflicting* ways combine cleanly on their own; two epics
  that change the *same* code conflictingly, or want different versions of the same
  outside tool, **stop and surface both versions** instead of guessing; and a merge
  into `main` only happens through a request, never a silent direct push.
- **Permission-hook fuzzing.** `bash-permission-checker.js` decides which shell
  commands are allowed. It's security-critical, so it's tested against a big table of
  real commands plus adversarial inputs (`rm -rf /` variants, encoded strings,
  whitespace tricks). One dangerous command slipping through is the failure we most
  want to catch.
- **Generated-doc-name enforcement.** `enforce-generated-doc-names.js` (via
  `validate-generated-doc-names.js`) must allow a file written to the correct
  epic-scoped place (`generated-docs/epics/<epic>/…`) and block one with the wrong
  name or location.
- **Doc and config drift.** The biggest rot in a template is documentation that no
  longer matches the files. So we check: every agent file has valid frontmatter and
  appears in the agents `README.md`; every `/command` mentioned in `CLAUDE.md`
  exists; every hook command in `settings.json` points at a real file; and the agent
  list matches what's on disk (which must **not** include a retired `code-reviewer`).
- **JSON schema checks.** `intake-manifest.json` is validated against a formal schema
  today. A per-epic `state.json` schema is **planned** — it should import its stage
  list from the template's own single source (`epic-state.js` → `EPIC_PHASES`), never
  copy it, so it can't drift. (The old 4-phase `workflow-state` schema was removed
  because it single-sourced from `workflow-helpers.ALL_PHASES`, which no longer
  exists.)
- **Generated-code linting.** The rules above, proven on samples and then run over
  the real output when it exists.

---

## Tier 2 — invariants over a recorded run (the bridge)

> **Status: scaffolded; skips until a golden run is captured.** The retired
> telemetry-based Tier 2 was removed; this is its replacement, reading its truth from
> git and the generated files instead of a telemetry ledger. The harness is built
> (`tier-2-recorded-run/recorded-run.test.ts` + `helpers/golden-run.ts`) — its
> invariants **skip visibly** until a real run is recorded into
> `fixtures/golden-run/` (see that folder's README), then activate automatically. The
> artifact invariants run on a `generated-docs/` tree; the git-topology invariants
> additionally need a `repo.bundle`.

This is the bridge between "each script works" (Tier 1) and "needs a live AI"
(Tier 3). It reads the traces one real run leaves behind and checks the things that
only make sense across a whole epic.

**How it works:**

1. **Record once, by hand.** A person runs the workflow end-to-end for the Team Task
   Manager (see below), building at least one epic through to a merge. The result — a
   git bundle of the `epic/<slug>` branch and the merge into `main`, plus a copy of
   the `generated-docs/` tree — is saved into `fixtures/golden-run/` as the committed
   recording.
2. **Replay automatically.** The Tier 2 tests load that bundle and tree — no AI is
   needed at test time.
3. **Check the invariants.**

**What we check (all read from git + files, no AI):**

- **One branch per epic, correctly named** — the recorded branch is `epic/<slug>`,
  and the finished work reached `main` through a merge, not a direct push.
- **One commit per story** — each story maps to its own commit, with a descriptive
  subject and a body that records the notable decisions the developer made on its own.
- **The state file is well-formed and ordered** — `state.json` validates against the
  schema, and the stages it recorded never skip or go backwards.
- **The plan covers the request** — `epic-plan.md` lists the epics with their
  dependencies and a coverage note that accounts for every part of the request.
- **Every story is complete on paper** — each story file has a non-empty role and
  testable acceptance criteria.
- **The notebook and registry are real** — `journal.md` has plain-English decision
  entries; `architecture.md` registry entries are well-formed; any "please
  double-check" items exist and were floated ahead of the merge.
- **The app tests line up with the stories** — every routable story has a live
  Playwright spec; a non-routable one has a spec marked "to be filled in later" with
  a one-line reason (and that marker is **not** allowed on a routable one).
- **The absence canaries** — no `telemetry.ndjson`, no `.claude/logs/*.md`, no
  `project-brief.md`, no four-phase stage names, no performance gate, no
  `code-reviewer`. A freshness canary also warns if the recording is older than the
  orchestrator rules or `settings.json`, a sign it needs re-recording.

> **When to re-record.** The recording is a committed fixture. Re-record it after
> any change that alters how the workflow runs (orchestrator rules, agent prompts,
> settings, hooks): run the Tier 3 walkthrough once and copy the fresh bundle and
> tree over the old one.

---

## Tier 3 — the human walkthrough (the final word)

A person runs the real workflow with a real AI and confirms each behaviour. It's run
before a release, and each clean pass is a good moment to re-record the Tier 2
fixture. The automated tiers exist to catch most regressions without a person — but
the walkthrough is the final word on whether the template works.

The behaviours worth walking by hand — the ones no unit test can judge — are:

- **`/start` flows straight into work** — setup installs what's missing and continues
  into the first question in one go; it doesn't stall on "setup complete".
- **The seven stages happen in order**, on the epic's own branch, with `/continue`
  picking up from wherever you left off after a close-and-return.
- **The four approvals each show the content first** — the project facts + epic plan,
  the story list, the hands-on checklist, and the merge — never a "naked" approval.
- **Sign-in is always asked openly** — the three options are shown with their
  trade-offs and never silently inferred.
- **BUILD runs on its own** and only stops for a genuinely risky (Level 4) decision —
  a new dependency, a data-shape or auth change, an endpoint the description doesn't
  cover — surfacing the options instead of guessing.
- **The autonomy tiers leave the right trail** — small choices mentioned with the
  saved work, notable ones in the notebook, external unknowns on the "please
  double-check" list before the merge.
- **EPIC-END runs the full checks, the built-in review, and the browser tests**, and
  routes any failure back through the responsible story (at most three tries, then it
  asks you).
- **MANUAL-TEST is genuinely hands-on** — the checklist opens in the browser with the
  double-check items on top and one-click sign-ins; "found a problem" leads to a fix
  and a re-ask.
- **The merge waits for you** — COMPLETE-ON-BRANCH never merges on its own.
- **Recovery is painless** — with the state file gone, checking out the branch and
  running `/continue` still carries on from the right spot (and a hook restores
  bearings after the AI's memory is auto-trimmed).

---

## Every check has a "good" case and a "broken" case (rule 1)

A sample of the pairs the suite proves both ways — the "broken" case is what makes
each check trustworthy.

| Check | "Good" case (passes) | "Broken" case (must go red) |
|-------|----------------------|------------------------------|
| Valid stage move | PLAN → BUILD with the story list approved → allowed | PLAN → EPIC-END, or BUILD before stories are approved → refused |
| Fresh epic state is repeatable | `epic-state.js` creates the same `state.json` twice → identical | A create that varies run to run → flagged |
| State path resolves per branch | `resolve-state-path.js` finds the current epic's file → correct | Points at the wrong branch's file → flagged |
| Merge waits for approval | Epic reaches `main` via an approved merge → passes | A direct push to `main` bypassing the merge → flagged |
| Overlaps auto-combine | Two epics add different style tokens → combine cleanly | Two epics edit the same code conflictingly → stop and show both |
| Quality check reports truthfully | A clean epic → safe/sound/tests pass | Inject a type error → the "sound" check reports FAIL and blocks the save |
| Dangerous command blocked | `ls`, `npm test` → allowed | `rm -rf /` and variants → denied |
| Doc name enforced | A file at `generated-docs/epics/<epic>/…` → allowed | A file with the wrong name or location → blocked |
| No error suppressions | Clean generated code → passes | `@ts-ignore` / `eslint-disable` added → flagged |
| Exact API paths | Endpoints use the description's `/api/v2/tasks` → passes | A guessed `/api/tasks`, or a raw `fetch()` → flagged |
| Story has a role | A non-empty role line present → passes | An empty or missing role → flagged |
| Routable story has a live spec | A live `test()` in its Playwright file → passes | The whole suite marked "fill in later" on a routable story → flagged |
| Content before approval | The plan shown above the Approve buttons → passes | A "naked" approval question with nothing to review → flagged |
| Absence canary | No telemetry ledger / no `code-reviewer` → passes | Either reappears → flagged |

---

## The shared helpers, checkpoints, and rollbacks

A small set of helpers keeps each test short, and two shared ideas keep them fast.

| Helper | What it does |
|--------|--------------|
| `temp-project` | A throwaway project per test |
| `git-sandbox` | A throwaway git repo with branch/commit/merge helpers — powers the branch-and-merge tests |
| `checkpoint-fixtures` | Start at CP-0 … CP-5 without running the whole workflow |
| `rollback` | The RB-0 … RB-7 cleanup recipes |
| `state-fixtures` | Seed and read an epic `state.json` or a generated artifact |
| `run-script` | Runs a `.claude` script as a real subprocess and captures its output + exit code |
| `snapshot` | Normalises output so snapshot comparisons stay stable |
| `target` | Resolves the one path to the template under test (defaults to the parent repo, overridable with `REPO_ROOT`) |

### Checkpoints (CP-0 … CP-5)

Named starting states, so a test doesn't have to run the whole workflow to reach the
point it cares about. Loaded from fixtures in automated tests — a speed trick, not a
dependency chain.

- **CP-0** — clean project on `main`, nothing started
- **CP-1** — INTAKE done (`project.md` and `epic-plan.md` approved on `main`)
- **CP-2** — an `epic/<slug>` branch created, PLAN done (story list approved)
- **CP-3** — BUILD in progress (at least one story committed on the branch)
- **CP-4** — EPIC-END passed / MANUAL-TEST reached
- **CP-5** — epic merged into `main` (COMPLETE)

### Rollback recipes (RB-0 … RB-7)

Standard cleanup steps, each with an ID so a test can say exactly how it reset (they
match `helpers/rollback.ts`): **RB-0** full clean reset (remove `generated-docs/` +
`documentation/`), **RB-1** reset epic state (remove `generated-docs/epics/`),
**RB-2** revert a single file, **RB-3** remove a test doc file, **RB-4** remove the
legacy top-level `workflow-state.json`, **RB-5** restore write permissions on
`generated-docs/` (Windows), **RB-6** reinstall dependencies, **RB-7** revert the
last injected error. Most are best-effort — each test's own temp-dir cleanup is the
real reset; the ID mainly documents what the test touched.

---

## The make-believe project used for every run

To keep two runs comparable, the suite always uses one imaginary project — the
**Team Task Manager** — a task tool for small teams with two user types (admin and
member), a clear set of data (title, description, due date, assignee, status), no
starting data-service description, a data source still in development, some styling
preferences, and no regulated data. It's picked because it exercises a lot of the
workflow at once: permission handling between roles, a real data service to design, a
stand-in-data layer to build against, a styling pass, and **two epics** so we see the
move from one epic (and one branch) to the next.

There are a few **variants** to switch in only when a test calls for them: sign-in
handled by your own server (the "own server" auth path), no data source at all
(stand-in data only), and "you already provided a data-service description" (used to
prove the generated code honours the exact paths).

---

## The suite as it stands today

This document describes the **target** — testing the current epic-branch workflow.
The suite on disk is partway there. Here is the honest state after the retired
material was removed, so nobody mistakes a red test for a broken template when it's
really a test that hasn't caught up.

**Where it stands:** aimed at the release template (v1.1.0), the suite reports
**314 passing, 6 failing, 10 skipped**. The retired tests listed below have now
been **deleted from disk** (not just described as removed), so a plain run is no
longer buried in stale reds. The 10 skips are the artifact-lint regression scans +
recorded-run invariants, awaiting the output/fixture they scan.

**The 6 remaining failures are a real finding, not a broken test.** They live in
`enforce-generated-doc-names.test.ts` and `validate-generated-doc-names.test.ts`:
release v1.1.0's doc-name enforcement does **not** block drift-named files in
epic-scoped directories — the exact bug this suite found and got fixed *after*
v1.1.0 shipped. This is the flexibility tooling working as intended: catching a
genuine version difference. The clean follow-up is to **version-gate** these two
checks (Layer B — "applies from v\<fix\>") so they *skip* on versions that predate
the fix and only go red if it regresses on a version that should have it.

> **Standalone (rule 6) — fixed.** A plain run with **no** template now reports
> **79 passing, 0 failing, 75 skipped** — no crashes. Previously 7 template-
> dependent files (`doc-name-conventions`, the three `manual-verify-*`,
> `shared-policies-references`, `epic-state` schema, `recorded-run`) crashed with
> `ENOENT` because they read `.claude/` before the skip guard applied. The fix:
> those suites now use `describeTemplate` so they skip cleanly, the `epic-state`
> schema omits an `enum` when its source list is empty (an empty `enum: []` is an
> invalid schema that threw at import), and the template-independent failure-path
> checks were split out to plain `describe` so they still run standalone.

### Removed (retired — targets no longer exist in the template)

The whole telemetry/log middle tier and every Tier-1 test whose target script,
hook, agent, or feature is gone:

- Tier-1 scripts: `transition-phase`, `detect-workflow-state`, `validate-phase-output`,
  `generate-telemetry-report`, `generate-traceability-matrix`, `generate-progress-index`,
  `generate-todo-list`, `copy-with-header`.
- Tier-1 hooks: `claude-md-permission-checker`, `capture-context` (Pester).
- Tier-1 consistency: `gate-6-wired`, `spec-compliance-watchdog-frontmatter`;
  artifact-lint `no-suppression-in-watchdog`.
- The 4-phase `workflow-state` schema + test (single-sourced from the removed
  `workflow-helpers.ALL_PHASES`).
- The entire `tier-2-log-replay/` folder, `fixtures/golden-logs/`,
  `fixtures/golden-telemetry/`, and the session-log helpers `parse-session-log.ts`
  and `assertions.ts` (including the retired `[Logs saved]` check).
- Wiring: the `test:tier2` script and the `--telemetry-root` flags were dropped from
  `package.json`, and the dead `tier-2-log-replay` glob/label were removed from
  `vitest.config.ts` and the report runner.

### Passing and current (✅ — keep)

Permission-hook fuzzing (`bash-permission-checker`), the doc/config consistency
checks, the `intake-manifest` schema, all five artifact-lint rules, the PowerShell
hooks (`workflow-guard`, `inject-agent-context`, `inject-phase-context`), and the
surviving script tests (`import-prototype`, `init-preferences`, `quality-gates`,
`scan-doc`, and the report runner's own test).

### Ported to the epic-branch model (✅ — were failing, now green)

| File(s) | What the port did |
|---------|-------------------|
| `helpers/state-fixtures.ts` | Replaced the retired `seedState`/`seedArtifact` (which wrote `workflow-state.json` + `project-brief.md`) with epic-branch seeders: `seedEpicState` (per-epic `state.json`), `seedProjectMd`, `seedEpicPlan`, `seedStoryFile`, `seedLegacyState` |
| `helpers/checkpoint-fixtures.ts` | Re-based CP-0…CP-5 on the epic-branch layout (was CP-0…CP-4 on the 4-phase model) |
| `scripts/collect-dashboard-data.test.ts` | Rewritten against the git-based `collect()` contract — `no_project` / `legacy_detected` / `ok`-with-plan, plan-readiness derivation, and an in-flight `epic/<slug>` branch (via `gitSandbox`) |
| `scripts/generate-dashboard-html.test.ts` | Rewritten to render from the epic payload — always writes HTML (every status), the auto-refresh tag, deterministic per fixed state, differs when state differs |
| `consistency/manual-verify-*.test.ts` (×3) | Re-pointed at the current MANUAL-TEST wiring in `continue.md` §B7.1 + `approval-pattern.md` — the `manual-tests.html` check-off page, `state.json.epic.manualTestResults` persistence, tick-carry-forward with a 3-cycle cap, and free-text issue handling |

### Added since (✅ — Priority 1 of [TEST-PLAN.md](TEST-PLAN.md))

- **Per-epic `state.json` schema** single-sourced from `lib/epic-state.js`
  (`tier-1-unit/schemas/epic-state.test.ts`) — validates `defaultEpicState`, the
  `epic-state.js --init` output, and seeded states; checks the transition graph; and
  a drift guard that pins the template's enums to the documented six-stage contract.
- **`mark-epic-complete.js`** (`tier-1-unit/scripts/mark-epic-complete.test.ts`) —
  the `COMPLETE-ON-BRANCH → COMPLETE` flip, idempotency, ready-phase gating, and the
  path-traversal slug guard.
- **Doc-name conventions + enforcement** — the six conventions, the
  `enforce-generated-doc-names.js` write-gate, the `validate-generated-doc-names.js`
  audit, and their agreement with `naming-conventions.md`. This surfaced and fixed a
  real bug: the shared `dirGlobToRegex` never turned the `<slug>` placeholder into a
  wildcard, so the four epic-scoped conventions (`epic-brief`/`epic-state`/
  `epic-journal`/`story-file`) were silently unenforced on real epic directories.
- **Artifact-lint paths fixed** to the epic-branch layout (roles + manual-test
  checklists now scan `generated-docs/epics/<slug>/stories/`, not the retired flat dirs).

### Added since (✅ — Priority 2 of [TEST-PLAN.md](TEST-PLAN.md))

- **`resolve-state-path.js`** cross-check — epic/<slug> path resolution, kind:none on
  main, invalid-slug error, and that legacy `workflow-state.json` is never a valid source.
- **`summarize-playwright.js`** — clean/fail verdicts, failing-spec → story mapping,
  the run-level-error broken-run guard, and bad-report exit 2.
- **`run-smoke-test.js`** — the credential-safety invariant (a value echoed in a
  response body is redacted; the `.sh` artifact carries references, never values),
  `credentials_missing`, and connection-refused categorisation. Uses an in-process
  echo server via async spawn (not the blocking `spawnSync`).
- **Agent frontmatter extended** — `model ∈ {haiku,sonnet,opus}`, non-empty
  `tools`/`color`, and every backticked `*.js` script named in `agents/README.md`
  resolves on disk.

### Added since (✅ — Priority 3 of [TEST-PLAN.md](TEST-PLAN.md))

- **`shared/` + `policies/` orphan & reference checks** — every shared/policy doc is
  referenced somewhere in the template corpus, and every `shared/`|`policies/`
  reference resolves (broadens the old CLAUDE.md-only check).
- **Branch-and-merge git-machinery** (`tier-1-unit/git-machinery/`) — the epic
  lifecycle (branch → merge → `mark-epic-complete` → shows as *merged* not in-flight),
  plus the auto-combine-vs-conflict substrate (different tokens merge cleanly; same-line
  edits conflict — the workflow's halt trigger). The "does Claude choose to combine or
  halt" judgement stays Tier 3.

### Added since (✅ — Priority 4 of [TEST-PLAN.md](TEST-PLAN.md))

- **Recorded-run Tier 2 scaffolded** — `helpers/golden-run.ts` loads a captured run
  (a `repo.bundle` or a `generated-docs/` tree from `fixtures/golden-run/`);
  `tier-2-recorded-run/recorded-run.test.ts` asserts the invariants (state.json
  schema, story role + acceptance criteria, per-epic journal, absence canaries, and —
  with a bundle — one-branch-per-epic / merge-not-direct-push / commits ≥ stories).
  The harness meta-checks always run; the invariants skip visibly until the fixture
  exists. Verified against a synthetic docs tree.

### Added since (✅ — flexibility: any template, any version)

The machinery from [Testing any template, any
version](#testing-any-template-any-version-and-comparing-before-release) is now
built and green (36 Tier-1 tests, each a good **and** a broken case):

- **Channels + tune-in** — `targets.json` (dev → `stadium-software/stadium-8`,
  release → `Digiata/Stadium-Builder`), `scripts/run-target.cjs` (clone a ref into
  throwaway `.targets/`, print the Layer-A drift banner, aim `REPO_ROOT` +
  `QA_TARGET`, file results under `<target>-<ref>/`).
- **Per-version recipes** — `template-contract.{dev,release}.json`;
  `helpers/template-contract.ts` and `reconcile-template.cjs` pick the active
  target's contract (`QA_TARGET`), falling back to the default. Verified: release
  contract reconciles clean against real v1.1.0 live values.
- **Changelog attribution** — `helpers/changelog.cjs` (parse / entries-between /
  attribution) + `scripts/compare-targets.cjs` giving the three-way
  green/amber/red verdict. Verified end-to-end: identical → green, documented diff
  → amber, undocumented diff → red (exit 1).
- **Version marker + gap** — `VERSION` (suite baseline) vs `template-version.json`
  (`templateRef`), via `helpers/template-version.cjs`.

Remaining for this area: **confirm the dev recipe** by running `QA_TARGET=dev npm
run reconcile` against a dev checkout (it currently starts equal to release);
version-gating (Layer B) and grade-by-own-rules (Layer C) annotations are opt-in
and added per test as needed.

### Remaining (⬜)

- **Capture the golden run** itself (a one-time manual Team-Task-Manager run into
  `fixtures/golden-run/`) — this is the only thing standing between the Tier-2
  scaffold and a live tier; it needs a real workflow run, not code.
- **Legacy-migration** AI-tests cross-check for `migrate-legacy-state.js` (optional; it
  already has a co-located `*.tests.js`).

---

## What we deliberately don't test

- **Whether the AI writes good code.** You can't reliably unit-test "did the AI make
  the right call?" — that's a job for evaluation harnesses, not this suite.
- **The exact wording of agent prompts.** Too brittle; they change often. We check
  structure (valid frontmatter, allowed tools) instead.
- **A real AI call inside the automated run.** Expensive and flaky — the planned
  Tier 2 will replay a recording instead, and until then it's a Tier 3 check.
- **The look and feel of the built app.** How something looks or reads to a screen
  reader is a hands-on judgement — it lives on the MANUAL-TEST checklist, not here.

---

## Running the suite

```
npm install && npm test          # the standard run: builds the report and exits non-zero on failure
npm run test:raw                 # Vitest only (Tier 1 today), no report wrapper
npm run test:tier1               # Tier 1 only
npm run test:pester              # the PowerShell hooks (needs PowerShell 7 + Pester 5)
npm run test:full                # also exercise the web build, the browser specs, and the checks
```

- There is **no `test:tier2`** command — the recorded-run tier isn't built yet (see
  its Status note above). It was removed along with the retired telemetry tier.
- **Cross-platform.** Run Tier 1 on both Linux and Windows — path handling is the
  number-one source of flakiness, and this template is used heavily on Windows.
- **The tools:** **Vitest** (the JS areas), **Pester** (the `.ps1` hooks), **ajv**
  (JSON-against-schema), a **git sandbox** helper (for the planned branch-and-merge
  tests), and Node's `child_process` (running scripts where the exit code matters).
- **Tier 3 isn't an npm command** — it's the human walkthrough, run before a release.

---

## Quick reference — what each area protects against

A one-line reason per area, so a reviewer can see why each earns its place.

| Area | What breaks if it fails |
|------|--------------------------|
| Epic-state machine | The workflow accepts an out-of-order stage move, or advances with a required input missing |
| Fresh-epic / mark-complete scripts | A new epic's state file, or freezing a merged one, isn't perfectly repeatable |
| Legacy migration | An old-shape project can't be upgraded to the epic-branch model |
| Quality-checks runner | A real failure is reported as a pass |
| Dashboard | The dashboard goes stale, shows work too early, or a dashboard error stops the workflow |
| Import / scan / setup utilities | A prototype stops being detected, a doc isn't scanned, or the save/publish preference isn't saved |
| Bash permission hook | A dangerous command slips past the filter |
| Doc-name hook | A generated file lands at the wrong name or place |
| `workflow-guard.ps1` | A build request isn't steered into the workflow |
| `inject-phase-context.ps1` | After auto-trimming, the wrong epic/stage context is restored |
| `inject-agent-context.ps1` | A helper is launched without knowing its epic/stage/story |
| Branch & merge machinery | An epic merges without approval, or a real conflict is silently guessed |
| JSON schema | A silent shape change breaks existing `state.json` files |
| Consistency checks | An agent/command drifts from the docs (or a retired one lingers) |
| Artifact lint — suppressions | `@ts-ignore` / `eslint-disable` sneaks into generated code |
| Artifact lint — API paths | Generated endpoints use guessed paths, or a raw `fetch()` |
| Artifact lint — Shadcn / styling | A hand-rolled primitive or a scattered colour code appears |
| Artifact lint — role / plain language | A story loses its role, or jargon leaks into a user checklist |
| Recorded-run — branch & commits | One-branch-per-epic or one-commit-per-story stops holding |
| Recorded-run — plan & stories | The plan stops covering the request, or a story loses its criteria |
| Recorded-run — notebook / registry / double-check | The decision trail or the pre-merge double-check list goes missing |
| Recorded-run — absence canaries | A retired feature (telemetry, code-reviewer, four phases) creeps back |
| Channel resolution | A named template can't be aimed at, or an unknown name silently defaults to the wrong repo |
| Per-version contract | A version is judged against the wrong recipe, so it fails just for being ahead or behind |
| Version marker & gap | The version under test is unknown, or a suite-vs-template gap is hidden instead of shown |
| Changelog & attribution | A real difference is mistaken for expected work, or expected work is mistaken for drift |
| Dev-vs-release comparison | Unexplained drift slips into release, or documented work needlessly blocks a promotion |
| Version-gated tests | A check for a not-yet-existing feature fails an old version instead of skipping |
| Grade by own rules | An old version is graded against today's rules — a fake failure, worst of all for the live Tier-3 grade |
| Labelled results | Two versions' results collide, so the side-by-side promote check can't be trusted |
| Tier 3 — full walkthrough | Anything the automated tiers miss |
