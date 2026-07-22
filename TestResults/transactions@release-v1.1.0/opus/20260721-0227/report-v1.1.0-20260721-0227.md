# Tier 3 report — 20260721-0227

A plain-language summary of the automated Tier 3 run for the **transactions** app.

## The run

| | |
|---|---|
| Result | ✅ Passed |
| App (benchmark) | transactions |
| AI model | opus |
| Template | release-v1.1.0 |
| Version tested | v1.1.0 |
| Epics created | 4 |
| Stories created | 7 |
| Run by | User on WINDEV2407EVAL |
| When | 20260721-0227 |
| Active time | 108m 47s |
| Estimated active time | 91m 19s (this run +17m 29s vs estimate) |
| Claude's own time | 108m 47s |
| Estimated Claude time | 91m 19s |
| Paused / excluded | 0s |
| Memory the run added | 2 GB (whole-machine peak 8.2 GB) |
| Fits in 16 GB? | ✅ yes |
| Total AI tokens | 153,268 |
| Tier 3 verdict | ⚠️ fell short (recorded, not failed) |
| Build pass-rate | 0% |

## Memory (minimum RAM)

**The run itself added about 2 GB of memory.** (Whole-machine use peaked at 8.2 GB, but the machine was already using 6.2 GB before the run started — so the run's own footprint is the difference, ~2 GB. Least free at any moment: 3.3 GB, on a machine with 10.1 GB.)

**A 16 GB machine should cope.** Allowing ~4 GB for a lean VM's own operating system plus the ~2 GB this run added comes to about **6 GB** — comfortably under 16 GB.

> How to read this: the headline is the **added** memory, not the whole-machine peak — the peak is inflated by everything else that happened to be running here. The 16 GB verdict assumes a lean VM uses ~4 GB for its OS. To be 100% certain, run once on an actual 16 GB VM; this is the evidence toward that.

## How each group of tests did

| Group | Tests | Passed | Failed | Skipped | Time | Tokens |
|---|--:|--:|--:|--:|--:|--:|
| Project & workflow checks (Tier 1) | 145 | 77 | 0 | 68 | 0.6s | — |
| Recorded run (Tier 2) | 9 | 2 | 0 | 7 | 0s | — |

## 2.1 Build attempts

| Attempt | Result | Compiled? | Tokens | Turns | Reason |
|--:|---|:--:|--:|--:|---|
| 1 | non-conforming | yes | 153,268 | 1096 | built, but missed: role-per-story |

## 2.2 Where the time went (estimate vs actual)

| Phase | Estimated | Actual | Difference | Claude time |
|---|--:|--:|--:|--:|
| opus/build | 91m 19s | 108m 47s | +17m 29s | 108m 47s |
| opus/build/spec | 6m 46s | 12m 7s | +5m 21s | 11m 46s |
| opus/build/save | 26m 40s | 25m 44s | -55.5s | 13m 42s |
| opus/build/green | 40m 46s | 64m 13s | +23m 27s | 76m 20s |
| opus/build/red | 16m 56s | 6m 35s | -10m 22s | 6m 58s |

## Epics — time to build each one

This run created **4** epics and **7** stories in total. The estimate for each epic is its average build time on past runs of this app + model (a dash means no history yet).

| Epic | Stories | Estimated | Actual | Difference |
|---|--:|--:|--:|--:|
| file-logs-dashboard | 0 | — | 0s | — |
| file-upload-lifecycle | 0 | — | 0s | — |
| foundation-auth-shell | 7 | — | 89m 3s | — |
| transactions-review | 0 | — | 0s | — |

## Tools on record

- node v24.16.0
- npm 11.13.0
- claude 2.1.195 (Claude Code)
- pwsh 7.6.3

## 3.1 What needs attention, and how to fix it

**Tier 3 rule not met: role-per-story**

- Possible fix: Add a non-empty role line to the story file.

**Build attempt 1: non-conforming**

- Possible fix: built, but missed: role-per-story

