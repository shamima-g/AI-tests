# Test report — 9 July 2026, 6:36am

A plain-language summary of every check we ran on the project, and how each one did.

## In short

**✅ All clear**

We ran **158** checks in total: **155 passed**, 3 not run this time.

The application and its tests come to **2,293 lines of code** across 27 files.

## The numbers

| | |
|---|---|
| Result | ✅ All clear |
| Checks run | 158 |
| Passed | 155 |
| Need attention | 0 |
| Not run this time | 3 |
| Time taken | 8.8s |
| Lines of code (app + tests) | 2,293 |
| AI usage | No AI was used in these checks |
| Run by | shamima-g on SHAMIMA-NB |
| When | 9 July 2026, 6:36am → finished 6:36am |

## How each area did

| Area | Result | Passed | Need attention | Not run |
|---|:--:|--:|--:|--:|
| Project files follow the rules | ✅ | 22 | 0 | 3 |
| Everything lines up and is consistent | ✅ | 66 | 0 | 0 |
| Built-in safety checks | ✅ | 28 | 0 | 0 |
| Saved data has the right shape | ✅ | 5 | 0 | 0 |
| Helper tools work correctly | ✅ | 34 | 0 | 0 |
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
| TG-34 regression — real verification checklists contain no engineering jargon | Project files follow the rules | ⏭️ | — |
| TG-38 rule — extractRole / roleViolation PASS: extracts a standard role and reports no violation | Project files follow the rules | ✅ | 3ms |
| TG-38 rule — extractRole / roleViolation PASS: "All authenticated users" is a valid non-restricted role | Project files follow the rules | ✅ | 1ms |
| TG-38 rule — extractRole / roleViolation FAIL: flags an empty role | Project files follow the rules | ✅ | 0ms |
| TG-38 rule — extractRole / roleViolation FAIL: flags "N/A" as empty/ambiguous | Project files follow the rules | ✅ | 0ms |
| TG-38 rule — extractRole / roleViolation FAIL: flags a story with no Role field at all | Project files follow the rules | ✅ | 0ms |
| TG-38 regression — real story files every story file has a valid Role | Project files follow the rules | ⏭️ | — |
| TG-32 rule — findNonShadcnUiImports FAIL: flags a hand-crafted Button import | Project files follow the rules | ✅ | 5ms |
| TG-32 rule — findNonShadcnUiImports PASS: accepts a Shadcn Button import | Project files follow the rules | ✅ | 1ms |
| TG-32 rule — findNonShadcnUiImports PASS: ignores non-UI imports | Project files follow the rules | ✅ | 1ms |
| TG-32 rule — findNonShadcnUiImports FAIL: flags one offender even when mixed with a valid import | Project files follow the rules | ✅ | 1ms |
| TG-32 regression — real web/src/ all UI-primitive imports come from @/components/ui/ | Project files follow the rules | ✅ | 14ms |
| agent frontmatter — every agent has required fields PASS: api-connectivity-agent.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 10ms |
| agent frontmatter — every agent has required fields PASS: design-api-agent.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 2ms |
| agent frontmatter — every agent has required fields PASS: design-style-agent.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 2ms |
| agent frontmatter — every agent has required fields PASS: developer.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 2ms |
| agent frontmatter — every agent has required fields PASS: feature-planner.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 2ms |
| agent frontmatter — every agent has required fields PASS: intake-agent.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — every agent has required fields PASS: mock-setup-agent.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 18ms |
| agent frontmatter — every agent has required fields PASS: playwright-runner.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 17ms |
| agent frontmatter — every agent has required fields PASS: test-generator.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 2ms |
| agent frontmatter — every agent has required fields PASS: type-generator-agent.md has valid frontmatter with name + description | Everything lines up and is consistent | ✅ | 2ms |
| agent frontmatter — name matches filename PASS: name in api-connectivity-agent.md matches the filename stem | Everything lines up and is consistent | ✅ | 3ms |
| agent frontmatter — name matches filename PASS: name in design-api-agent.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — name matches filename PASS: name in design-style-agent.md matches the filename stem | Everything lines up and is consistent | ✅ | 2ms |
| agent frontmatter — name matches filename PASS: name in developer.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — name matches filename PASS: name in feature-planner.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — name matches filename PASS: name in intake-agent.md matches the filename stem | Everything lines up and is consistent | ✅ | 6ms |
| agent frontmatter — name matches filename PASS: name in mock-setup-agent.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — name matches filename PASS: name in playwright-runner.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — name matches filename PASS: name in test-generator.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent frontmatter — name matches filename PASS: name in type-generator-agent.md matches the filename stem | Everything lines up and is consistent | ✅ | 1ms |
| agent README consistency PASS: every agent file has a matching entry in README.md | Everything lines up and is consistent | ✅ | 3ms |
| agent README consistency FAIL: README does not list phantom agents that don't exist on disk | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter PASS: /api-go-live has a non-empty description | Everything lines up and is consistent | ✅ | 11ms |
| command frontmatter PASS: /api-mock-refresh has a non-empty description | Everything lines up and is consistent | ✅ | 3ms |
| command frontmatter PASS: /api-status has a non-empty description | Everything lines up and is consistent | ✅ | 4ms |
| command frontmatter PASS: /continue has a non-empty description | Everything lines up and is consistent | ✅ | 2ms |
| command frontmatter PASS: /dashboard has a non-empty description | Everything lines up and is consistent | ✅ | 2ms |
| command frontmatter PASS: /migrate-legacy has a non-empty description | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter PASS: /quality-check has a non-empty description | Everything lines up and is consistent | ✅ | 3ms |
| command frontmatter PASS: /start has a non-empty description | Everything lines up and is consistent | ✅ | 2ms |
| command frontmatter PASS: /status has a non-empty description | Everything lines up and is consistent | ✅ | 2ms |
| command frontmatter — model field valid PASS: api-go-live.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter — model field valid PASS: api-mock-refresh.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter — model field valid PASS: api-status.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter — model field valid PASS: continue.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter — model field valid PASS: dashboard.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter — model field valid PASS: migrate-legacy.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter — model field valid PASS: quality-check.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 3ms |
| command frontmatter — model field valid PASS: start.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| command frontmatter — model field valid PASS: status.md either omits model or uses a known value | Everything lines up and is consistent | ✅ | 1ms |
| CLAUDE.md → commands cross-reference PASS: every /command referenced in CLAUDE.md exists under .claude/commands/ | Everything lines up and is consistent | ✅ | 3ms |
| orchestrator-rules.md → agent files PASS: every agent mentioned by name in orchestrator-rules.md exists | Everything lines up and is consistent | ✅ | 5ms |
| agents/README.md agent catalog PASS: .claude/agents/README.md references every real agent at least once | Everything lines up and is consistent | ✅ | 1ms |
| CLAUDE.md → policies/ files PASS: every policy file referenced in CLAUDE.md exists | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — check-off page is generated PASS: continue.md § B7.1 generates the manual-tests.html check-off page | Everything lines up and is consistent | ✅ | 3ms |
| manual-test approval — check-off page is generated PASS: approval-pattern.md documents the Manual-Test Check-off Page and its results payload | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — results are persisted PASS: continue.md persists the handed-back results to state.json.epic.manualTestResults | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — results are persisted failure-path coverage FAIL: a tampered continue.md that never persists results is detected | Everything lines up and is consistent | ✅ | 80ms |
| manual-test approval — fix-cycle re-display PASS: continue.md re-displays the approval carrying previously-passed ticks forward | Everything lines up and is consistent | ✅ | 3ms |
| manual-test approval — fix-cycle re-display PASS: only the affected tests come back unchecked after a fix | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — fix-cycle re-display PASS: the manual-test fix loop is capped at 3 cycles | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — fix-cycle re-display PASS: the check-off page pre-ticks from prior results (approval-pattern.md) | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — fix-cycle re-display — failure-path coverage FAIL: a tampered continue.md that re-asks the whole list from scratch is detected | Everything lines up and is consistent | ✅ | 95ms |
| manual-test approval — free-text issue handling PASS: continue.md captures a free-text failure and classifies it before fixing | Everything lines up and is consistent | ✅ | 3ms |
| manual-test approval — free-text issue handling PASS: continue.md re-presents the manual-test approval after the fix (never advances silently) | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — content shown before the question PASS: approval-pattern.md requires the summary/content before calling AskUserQuestion | Everything lines up and is consistent | ✅ | 1ms |
| manual-test approval — free-text handling — failure-path coverage FAIL: a tampered continue.md that never captures/classifies a free-text issue is detected | Everything lines up and is consistent | ✅ | 86ms |
| settings.json structural validity PASS: parses as valid JSON | Everything lines up and is consistent | ✅ | 4ms |
| settings.json structural validity PASS: has expected top-level sections | Everything lines up and is consistent | ✅ | 1ms |
| settings.json structural validity FAIL: deny list is not empty (security invariant) | Everything lines up and is consistent | ✅ | 1ms |
| settings.json hook files exist PASS: hook file referenced in settings.json exists: .claude/hooks/workflow-guard.ps1 | Everything lines up and is consistent | ✅ | 1ms |
| settings.json hook files exist PASS: hook file referenced in settings.json exists: .claude/hooks/inject-phase-context.ps1 | Everything lines up and is consistent | ✅ | 1ms |
| settings.json hook files exist PASS: hook file referenced in settings.json exists: .claude/hooks/inject-agent-context.ps1 | Everything lines up and is consistent | ✅ | 1ms |
| settings.json hook files exist PASS: hook file referenced in settings.json exists: .claude/hooks/bash-permission-checker.js | Everything lines up and is consistent | ✅ | 1ms |
| settings.json hook files exist PASS: hook file referenced in settings.json exists: .claude/hooks/enforce-generated-doc-names.js | Everything lines up and is consistent | ✅ | 0ms |
| settings.json hook timeouts are reasonable PASS: no hook declares a timeout over 60 seconds | Everything lines up and is consistent | ✅ | 2ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): rm -rf / — deny path | Built-in safety checks | ✅ | 184ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): rm -rf /* — deny path with wildcard | Built-in safety checks | ✅ | 246ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): cat ~/.ssh/id_rsa — ssh private key | Built-in safety checks | ✅ | 303ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): cat /root/.ssh/id_rsa — ssh private key absolute | Built-in safety checks | ✅ | 272ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): type id_rsa.pem — ssh key via Windows type | Built-in safety checks | ✅ | 243ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): Get-Content id_rsa — ssh key via PowerShell Get-Content | Built-in safety checks | ✅ | 294ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): cat mykey.pem — .pem via cat | Built-in safety checks | ✅ | 216ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): sed -n 1p credentials — credentials via sed | Built-in safety checks | ✅ | 215ms |
| bash-permission-checker — deny matrix FAIL safely (must deny): grep password credentials.json — credentials file | Built-in safety checks | ✅ | 174ms |
| bash-permission-checker — allow matrix PASS: allow node .claude/scripts/transition-phase.js --show — node running a claude script | Built-in safety checks | ✅ | 261ms |
| bash-permission-checker — allow matrix PASS: allow node .claude/scripts/copy-with-header.js --from a --to b — copy-with-header | Built-in safety checks | ✅ | 254ms |
| bash-permission-checker — allow matrix PASS: allow git pull — git pull is always auto-approved | Built-in safety checks | ✅ | 284ms |
| bash-permission-checker — allow matrix PASS: allow git add generated-docs/ — git add scoped to generated-docs | Built-in safety checks | ✅ | 348ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW rm -rf / outright | Built-in safety checks | ✅ | 239ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW rm  -rf  / outright | Built-in safety checks | ✅ | 288ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW rm -r -f / outright | Built-in safety checks | ✅ | 443ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW rm --recursive --force / outright | Built-in safety checks | ✅ | 331ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW rm -rf ~ outright | Built-in safety checks | ✅ | 264ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW rm -rf $HOME outright | Built-in safety checks | ✅ | 325ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW /bin/rm -rf / outright | Built-in safety checks | ✅ | 205ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW sudo rm -rf / outright | Built-in safety checks | ✅ | 203ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW bash -c "rm -rf /" outright | Built-in safety checks | ✅ | 185ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW eval "rm -rf /" outright | Built-in safety checks | ✅ | 140ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW  rm -rf / outright | Built-in safety checks | ✅ | 106ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW cat ~/.ssh/id_rsa && true outright | Built-in safety checks | ✅ | 105ms |
| bash-permission-checker — fuzz (adversarial input) FAIL: must not ALLOW true \|\| cat /etc/shadow outright | Built-in safety checks | ✅ | 162ms |
| bash-permission-checker — fallthrough for ordinary commands PASS: falls through (no decision) for a benign unrelated command | Built-in safety checks | ✅ | 160ms |
| bash-permission-checker — fallthrough for ordinary commands FAIL: does not crash or exit non-zero for empty input | Built-in safety checks | ✅ | 105ms |
| intake-manifest.json schema PASS: default manifest (Team Task Manager) validates | Saved data has the right shape | ✅ | 85ms |
| intake-manifest.json schema PASS: BFF variant overlay validates | Saved data has the right shape | ✅ | 100ms |
| intake-manifest.json schema FAIL: invalid dataSource value is rejected | Saved data has the right shape | ✅ | 1ms |
| intake-manifest.json schema FAIL: artifact entry without `generate` boolean is rejected | Saved data has the right shape | ✅ | 0ms |
| intake-manifest.json schema FAIL: invalid authMethod is rejected | Saved data has the right shape | ✅ | 0ms |
| collect-dashboard-data.js — status detection PASS: returns "no_project" when nothing has started | Helper tools work correctly | ✅ | 304ms |
| collect-dashboard-data.js — status detection FAIL: does NOT report "ok" or crash when only legacy state exists | Helper tools work correctly | ✅ | 472ms |
| collect-dashboard-data.js — the plan and its readiness PASS: with project.md + epic-plan.md, returns "ok" with the plan and derived readiness | Helper tools work correctly | ✅ | 739ms |
| collect-dashboard-data.js — the plan and its readiness FAIL: does not mark a dependent epic "ready" while its dependency is unmet | Helper tools work correctly | ✅ | 797ms |
| collect-dashboard-data.js — an in-flight epic on its branch PASS: an epic/<slug> branch with a state.json surfaces as in-flight with its phase and story counts | Helper tools work correctly | ✅ | 2.9s |
| collect-dashboard-data.js — an in-flight epic on its branch FAIL: a branch whose slug is not a valid epic/<kebab-slug> is surfaced, not silently dropped | Helper tools work correctly | ✅ | 1.8s |
| collect-dashboard-data.js — --format=text PASS: text format is human-readable and names the project and its plan | Helper tools work correctly | ✅ | 382ms |
| collect-dashboard-data.js — --format=text FAIL: text format does not leak raw JSON braces into user-facing output | Helper tools work correctly | ✅ | 390ms |
| generate-dashboard-html.js PASS: writes dashboard.html with an auto-refresh meta tag when a project exists | Helper tools work correctly | ✅ | 831ms |
| generate-dashboard-html.js FAIL: still writes usable HTML (never a half-written/empty file) with no project at all | Helper tools work correctly | ✅ | 332ms |
| generate-dashboard-html.js — snapshot (stable HTML) PASS: produces deterministic HTML for a fixed state (after normalising timestamps) | Helper tools work correctly | ✅ | 1.3s |
| generate-dashboard-html.js — snapshot (stable HTML) FAIL: different states produce different HTML (proves the normaliser isn't stripping signal) | Helper tools work correctly | ✅ | 3.1s |
| generate-test-report — buildModel PASS: tallies counts, groups by layer, and keeps the failure message | Helper tools work correctly | ✅ | 29ms |
| generate-test-report — buildModel FAIL: does not count a skipped test as passed | Helper tools work correctly | ✅ | 2ms |
| generate-test-report — fmtDuration PASS: formats sub-second, seconds, and minutes | Helper tools work correctly | ✅ | 1ms |
| generate-test-report — fmtDuration FAIL: returns a placeholder for a missing duration rather than NaN | Helper tools work correctly | ✅ | 0ms |
| generate-test-report — render PASS: emits the plain-language sections and a "needs attention" block with the failure detail | Helper tools work correctly | ✅ | 3ms |
| generate-test-report — render FAIL: an all-pass run is not reported as needing attention | Helper tools work correctly | ✅ | 1ms |
| generate-test-report — render PASS: shows a lines-of-code section when that data is supplied | Helper tools work correctly | ✅ | 20ms |
| generate-test-report — friendlyArea PASS: maps a known layer to plain language and tidies an unknown one | Helper tools work correctly | ✅ | 0ms |
| import-prototype.js — genesis layout PASS: copies genesis marker files into documentation/ when genesis.md is present | Helper tools work correctly | ✅ | 350ms |
| import-prototype.js — genesis layout FAIL: returns status=error when --from path does not exist | Helper tools work correctly | ✅ | 360ms |
| init-preferences.js — initial write PASS: writes .claude/preferences.json with the given flags | Helper tools work correctly | ✅ | 326ms |
| init-preferences.js — initial write FAIL: rejects non-boolean flag values | Helper tools work correctly | ✅ | 381ms |
| init-preferences.js — idempotency PASS: second invocation without --force skips (reports "skipped" or similar) | Helper tools work correctly | ✅ | 598ms |
| init-preferences.js — idempotency FAIL: --force overwrites, proving idempotency can be bypassed deliberately | Helper tools work correctly | ✅ | 563ms |
| quality-gates.js — JSON shape PASS: always outputs a parseable JSON object with a gates array | Helper tools work correctly | ✅ | 414ms |
| quality-gates.js — JSON shape FAIL: does not return a "conditional pass" marker anywhere in its JSON output | Helper tools work correctly | ✅ | 299ms |
| scan-doc.js — plain markdown file PASS: reports correct line count and text type | Helper tools work correctly | ✅ | 297ms |
| scan-doc.js — plain markdown file FAIL: does not claim a text file is binary | Helper tools work correctly | ✅ | 382ms |
| scan-doc.js — binary file detection PASS: flags a buffer with null bytes as binary | Helper tools work correctly | ✅ | 336ms |
| scan-doc.js — binary file detection FAIL: does not attempt to count lines in a binary buffer as if it were text | Helper tools work correctly | ✅ | 293ms |
| scan-doc.js — keyword counting PASS: counts requested keywords case-insensitively | Helper tools work correctly | ✅ | 352ms |
| scan-doc.js — keyword counting FAIL: keywords not present yield zero, not undefined/crash | Helper tools work correctly | ✅ | 335ms |

---

<sub>Generated 2026-07-09 06:36:25 · QA suite version 0.1.0 · code version ee6363d on branch main · Node v24.11.0, Vitest 2.1.9. Time taken is the real wall-clock time; checks run side by side, so it is shorter than adding up each one.</sub>
