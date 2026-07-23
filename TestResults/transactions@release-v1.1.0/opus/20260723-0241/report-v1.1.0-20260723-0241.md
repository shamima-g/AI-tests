# Tier 3 report — 20260723-0241

A plain-language summary of the automated Tier 3 run for the **transactions** app.

## The run

| | |
|---|---|
| Result | ✅ Passed |
| App (benchmark) | transactions |
| AI model | opus |
| Template | release-v1.1.0 |
| Version tested | v1.1.0 |
| Epics created | 7 |
| Stories created | 6 |
| Run by | User on WINDEV2407EVAL |
| When | 20260723-0241 |
| Active time | 99m 57s |
| Estimated active time | 104m 33s (this run -4m 36s vs estimate) |
| Claude's own time | 50m 35s |
| Estimated Claude time | 104m 2s |
| Paused / excluded | 0s |
| Memory the run added | 3.6 GB (whole-machine peak 10.6 GB) |
| Fits in 16 GB? | ✅ yes |
| Total AI tokens | 39,224,737 |
| Tier 3 verdict | ✅ met the rules |
| Build pass-rate | 100% |

## Memory (minimum RAM)

**The run itself added about 3.6 GB of memory.** (Whole-machine use peaked at 10.6 GB, but the machine was already using 7 GB before the run started — so the run's own footprint is the difference, ~3.6 GB. Least free at any moment: 3.8 GB, on a machine with 11.6 GB.)

**A 16 GB machine should cope.** Allowing ~4 GB for a lean VM's own operating system plus the ~3.6 GB this run added comes to about **7.6 GB** — comfortably under 16 GB.

> How to read this: the headline is the **added** memory, not the whole-machine peak — the peak is inflated by everything else that happened to be running here. The 16 GB verdict assumes a lean VM uses ~4 GB for its OS. To be 100% certain, run once on an actual 16 GB VM; this is the evidence toward that.

## How each group of tests did

| Group | Tests | Passed | Failed | Skipped | Time | Tokens |
|---|--:|--:|--:|--:|--:|--:|
| Project & workflow checks (Tier 1) | 148 | 80 | 0 | 68 | 0.6s | — |
| Recorded run (Tier 2) | 9 | 2 | 0 | 7 | 0s | — |

## 2.1 Build attempts

| Attempt | Result | Compiled? | Tokens | Turns | Reason |
|--:|---|:--:|--:|--:|---|
| 1 | passed | yes | 39,224,737 | 1622 | built and passed all rules |

## 2.2 Where the time went (estimate vs actual)

| Phase | Estimated | Actual | Difference | Claude time |
|---|--:|--:|--:|--:|
| opus/build | 50m 9s | 99m 57s | +49m 48s | 50m 35s |
| opus/build/spec | 7m 44s | 10m 45s | +3m 1s | 13m 6s |
| opus/build/save | 26m 40s | 23m 4s | -3m 36s | 6m 17s |
| opus/build/green | 40m 46s | 50m 54s | +10m 8s | 24m 45s |
| opus/build/red | 16m 56s | 15m 3s | -1m 53s | 6m 27s |

## Epics — time to build each one

This run created **7** epics and **6** stories in total. The estimate for each epic is its average build time on past runs of this app + model (a dash means no history yet).

| Epic | Stories | Estimated | Actual | Difference |
|---|--:|--:|--:|--:|
| approve-reject | 0 | — | 0s | — |
| auth-shell-foundation | 6 | — | 82m 46s | — |
| export-csv | 0 | — | 0s | — |
| file-lifecycle-actions | 0 | — | 0s | — |
| file-logs-dashboard | 0 | 0s | 0s | +0s |
| file-upload | 0 | — | 0s | — |
| transactions-table | 0 | — | 0s | — |

## Tools on record

- node v24.16.0
- npm 11.13.0
- claude 2.1.195 (Claude Code)
- pwsh 7.6.3

