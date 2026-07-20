# Tier 3 report — 20260720-0620

A plain-language summary of the automated Tier 3 run for the **transactions** app.

## The run

| | |
|---|---|
| Result | ✅ Passed |
| App (benchmark) | transactions |
| AI model | opus |
| Template | release-v1.1.0 |
| Version tested | v1.1.0 |
| Run by | User on WINDEV2407EVAL |
| When | 20260720-0620 |
| Active time | 91m 19s |
| Claude's own time | 91m 19s |
| Paused / excluded | 0s |
| Memory the run added | 2.5 GB (whole-machine peak 7.9 GB) |
| Fits in 16 GB? | ✅ yes |
| Total AI tokens | 74,437 |
| Tier 3 verdict | ⚠️ fell short (recorded, not failed) |
| Build pass-rate | 0% |

## Memory (minimum RAM)

**The run itself added about 2.5 GB of memory.** (Whole-machine use peaked at 7.9 GB, but the machine was already using 5.4 GB before the run started — so the run's own footprint is the difference, ~2.5 GB. Least free at any moment: 2.5 GB, on a machine with 8.4 GB.)

**A 16 GB machine should cope.** Allowing ~4 GB for a lean VM's own operating system plus the ~2.5 GB this run added comes to about **6.5 GB** — comfortably under 16 GB.

> How to read this: the headline is the **added** memory, not the whole-machine peak — the peak is inflated by everything else that happened to be running here. The 16 GB verdict assumes a lean VM uses ~4 GB for its OS. To be 100% certain, run once on an actual 16 GB VM; this is the evidence toward that.

## How each group of tests did

| Group | Tests | Passed | Failed | Skipped | Time | Tokens |
|---|--:|--:|--:|--:|--:|--:|
| Project & workflow checks (Tier 1) | 145 | 77 | 0 | 68 | 0.4s | — |
| Recorded run (Tier 2) | 9 | 2 | 0 | 7 | 0s | — |

## 2.1 Build attempts

| Attempt | Result | Compiled? | Tokens | Turns | Reason |
|--:|---|:--:|--:|--:|---|
| 1 | non-conforming | yes | 74,437 | 1002 | built, but missed: role-per-story |

## 2.2 Where the time went (estimate vs actual)

| Phase | Estimated | Actual | Difference | Claude time |
|---|--:|--:|--:|--:|
| opus/build | — | 91m 19s | — | 91m 19s |
| opus/build/spec | — | 6m 46s | — | 20m 42s |
| opus/build/save | — | 26m 40s | — | 21m 24s |
| opus/build/green | — | 40m 46s | — | 33m 42s |
| opus/build/red | — | 16m 56s | — | 15m 30s |

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

