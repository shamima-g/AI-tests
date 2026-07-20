# Tier 3 report — 20260720-0804

A plain-language summary of the automated Tier 3 run for the **transactions** app.

## The run

| | |
|---|---|
| Result | ✅ Passed |
| App (benchmark) | transactions |
| AI model | opus |
| Template | dev-v1.1.0 |
| Version tested | v1.1.0 |
| Run by | User on WINDEV2407EVAL |
| When | 20260720-0804 |
| Active time | 121m 41s |
| Claude's own time | 1m 58s |
| Paused / excluded | 0s |
| Memory the run added | 2.4 GB (whole-machine peak 8.5 GB) |
| Fits in 16 GB? | ✅ yes |
| Total AI tokens | 1,498,474 |
| Tier 3 verdict | ⚠️ fell short (recorded, not failed) |
| Build pass-rate | 0% |

## Memory (minimum RAM)

**The run itself added about 2.4 GB of memory.** (Whole-machine use peaked at 8.5 GB, but the machine was already using 6.1 GB before the run started — so the run's own footprint is the difference, ~2.4 GB. Least free at any moment: 2.6 GB, on a machine with 9.5 GB.)

**A 16 GB machine should cope.** Allowing ~4 GB for a lean VM's own operating system plus the ~2.4 GB this run added comes to about **6.4 GB** — comfortably under 16 GB.

> How to read this: the headline is the **added** memory, not the whole-machine peak — the peak is inflated by everything else that happened to be running here. The 16 GB verdict assumes a lean VM uses ~4 GB for its OS. To be 100% certain, run once on an actual 16 GB VM; this is the evidence toward that.

## How each group of tests did

| Group | Tests | Passed | Failed | Skipped | Time | Tokens |
|---|--:|--:|--:|--:|--:|--:|
| Project & workflow checks (Tier 1) | 145 | 77 | 0 | 68 | 0.5s | — |
| Recorded run (Tier 2) | 9 | 2 | 0 | 7 | 0s | — |

## 2.1 Build attempts

| Attempt | Result | Compiled? | Tokens | Turns | Reason |
|--:|---|:--:|--:|--:|---|
| 1 | non-conforming | yes | 1,498,474 | 1177 | built, but missed: role-per-story |

## 2.2 Where the time went (estimate vs actual)

| Phase | Estimated | Actual | Difference | Claude time |
|---|--:|--:|--:|--:|
| opus/build | — | 121m 41s | — | 1m 58s |
| opus/build/spec | — | 9m 53s | — | 13.3s |
| opus/build/save | — | 30m 42s | — | 11.5s |
| opus/build/green | — | 69m 2s | — | 1m 18s |
| opus/build/red | — | 11m 55s | — | 15.3s |

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

