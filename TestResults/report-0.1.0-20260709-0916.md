# Test report — 9 July 2026, 9:16am

A plain-language summary of every check we ran on the project, and how each one did.

## In short

**✅ All clear**

We ran **232** checks in total: **229 passed**, 3 not run this time.

The application and its tests come to **2,293 lines of code** across 27 files.

## The numbers

| | |
|---|---|
| Result | ✅ All clear |
| Checks run | 232 |
| Passed | 229 |
| Need attention | 0 |
| Not run this time | 3 |
| Time taken | 8.9s |
| Lines of code (app + tests) | 2,293 |
| AI usage | No AI was used in these checks |
| Run by | shamima-g on SHAMIMA-NB |
| When | 9 July 2026, 9:16am → finished 9:16am |

## How each area did

| Area | Result | Passed | Need attention | Not run |
|---|:--:|--:|--:|--:|
| Project files follow the rules | ✅ | 25 | 0 | 3 |
| Everything lines up and is consistent | ✅ | 83 | 0 | 0 |
| Built-in safety checks | ✅ | 44 | 0 | 0 |
| Saved data has the right shape | ✅ | 19 | 0 | 0 |
| Helper tools work correctly | ✅ | 58 | 0 | 0 |
| The app's own tests | — | — | — | — |
| Using the app like a person would | — | — | — | — |
| Final quality gates | — | — | — | — |

> **The app's own tests:** Not run yet — no saved result to show.
> **Using the app like a person would:** Not run yet — no saved result to show.
> **Final quality gates:** Not run yet — no saved result to show.

## Lines of code in the application

This counts the code written to build the app and its tests (it ignores blank lines, notes, data files, and the workflow tooling that ships with the template).

| Part of the project | Files | Lines of code |
|---|--:|--:|
| Application code (web/src) | 16 | 1,554 |
| TDD tests (unit, integration, click-through) | 2 | 393 |
| Application setup & configuration | 9 | 346 |
| **Total** | **27** | **2,293** |

## What needs attention

Nothing — every check passed. 🎉

## Every check we ran

The full list, in case you want the detail. ✅ passed · ❌ needs attention · ⏭️ not run.

| Check | Area | Result | Time |
|---|---|:--:|--:|
| TG-31 rule — findInventedPaths FAIL: flags a path not in the spec | Project files follow the rules | ✅ | 4ms |
| TG-31 rule — findInventedPaths PASS: accepts an exact spec match | Project files follow the rules | ✅ | 1ms |
| TG-31 rule — findInventedPaths PASS: matches a parameterised path by shape | Project files follow the rules | ✅ | 1ms |
| TG-31 rule — findInventedPaths PASS: ignores strings that are not /api paths | Project files follow the rules | ✅ | 0ms |
| TG-31 regression — real spec + endpoints every code path matches the spec | Project files follow the rules | ⏭️ | — |
| TG-33 rule — findSuppressions FAIL: flags a @ts-ignore | Project files follow the rules | ✅ | 4ms |
| TG-33 rule — findSuppressions FAIL: flags an eslint-disable-next-line | Project files follow the rules | ✅ | 1ms |
| TG-33 rule — findSuppressions FAIL: flags every directive variant | Project files follow the rules | ✅ | 1ms |
| TG-33 rule — findSuppressions PASS: clean code has no suppressions | Project files follow the rules | ✅ | 1ms |
| TG-33 regression — real web/src/ has no suppression directives in any source file | Project files follow the rules | ✅ | 20ms |
| TG-34 rule — findJargon FAIL: flags engineering jargon | Project files follow the rules | ✅ | 3ms |
| TG-34 rule — findJargon FAIL: flags a gate reference | Project files follow the rules | ✅ | 3ms |
| TG-34 rule — findJargon PASS: allows plain-language phrasing | Project files follow the rules | ✅ | 1ms |
| TG-34 rule — extractManualChecklist PASS: extracts only the manual-test section (not the dev metadata around it) | Project files follow the rules | ✅ | 1ms |
| TG-34 rule — extractManualChecklist FAIL: a jargon-laden manual-test line is caught in the extracted section | Project files follow the rules | ✅ | 0ms |
| TG-34 rule — extractManualChecklist PASS: returns empty string when there is no manual-test section | Project files follow the rules | ✅ | 1ms |
| TG-34 regression — real manual-test checklists (in story files) contain no engineering jargon | Project files follow the rules | ⏭️ | — |
| TG-38 rule — extractRole / roleViolation PASS: extracts a standard role and reports no violation | Project files follow the rules | ✅ | 4ms |
| TG-38 rule — extractRole / roleViolation PASS: "All authenticated users" is a valid non-restricted role | Project files follow the rules | ✅ | 1ms |
| TG-38 rule — extractRole / roleViolation FAIL: flags an empty role | Project files follow the rules | ✅ | 0ms |
| TG-38 rule — extractRole / roleViolation FAIL: flags "N/A" as empty/ambiguous | Project files follow the rules | ✅ | 0ms |
| TG-38 rule — extractRole / roleViolation FAIL: flags a story with no Role field at all | Project files follow the rules | ✅ | 0ms |
| TG-38 regression — real story files every story file has a valid Role | Project files follow the rules | ⏭️ | — |
| TG-32 rule — findNonShadcnUiImports FAIL: flags a hand-crafted Button import | Project files follow the rules | ✅ | 4ms |
| TG-32 rule — findNonShadcnUiImports PASS: accepts a Shadcn Button import | Project files follow the rules | ✅ | 1ms |
| TG-32 rule — findNonShadcnUiImports PASS: ignores non-UI imports | Project files follow the rules | ✅ | 1ms |
| TG-32 rule — findNonShadcnUiImports FAIL: flags one offender even when mixed with a valid import | Project files follow the rules | ✅ | 1ms |
| TG-32 regression — real web/src/ all UI-primitive imports come from @/components/ui/ | Project files follow the rules | ✅ | 13ms |
| state.json schema — valid documents PASS: defaultEpicState() output validates | Saved data has the right shape | ✅ | 5ms |
| state.json schema — valid documents PASS: a hand-seeded epic state (BUILD, mixed story statuses) validates | Saved data has the right shape | ✅ | 82ms |
| state.json schema — valid documents PASS: every phase in the enum is a valid state.phase | Saved data has the right shape | ✅ | 1ms |
| state.json schema — valid documents PASS: the state.json written by `epic-state.js --init` validates | Saved data has the right shape | ✅ | 308ms |
| state.json schema — invalid documents are rejected FAIL: a phase not in EPIC_PHASES (e.g. legacy "INTAKE") is rejected | Saved data has the right shape | ✅ | 1ms |
| state.json schema — invalid documents are rejected FAIL: an unknown story status is rejected | Saved data has the right shape | ✅ | 0ms |
| state.json schema — invalid documents are rejected FAIL: a missing epic.slug is rejected | Saved data has the right shape | ✅ | 0ms |
| state.json schema — invalid documents are rejected FAIL: a non-kebab epic.slug is rejected | Saved data has the right shape | ✅ | 0ms |
| state.json — transition graph is well-formed PASS: every transition key and target is a known phase | Saved data has the right shape | ✅ | 4ms |
| state.json — transition graph is well-formed PASS: PLAN → BUILD is allowed | Saved data has the right shape | ✅ | 0ms |
| state.json — transition graph is well-formed FAIL: PLAN → MANUAL-TEST is NOT a valid transition (proves the graph is restrictive) | Saved data has the right shape | ✅ | 0ms |
| state.json — enums match the documented epic-branch contract (drift guard) PASS: EPIC_PHASES equals the documented six-stage list | Saved data has the right shape | ✅ | 1ms |
| state.json — enums match the documented epic-branch contract (drift guard) PASS: STORY_STATUS_VALUES equals the documented set | Saved data has the right shape | ✅ | 0ms |
| state.json — enums match the documented epic-branch contract (drift guard) PASS: E2E_STATUS_VALUES contains the documented core statuses | Saved data has the right shape | ✅ | 1ms |
| intake-manifest.json schema PASS: default manifest (Team Task Manager) validates | Saved data has the right shape | ✅ | 107ms |
| intake-manifest.json schema PASS: BFF variant overlay validates | Saved data has the right shape | ✅ | 82ms |
| intake-manifest.json schema FAIL: invalid dataSource value is rejected | Saved data has the right shape | ✅ | 1ms |
| intake-manifest.json schema FAIL: artifact entry without `generate` boolean is rejected | Saved data has the right shape | ✅ | 0ms |
| intake-manifest.json schema FAIL: invalid authMethod is rejected | Saved data has the right shape | ✅ | 0ms |
| agent frontmatter — every agent has required fields PASS: api-connectivity-agent.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 12ms |
| agent frontmatter — every agent has required fields PASS: design-api-agent.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 2ms |
| agent frontmatter — every agent has required fields PASS: design-style-agent.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — every agent has required fields PASS: developer.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — every agent has required fields PASS: feature-planner.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 3ms |
| agent frontmatter — every agent has required fields PASS: intake-agent.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 11ms |
| agent frontmatter — every agent has required fields PASS: mock-setup-agent.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — every agent has required fields PASS: playwright-runner.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — every agent has required fields PASS: test-generator.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 2ms |
| agent frontmatter — every agent has required fields PASS: type-generator-agent.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — name matches filename PASS: name in api-connectivity-agent.md matches the filename stem | Everything lines up and is consistent | ✅ | 2ms |
| agent frontmatter — name matches filename PASS: name in design-api-agent.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — name matches filename PASS: name in design-style-agent.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — name matches filename PASS: name in developer.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — name matches filename PASS: name in feature-planner.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — name matches filename PASS: name in intake-agent.md matches the filename stem | Everything lines up and is consistent | ✅ | 4ms |
| agent frontmatter — name matches filename PASS: name in mock-setup-agent.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — name matches filename PASS: name in playwright-runner.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — name matches filename PASS: name in test-generator.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — name matches filename PASS: name in type-generator-agent.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent README consistency PASS: every agent file has a matching entry in README.md | Everything lines up and is consistent | ✅ | 2ms |
| agent README consistency FAIL: README does not list phantom agents that don't exist on disk | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — model / tools / color are well-formed PASS: api-connectivity-agent.md has a valid model, non-empty tools, and a colour | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — model / tools / color are well-formed PASS: design-api-agent.md has a valid model, non-empty tools, and a colour | Everything lines up and is consistent | ✅ | 2ms |
| agent frontmatter — model / tools / color are well-formed PASS: design-style-agent.md has a valid model, non-empty tools, and a colour | Everything lines up and is consistent | ✅ | 3ms |
| agent frontmatter — model / tools / color are well-formed PASS: developer.md has a valid model, non-empty tools, and a colour | Everything lines up and is consistent | ✅ | 2ms |
| agent frontmatter — model / tools / color are well-formed PASS: feature-planner.md has a valid model, non-empty tools, and a colour | Everything lines up and is consistent | ✅ | 3ms |
| agent frontmatter — model / tools / color are well-formed PASS: intake-agent.md has a valid model, non-empty tools, and a colour | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — model / tools / color are well-formed PASS: mock-setup-agent.md has a valid model, non-empty tools, and a colour | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — model / tools / color are well-formed PASS: playwright-runner.md has a valid model, non-empty tools, and a colour | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — model / tools / color are well-formed PASS: test-generator.md has a valid model, non-empty tools, and a colour | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — model / tools / color are well-formed PASS: type-generator-agent.md has a valid model, non-empty tools, and a colour | Everything lines up and is consistent | ✅ | 1ms |
| agent README — referenced scripts exist on disk PASS: every backticked *.js script named in README.md resolves under .claude/scripts/ | Everything lines up and is consistent | ✅ | 2ms |
| command frontmatter PASS: /api-go-live has a non-empty description | Everything lines up and is consistent | ✅ | 10ms |
| command frontmatter PASS: /api-mock-refresh has a non-empty description | Everything lines up and is consistent | ✅ | 6ms |
| command frontmatter PASS: /api-status has a non-empty description | Everything lines up and is consistent | ✅ | 2ms |
| command frontmatter PASS: /continue has a non-empty description | Everything lines up and is consistent | ✅ | 2ms |
| command frontmatter PASS: /dashboard has a non-empty description | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter PASS: /migrate-legacy has a non-empty description | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter PASS: /quality-check has a non-empty description | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter PASS: /start has a non-empty description | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter PASS: /status has a non-empty description | Everything lines up and is consistent | ✅ | 2ms |
| command frontmatter — model field valid PASS: api-go-live.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter — model field valid PASS: api-mock-refresh.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter — model field valid PASS: api-status.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter — model field valid PASS: continue.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter — model field valid PASS: dashboard.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 0ms |
| command frontmatter — model field valid PASS: migrate-legacy.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter — model field valid PASS: quality-check.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 2ms |
| command frontmatter — model field valid PASS: start.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter — model field valid PASS: status.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| CLAUDE.md → commands cross-reference PASS: every /command referenced in CLAUDE.md exists under .claude/commands/ | Everything lines up and is consistent | ✅ | 14ms |
| orchestrator-rules.md → agent files PASS: every agent mentioned by name in orchestrator-rules.md exists | Everything lines up and is consistent | ✅ | 5ms |
| agents/README.md agent catalog PASS: .claude/agents/README.md references every real agent at least once | Everything lines up and is consistent | ✅ | 1ms |
| CLAUDE.md → policies/ files PASS: every policy file referenced in CLAUDE.md exists | Everything lines up and is consistent | ✅ | 2ms |
| generated-doc-conventions.json — shape PASS: contains exactly the six expected conventions | Everything lines up and is consistent | ✅ | 4ms |
| generated-doc-conventions.json — shape PASS: every convention has the required fields | Everything lines up and is consistent | ✅ | 3ms |
| generated-doc-conventions.json — self-consistency PASS: each convention's example matches its filenamePattern | Everything lines up and is consistent | ✅ | 1ms |
| generated-doc-conventions.json — self-consistency FAIL-shape: each counterexample is drift — matches badPattern but NOT filenamePattern | Everything lines up and is consistent | ✅ | 1ms |
| generated-doc-conventions.json — agreement with consumers + mirror PASS: naming-conventions.md documents every convention (by example filename) | Everything lines up and is consistent | ✅ | 1ms |
| generated-doc-conventions.json — agreement with consumers + mirror PASS: both the hook and the validator read generated-doc-conventions.json | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — check-off page is generated PASS: continue.md § B7.1 generates the manual-tests.html check-off page | Everything lines up and is consistent | ✅ | 3ms |
| manual-test approval — check-off page is generated PASS: approval-pattern.md documents the Manual-Test Check-off Page and its results payload | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — results are persisted PASS: continue.md persists the handed-back results to state.json.epic.manualTestResults | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — results are persisted failure-path coverage FAIL: a tampered continue.md that never persists results is detected | Everything lines up and is consistent | ✅ | 95ms |
| manual-test approval — fix-cycle re-display PASS: continue.md re-displays the approval carrying previously-passed ticks forward | Everything lines up and is consistent | ✅ | 3ms |
| manual-test approval — fix-cycle re-display PASS: only the affected tests come back unchecked after a fix | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — fix-cycle re-display PASS: the manual-test fix loop is capped at 3 cycles | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — fix-cycle re-display PASS: the check-off page pre-ticks from prior results (approval-pattern.md) | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — fix-cycle re-display — failure-path coverage FAIL: a tampered continue.md that re-asks the whole list from scratch is detected | Everything lines up and is consistent | ✅ | 82ms |
| manual-test approval — free-text issue handling PASS: continue.md captures a free-text failure and classifies it before fixing | Everything lines up and is consistent | ✅ | 3ms |
| manual-test approval — free-text issue handling PASS: continue.md re-presents the manual-test approval after the fix (never advances silently) | Everything lines up and is consistent | ✅ | 2ms |
| manual-test approval — content shown before the question PASS: approval-pattern.md requires the summary/content before calling AskUserQuestion | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — free-text handling — failure-path coverage FAIL: a tampered continue.md that never captures/classifies a free-text issue is detected | Everything lines up and is consistent | ✅ | 89ms |
| settings.json structural validity PASS: parses as valid JSON | Everything lines up and is consistent | ✅ | 4ms |
| settings.json structural validity PASS: has expected top-level sections | Everything lines up and is consistent | ✅ | 1ms |
| settings.json structural validity FAIL: deny list is not empty (security invariant) | Everything lines up and is consistent | ✅ | 1ms |
| settings.json hook files exist PASS: hook file referenced in settings.json exists: .claude/hooks/workflow-guard.ps1 | Everything lines up and is consistent | ✅ | 1ms |
| settings.json hook files exist PASS: hook file referenced in settings.json exists: .claude/hooks/inject-phase-context.ps1 | Everything lines up and is consistent | ✅ | 1ms |
| settings.json hook files exist PASS: hook file referenced in settings.json exists: .claude/hooks/inject-agent-context.ps1 | Everything lines up and is consistent | ✅ | 1ms |
| settings.json hook files exist PASS: hook file referenced in settings.json exists: .claude/hooks/bash-permission-checker.js | Everything lines up and is consistent | ✅ | 0ms |
| settings.json hook files exist PASS: hook file referenced in settings.json exists: .claude/hooks/enforce-generated-doc-names.js | Everything lines up and is consistent | ✅ | 0ms |
| settings.json hook timeouts are reasonable PASS: no hook declares a timeout over 60 seconds | Everything lines up and is consistent | ✅ | 2ms |
| collect-dashboard-data.js — status detection PASS: returns "no_project" when nothing has started | Helper tools work correctly | ✅ | 272ms |
| collect-dashboard-data.js — status detection FAIL: does NOT report "ok" or crash when only legacy state exists | Helper tools work correctly | ✅ | 295ms |
| collect-dashboard-data.js — the plan and its readiness PASS: with project.md + epic-plan.md, returns "ok" with the plan and derived readiness | Helper tools work correctly | ✅ | 661ms |
| collect-dashboard-data.js — the plan and its readiness FAIL: does not mark a dependent epic "ready" while its dependency is unmet | Helper tools work correctly | ✅ | 566ms |
| collect-dashboard-data.js — an in-flight epic on its branch PASS: an epic/<slug> branch with a state.json surfaces as in-flight with its phase and story counts | Helper tools work correctly | ✅ | 2.1s |
| collect-dashboard-data.js — an in-flight epic on its branch FAIL: a branch whose slug is not a valid epic/<kebab-slug> is surfaced, not silently dropped | Helper tools work correctly | ✅ | 1.9s |
| collect-dashboard-data.js — --format=text PASS: text format is human-readable and names the project and its plan | Helper tools work correctly | ✅ | 626ms |
| collect-dashboard-data.js — --format=text FAIL: text format does not leak raw JSON braces into user-facing output | Helper tools work correctly | ✅ | 642ms |
| generate-dashboard-html.js PASS: writes dashboard.html with an auto-refresh meta tag when a project exists | Helper tools work correctly | ✅ | 625ms |
| generate-dashboard-html.js FAIL: still writes usable HTML (never a half-written/empty file) with no project at all | Helper tools work correctly | ✅ | 256ms |
| generate-dashboard-html.js — snapshot (stable HTML) PASS: produces deterministic HTML for a fixed state (after normalising timestamps) | Helper tools work correctly | ✅ | 1.3s |
| generate-dashboard-html.js — snapshot (stable HTML) FAIL: different states produce different HTML (proves the normaliser isn't stripping signal) | Helper tools work correctly | ✅ | 2.4s |
| generate-test-report — buildModel PASS: tallies counts, groups by layer, and keeps the failure message | Helper tools work correctly | ✅ | 21ms |
| generate-test-report — buildModel FAIL: does not count a skipped test as passed | Helper tools work correctly | ✅ | 1ms |
| generate-test-report — fmtDuration PASS: formats sub-second, seconds, and minutes | Helper tools work correctly | ✅ | 1ms |
| generate-test-report — fmtDuration FAIL: returns a placeholder for a missing duration rather than NaN | Helper tools work correctly | ✅ | 0ms |
| generate-test-report — render PASS: emits the plain-language sections and a "needs attention" block with the failure detail | Helper tools work correctly | ✅ | 3ms |
| generate-test-report — render FAIL: an all-pass run is not reported as needing attention | Helper tools work correctly | ✅ | 0ms |
| generate-test-report — render PASS: shows a lines-of-code section when that data is supplied | Helper tools work correctly | ✅ | 12ms |
| generate-test-report — friendlyArea PASS: maps a known layer to plain language and tidies an unknown one | Helper tools work correctly | ✅ | 1ms |
| import-prototype.js — genesis layout PASS: copies genesis marker files into documentation/ when genesis.md is present | Helper tools work correctly | ✅ | 323ms |
| import-prototype.js — genesis layout FAIL: returns status=error when --from path does not exist | Helper tools work correctly | ✅ | 258ms |
| init-preferences.js — initial write PASS: writes .claude/preferences.json with the given flags | Helper tools work correctly | ✅ | 352ms |
| init-preferences.js — initial write FAIL: rejects non-boolean flag values | Helper tools work correctly | ✅ | 254ms |
| init-preferences.js — idempotency PASS: second invocation without --force skips (reports "skipped" or similar) | Helper tools work correctly | ✅ | 443ms |
| init-preferences.js — idempotency FAIL: --force overwrites, proving idempotency can be bypassed deliberately | Helper tools work correctly | ✅ | 433ms |
| mark-epic-complete.js — valid finalisation PASS: flips COMPLETE-ON-BRANCH → COMPLETE and refreshes lastUpdated | Helper tools work correctly | ✅ | 314ms |
| mark-epic-complete.js — valid finalisation PASS: also finalises from EPIC-END and MANUAL-TEST (uncommitted-tip recovery) | Helper tools work correctly | ✅ | 519ms |
| mark-epic-complete.js — valid finalisation PASS: is idempotent — a second run stays COMPLETE and reports "already complete" | Helper tools work correctly | ✅ | 552ms |
| mark-epic-complete.js — refuses invalid input FAIL: refuses a premature phase (BUILD) and leaves the state untouched | Helper tools work correctly | ✅ | 297ms |
| mark-epic-complete.js — refuses invalid input FAIL: errors when the epic has no state.json | Helper tools work correctly | ✅ | 283ms |
| mark-epic-complete.js — refuses invalid input FAIL: rejects a path-traversal slug rather than resolving outside generated-docs/epics | Helper tools work correctly | ✅ | 264ms |
| mark-epic-complete.js — refuses invalid input FAIL: missing --slug prints usage and exits non-zero | Helper tools work correctly | ✅ | 270ms |
| quality-gates.js — JSON shape PASS: always outputs a parseable JSON object with a gates array | Helper tools work correctly | ✅ | 256ms |
| quality-gates.js — JSON shape FAIL: does not return a "conditional pass" marker anywhere in its JSON output | Helper tools work correctly | ✅ | 155ms |
| resolve-state-path.js — epic branch PASS: epic/<slug> resolves to the per-epic state.json path | Helper tools work correctly | ✅ | 268ms |
| resolve-state-path.js — epic branch PASS: reports exists:true once the state.json is present | Helper tools work correctly | ✅ | 257ms |
| resolve-state-path.js — non-epic and invalid PASS: on main it resolves to kind:none with no path | Helper tools work correctly | ✅ | 319ms |
| resolve-state-path.js — non-epic and invalid FAIL: an invalid (non-kebab) epic slug is an error (exit 1) | Helper tools work correctly | ✅ | 310ms |
| resolve-state-path.js — non-epic and invalid FAIL: legacy workflow-state.json is NOT treated as a valid state source | Helper tools work correctly | ✅ | 264ms |
| run-smoke-test.js — credential safety PASS: reports credentials_missing (without printing the value) when an env var is unset | Helper tools work correctly | ✅ | 324ms |
| run-smoke-test.js — credential safety PASS: the .sh artifact carries an env-var REFERENCE, never the credential value | Helper tools work correctly | ✅ | 358ms |
| run-smoke-test.js — credential safety PASS: a credential echoed back in the response body is redacted | Helper tools work correctly | ✅ | 326ms |
| run-smoke-test.js — error shapes FAIL: a refused connection is categorised (result failure / connection_refused), not a crash | Helper tools work correctly | ✅ | 317ms |
| run-smoke-test.js — error shapes FAIL: a missing --config exits non-zero with a status:error payload | Helper tools work correctly | ✅ | 306ms |
| scan-doc.js — plain markdown file PASS: reports correct line count and text type | Helper tools work correctly | ✅ | 312ms |
| scan-doc.js — plain markdown file FAIL: does not claim a text file is binary | Helper tools work correctly | ✅ | 286ms |
| scan-doc.js — binary file detection PASS: flags a buffer with null bytes as binary | Helper tools work correctly | ✅ | 280ms |
| scan-doc.js — binary file detection FAIL: does not attempt to count lines in a binary buffer as if it were text | Helper tools work correctly | ✅ | 373ms |
| scan-doc.js — keyword counting PASS: counts requested keywords case-insensitively | Helper tools work correctly | ✅ | 293ms |
| scan-doc.js — keyword counting FAIL: keywords not present yield zero, not undefined/crash | Helper tools work correctly | ✅ | 316ms |
| summarize-playwright.js PASS: a clean run reports result "pass" (exit 0) | Helper tools work correctly | ✅ | 257ms |
| summarize-playwright.js FAIL: a failing spec is reported and mapped to its story number (exit 1) | Helper tools work correctly | ✅ | 301ms |
| summarize-playwright.js FAIL: a run-level error with zero failing specs is still a fail (broken-run guard) | Helper tools work correctly | ✅ | 272ms |
| summarize-playwright.js FAIL: an unparseable / wrong-shape report exits 2 (treat as a run failure) | Helper tools work correctly | ✅ | 251ms |
| validate-generated-doc-names.js PASS: a correctly-named tree reports "ok" with zero drift (exit 0) | Helper tools work correctly | ✅ | 294ms |
| validate-generated-doc-names.js FAIL: a drift-named epic file is reported (status "drift", exit 1) | Helper tools work correctly | ✅ | 325ms |
| validate-generated-doc-names.js FAIL: a missing conventions schema exits 2 (can't audit without the source of truth) | Helper tools work correctly | ✅ | 279ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): rm -rf / — deny path | Built-in safety checks | ✅ | 213ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): rm -rf /* — deny path with wildcard | Built-in safety checks | ✅ | 174ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): cat ~/.ssh/id_rsa — ssh private key | Built-in safety checks | ✅ | 149ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): cat /root/.ssh/id_rsa — ssh private key absolute | Built-in safety checks | ✅ | 232ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): type id_rsa.pem — ssh key via Windows type | Built-in safety checks | ✅ | 153ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): Get-Content id_rsa — ssh key via PowerShell Get-Content | Built-in safety checks | ✅ | 223ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): cat mykey.pem — .pem via cat | Built-in safety checks | ✅ | 227ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): sed -n 1p credentials — credentials via sed | Built-in safety checks | ✅ | 167ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): grep password credentials.json — credentials file | Built-in safety checks | ✅ | 184ms |
| bash-permission-checker — allow matrix PASS: allow node .claude/scripts/transition-phase.js --show — node running a claude script | Built-in safety checks | ✅ | 219ms |
| bash-permission-checker — allow matrix PASS: allow node .claude/scripts/copy-with-header.js --from a --to b — copy-with-header | Built-in safety checks | ✅ | 190ms |
| bash-permission-checker — allow matrix PASS: allow git pull — git pull is always auto-approved | Built-in safety checks | ✅ | 247ms |
| bash-permission-checker — allow matrix PASS: allow git add generated-docs/ — git add scoped to generated-docs | Built-in safety checks | ✅ | 247ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW rm -rf / outright | Built-in safety checks | ✅ | 222ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW rm  -rf  / outright | Built-in safety checks | ✅ | 213ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW rm -r -f / outright | Built-in safety checks | ✅ | 249ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW rm --recursive --force / outright | Built-in safety checks | ✅ | 208ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW rm -rf ~ outright | Built-in safety checks | ✅ | 310ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW rm -rf $HOME outright | Built-in safety checks | ✅ | 266ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW /bin/rm -rf / outright | Built-in safety checks | ✅ | 181ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW sudo rm -rf / outright | Built-in safety checks | ✅ | 203ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW bash -c "rm -rf /" outright | Built-in safety checks | ✅ | 158ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW eval "rm -rf /" outright | Built-in safety checks | ✅ | 224ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW  rm -rf / outright | Built-in safety checks | ✅ | 207ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW cat ~/.ssh/id_rsa && true outright | Built-in safety checks | ✅ | 190ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW true \|\| cat /etc/shadow outright | Built-in safety checks | ✅ | 272ms |
| bash-permission-checker — fallthrough for ordinary commands PASS: falls through (no decision) for a benign unrelated command | Built-in safety checks | ✅ | 259ms |
| bash-permission-checker — fallthrough for ordinary commands FAIL: does not crash or exit non-zero for empty input | Built-in safety checks | ✅ | 211ms |
| enforce-generated-doc-names.js — the six conventions PASS: [project-facts] a correctly-named new file is allowed (project.md) | Built-in safety checks | ✅ | 255ms |
| enforce-generated-doc-names.js — the six conventions FAIL: [project-facts] a drift-named new file is blocked (project-facts.md) | Built-in safety checks | ✅ | 280ms |
| enforce-generated-doc-names.js — the six conventions PASS: [epic-brief] a correctly-named new file is allowed (brief.md) | Built-in safety checks | ✅ | 284ms |
| enforce-generated-doc-names.js — the six conventions FAIL: [epic-brief] a drift-named new file is blocked (epic-brief.md) | Built-in safety checks | ✅ | 290ms |
| enforce-generated-doc-names.js — the six conventions PASS: [epic-state] a correctly-named new file is allowed (state.json) | Built-in safety checks | ✅ | 284ms |
| enforce-generated-doc-names.js — the six conventions FAIL: [epic-state] a drift-named new file is blocked (epic-state.json) | Built-in safety checks | ✅ | 283ms |
| enforce-generated-doc-names.js — the six conventions PASS: [epic-journal] a correctly-named new file is allowed (journal.md) | Built-in safety checks | ✅ | 273ms |
| enforce-generated-doc-names.js — the six conventions FAIL: [epic-journal] a drift-named new file is blocked (epic-journal.md) | Built-in safety checks | ✅ | 286ms |
| enforce-generated-doc-names.js — the six conventions PASS: [story-file] a correctly-named new file is allowed (story-3-nav.md) | Built-in safety checks | ✅ | 292ms |
| enforce-generated-doc-names.js — the six conventions FAIL: [story-file] a drift-named new file is blocked (story-3.md) | Built-in safety checks | ✅ | 349ms |
| enforce-generated-doc-names.js — the six conventions PASS: [e2e-spec] a correctly-named new file is allowed (epic-task-browsing-story-3-nav.spec.ts) | Built-in safety checks | ✅ | 233ms |
| enforce-generated-doc-names.js — the six conventions FAIL: [e2e-spec] a drift-named new file is blocked (story-3-nav.spec.ts) | Built-in safety checks | ✅ | 274ms |
| enforce-generated-doc-names.js — fall-through and guards PASS: a non-gated tool (Read) falls through | Built-in safety checks | ✅ | 246ms |
| enforce-generated-doc-names.js — fall-through and guards PASS: an ungoverned filename under a governed dir falls through | Built-in safety checks | ✅ | 260ms |
| enforce-generated-doc-names.js — fall-through and guards PASS: a drift name is grandfathered when the file already exists on disk | Built-in safety checks | ✅ | 246ms |
| enforce-generated-doc-names.js — fall-through and guards FAIL: the write-location guard blocks an artifact path nested under web/ | Built-in safety checks | ✅ | 263ms |

---

<sub>Generated 2026-07-09 09:16:44 · QA suite version 0.1.0 · code version ee6363d on branch main · Node v24.11.0, Vitest 2.1.9. Time taken is the real wall-clock time; checks run side by side, so it is shorter than adding up each one.</sub>
