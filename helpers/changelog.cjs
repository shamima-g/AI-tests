'use strict';
/**
 * changelog.cjs — parse a template's CHANGELOG.md and answer "what changed
 * between version X and version Y?".
 *
 * This is the single source of truth for changelog reading, consumed BOTH by the
 * CLI scripts (`require(...)`, plain Node) and by the Tier-1 tests (`import ...`,
 * Vitest transforms CJS fine). Keeping it in one `.cjs` file avoids the drift a
 * TS-copy-for-tests / JS-copy-for-scripts split would invite.
 *
 * Format: Keep a Changelog (https://keepachangelog.com/en/1.1.0/) — the format
 * the real templates use:
 *   ## [1.1.0] - 2026-07-14        ← a version header (semver + optional date)
 *   ### Added                      ← an entry group
 *   - **Lead-in** — description.   ← an entry (bullet)
 * plus an "## [Unreleased]" section we keep but never count as a released version.
 *
 * Everything here is pure (string in → data out), so both good and broken inputs
 * are cheap to test with fixtures.
 */

/** @typedef {{ type: string, text: string }} ChangelogEntry */
/** @typedef {{ version: string, date: string|null, entries: ChangelogEntry[] }} ChangelogVersion */

/** Strip a leading "v" and surrounding space: "v1.1.0" → "1.1.0". */
function normaliseVersion(v) {
  return String(v == null ? '' : v).trim().replace(/^v/i, '');
}

/**
 * Compare two semver-ish version strings numerically.
 * Returns <0 if a<b, 0 if equal, >0 if a>b. Non-numeric parts sort after numeric
 * (so "1.1.0" > "1.1.0-rc"). Tolerant of a leading "v" and missing patch parts.
 */
function compareVersions(a, b) {
  const pa = normaliseVersion(a).split('-')[0].split('.').map((n) => parseInt(n, 10) || 0);
  const pb = normaliseVersion(b).split('-')[0].split('.').map((n) => parseInt(n, 10) || 0);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d !== 0) return d < 0 ? -1 : 1;
  }
  // Same numeric core — a pre-release (has "-") sorts BEFORE the plain release.
  const preA = normaliseVersion(a).includes('-');
  const preB = normaliseVersion(b).includes('-');
  if (preA && !preB) return -1;
  if (!preA && preB) return 1;
  return 0;
}

/**
 * Parse Keep-a-Changelog markdown into an ordered list of released versions,
 * newest first. "Unreleased" is skipped. Never throws on a malformed heading —
 * a line that isn't a recognisable version header is simply not treated as one
 * (so a typo'd heading is ignored, not fatal).
 *
 * @param {string} text - the CHANGELOG.md contents
 * @returns {ChangelogVersion[]}
 */
function parseChangelog(text) {
  const lines = String(text == null ? '' : text).split(/\r?\n/);
  const versions = [];
  let current = null; // the version being filled
  let currentType = 'Other'; // the ### group we're inside

  // "## [1.1.0] - 2026-07-14"  or  "## [1.1.0]"  (date optional)
  const versionRe = /^##\s+\[([^\]]+)\]\s*(?:-\s*(.+?))?\s*$/;
  // "### Added"
  const groupRe = /^###\s+(.+?)\s*$/;
  // "- something"  or  "* something"
  const bulletRe = /^[-*]\s+(.*\S)\s*$/;

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    const vm = versionRe.exec(line);
    if (vm) {
      const label = vm[1].trim();
      // Keep-a-Changelog's "Unreleased" placeholder is not a released version.
      if (/^unreleased$/i.test(label)) {
        current = null;
        continue;
      }
      // Only a semver-ish label is a real version header; a typo'd/prose heading
      // in brackets is ignored (not fatal, not counted as a version).
      const ver = normaliseVersion(label);
      if (!/^\d+(\.\d+)*(-\S+)?$/.test(ver)) {
        current = null;
        continue;
      }
      current = { version: ver, date: (vm[2] || '').trim() || null, entries: [] };
      currentType = 'Other';
      versions.push(current);
      continue;
    }
    if (!current) continue; // text before the first version header (or under Unreleased)
    const gm = groupRe.exec(line);
    if (gm) {
      currentType = gm[1].trim();
      continue;
    }
    const bm = bulletRe.exec(line);
    if (bm) {
      current.entries.push({ type: currentType, text: bm[1].trim() });
    }
  }
  return versions;
}

/**
 * The entries that landed AFTER `from` up to and including `to` — i.e. what a
 * suite/template at `from` is missing that `to` has. Order in the range doesn't
 * matter; the result is flattened newest-first.
 *
 * A reversed range (from > to) or an equal range yields [] rather than an error,
 * so "no gap" and "backwards gap" both read as "nothing to explain".
 *
 * @param {ChangelogVersion[]} versions - output of parseChangelog
 * @param {string} from - exclusive lower bound (e.g. the older version)
 * @param {string} to - inclusive upper bound (e.g. the newer version)
 * @returns {ChangelogEntry[]}
 */
function entriesBetween(versions, from, to) {
  if (compareVersions(from, to) >= 0) return [];
  const out = [];
  for (const v of versions) {
    // (from, to]  — strictly above `from`, at or below `to`
    if (compareVersions(v.version, from) > 0 && compareVersions(v.version, to) <= 0) {
      for (const e of v.entries) out.push({ ...e, version: v.version });
    }
  }
  return out;
}

/**
 * Does any changelog entry in `entries` plausibly explain a difference named by
 * `token` (e.g. a stage name "REVIEW", a doc id "risk-log", a status "blocked")?
 * Match is word-boundary, case-insensitive, and also matches the kebab/space/
 * underscore variants of the token — enough to attribute a structural diff to the
 * change that introduced it without hand-linking every one.
 *
 * @param {Array<{text:string}>} entries
 * @param {string} token
 * @returns {{text:string, version?:string}|null} the first matching entry, or null
 */
function findExplaining(entries, token) {
  const t = String(token == null ? '' : token).trim();
  if (!t) return null;
  // Build variants: as-is, kebab, spaced, underscored, collapsed.
  const variants = new Set([
    t,
    t.replace(/[-_\s]+/g, '-'),
    t.replace(/[-_\s]+/g, ' '),
    t.replace(/[-_\s]+/g, '_'),
    t.replace(/[-_\s]+/g, ''),
  ]);
  for (const e of entries || []) {
    const hay = String(e.text || '');
    for (const v of variants) {
      if (!v) continue;
      const re = new RegExp(`(^|[^\\w-])${escapeRegExp(v)}([^\\w-]|$)`, 'i');
      if (re.test(hay)) return e;
    }
  }
  return null;
}

function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = {
  parseChangelog,
  entriesBetween,
  findExplaining,
  compareVersions,
  normaliseVersion,
};
