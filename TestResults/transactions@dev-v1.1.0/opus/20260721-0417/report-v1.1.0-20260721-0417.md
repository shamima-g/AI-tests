# Tier 3 report — 20260721-0417

A plain-language summary of the automated Tier 3 run for the **transactions** app.

## The run

| | |
|---|---|
| Result | ✅ Passed |
| App (benchmark) | transactions |
| AI model | opus |
| Template | dev-v1.1.0 |
| Version tested | v1.1.0 |
| Epics created | 6 |
| Stories created | 22 |
| Run by | User on WINDEV2407EVAL |
| When | 20260721-0417 |
| Active time | 372m 55s |
| Estimated active time | 121m 41s (this run +251m 14s vs estimate) |
| Claude's own time | 371m 30s |
| Estimated Claude time | 1m 58s |
| Paused / excluded | 21m 14s |
| Memory the run added | 2.8 GB (whole-machine peak 9 GB) |
| Fits in 16 GB? | ✅ yes |
| Total AI tokens | 775,233 |
| Tier 3 verdict | ⚠️ fell short (recorded, not failed) |
| Build pass-rate | 0% |

## Memory (minimum RAM)

**The run itself added about 2.8 GB of memory.** (Whole-machine use peaked at 9 GB, but the machine was already using 6.2 GB before the run started — so the run's own footprint is the difference, ~2.8 GB. Least free at any moment: 3.4 GB, on a machine with 11 GB.)

**A 16 GB machine should cope.** Allowing ~4 GB for a lean VM's own operating system plus the ~2.8 GB this run added comes to about **6.8 GB** — comfortably under 16 GB.

> How to read this: the headline is the **added** memory, not the whole-machine peak — the peak is inflated by everything else that happened to be running here. The 16 GB verdict assumes a lean VM uses ~4 GB for its OS. To be 100% certain, run once on an actual 16 GB VM; this is the evidence toward that.

## How each group of tests did

| Group | Tests | Passed | Failed | Skipped | Time | Tokens |
|---|--:|--:|--:|--:|--:|--:|
| Project & workflow checks (Tier 1) | 145 | 77 | 0 | 68 | 0.4s | — |
| Recorded run (Tier 2) | 9 | 2 | 0 | 7 | 0s | — |

## 2.1 Build attempts

| Attempt | Result | Compiled? | Tokens | Turns | Reason |
|--:|---|:--:|--:|--:|---|
| 1 | non-conforming | yes | 775,233 | 2777 | built, but missed: role-per-story |

## 2.2 Where the time went (estimate vs actual)

| Phase | Estimated | Actual | Difference | Claude time |
|---|--:|--:|--:|--:|
| opus/build | 121m 41s | 372m 55s | +251m 14s | 371m 30s |
| opus/build/spec | 9m 53s | 10m 6s | +13.5s | 21m 29s |
| opus/build/save | 30m 42s | 143m 37s | +112m 55s | 86m 53s |
| opus/build/green | 69m 2s | 184m 34s | +115m 32s | 218m 33s |
| opus/build/red | 11m 55s | 34m 27s | +22m 32s | 44m 36s |

## Epics — time to build each one

This run created **6** epics and **22** stories in total. The estimate for each epic is its average build time on past runs of this app + model (a dash means no history yet).

| Epic | Stories | Estimated | Actual | Difference |
|---|--:|--:|--:|--:|
| approve-reject-actions | 3 | — | 33m 59s | — |
| auth-and-app-shell | 5 | — | 153m 56s | — |
| export-transactions-csv | 1 | — | 37m 42s | — |
| file-log-dashboard | 4 | — | 47m 24s | — |
| file-upload-and-processing | 5 | — | 64m 20s | — |
| transactions-review-table | 4 | — | 37m 48s | — |

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

