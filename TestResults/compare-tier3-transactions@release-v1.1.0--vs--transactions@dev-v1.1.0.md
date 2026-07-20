# Tier 3 comparison — transactions

**A: release-v1.1.0** (run 20260720-0620, model opus) vs **B: dev-v1.1.0** (run 20260720-0804, model opus).

| Metric | A · release-v1.1.0 | B · dev-v1.1.0 | Δ (B − A) |
|---|--:|--:|--:|
| Result | pass | pass | — |
| Active time | 91m 19s | 121m 41s | +30m 22s |
| Claude's own time | 91m 19s | 1m 58s | -89m 21s |
| AI tokens | 74,437 | 1,498,474 | +1,424,037 |
| Build pass-rate | 0% | 0% | +0pp |
| Rules missed | 1 | 1 | +0 |
| Peak memory (MB) | 8083 | 8700 | +617 |

<sub>Δ is B minus A. For time, tokens, rules-missed and memory, lower is better; for pass-rate, higher is better. Read-only summary built from each target's saved history.</sub>
