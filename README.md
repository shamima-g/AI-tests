# AI-tests — tests for the Stadium 8 workflow template

This suite checks the **template itself** — the scripts, hooks, state files, and
agent/command definitions under `.claude/` that make the workflow run. It does *not*
test an app someone builds with the template. Think of it as a safety net around the
workflow's own plumbing.

## Quick start

```bash
npm install
npm test          # runs the checks, writes a report to TestResults/, opens it
```

That's it. `npm test` exits non-zero if anything needs attention.

Handy variations:

```bash
npm run test:raw     # just the tests, no report
npm run test:tier1   # the fast unit tests only
```

## Test a specific template and version

By default the suite tests the template in the parent folder. To point it at a
specific one (dev or release) at a specific version, it downloads that version and
aims itself at it:

```bash
npm run test:target -- --target dev --ref v1.1.0
```

Results are filed under `TestResults/dev-v1.1.0/`, so you can compare versions side by
side. To check whether dev is safe to promote to release:

```bash
npm run compare:targets -- --a release --a-ref v1.0.0 --b dev --b-ref v1.1.0
```

## Good to know

- **Safe to run anywhere.** With no template nearby, template-specific checks skip
  (with a notice) instead of failing — you'll never see a fake "all green".
- **Windows + PowerShell tests.** The PowerShell hook tests need Pester 5 once:
  `pwsh -Command "Install-Module Pester -Scope CurrentUser -Force -SkipPublisherCheck -MinimumVersion 5.0"`, then `npm run test:pester`.

## Learn more

**[workflow-tests.md](workflow-tests.md) is the full guide** — how the tests are
organised (the three tiers), what each one checks, testing any template/version,
keeping tests current, and how to add one. Start there.

To understand how a given template *version's* workflow behaves, read that template's
own docs: `<template>/.claude/WORKFLOWS.md` and `<template>/.template-docs/`.
