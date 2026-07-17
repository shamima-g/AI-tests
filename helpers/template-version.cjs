'use strict';
/**
 * template-version.cjs — read the two versions the drift banner (Layer A) shows:
 *   • the SUITE's baseline — the ../VERSION file it carries ("I was written for X").
 *   • the TEMPLATE's version — the `template-version.json` (`templateRef`) at the
 *     root of the template under test, with the git tag as a fallback.
 *
 * Every reader is tolerant: a missing/malformed marker yields `null` (reported as
 * "unknown"), never a throw — an unknown version must not crash a run.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { normaliseVersion, compareVersions } = require('./changelog.cjs');

const QA_ROOT = path.resolve(__dirname, '..');

/** The suite's own baseline version (from ../VERSION), or null if absent. */
function suiteVersion(qaRoot = QA_ROOT) {
  try {
    const v = fs.readFileSync(path.join(qaRoot, 'VERSION'), 'utf8').trim();
    return v ? normaliseVersion(v) : null;
  } catch {
    return null;
  }
}

/**
 * The version of the template rooted at `targetRoot`.
 * Order: template-version.json → git tag (`git describe --tags`) → null.
 * @returns {{ version: string|null, source: 'template-version.json'|'git-tag'|'unknown' }}
 */
function templateVersion(targetRoot) {
  const markerPath = path.join(targetRoot, 'template-version.json');
  try {
    const marker = JSON.parse(fs.readFileSync(markerPath, 'utf8'));
    if (marker && marker.templateRef) {
      return { version: normaliseVersion(marker.templateRef), source: 'template-version.json' };
    }
  } catch {
    /* fall through to git */
  }
  try {
    const r = spawnSync('git', ['-C', targetRoot, 'describe', '--tags', '--abbrev=0'], {
      encoding: 'utf8',
      timeout: 10000,
    });
    if (r.status === 0 && r.stdout.trim()) {
      return { version: normaliseVersion(r.stdout.trim()), source: 'git-tag' };
    }
  } catch {
    /* ignore */
  }
  return { version: null, source: 'unknown' };
}

/**
 * The gap between the suite baseline and the template under test.
 * @returns {{ suite: string|null, template: string|null, source: string,
 *             direction: 'in-sync'|'suite-ahead'|'template-ahead'|'unknown' }}
 */
function versionGap(targetRoot, qaRoot = QA_ROOT) {
  const suite = suiteVersion(qaRoot);
  const { version: template, source } = templateVersion(targetRoot);
  let direction = 'unknown';
  if (suite && template) {
    const c = compareVersions(suite, template);
    direction = c === 0 ? 'in-sync' : c > 0 ? 'suite-ahead' : 'template-ahead';
  }
  return { suite, template, source, direction };
}

module.exports = { suiteVersion, templateVersion, versionGap, QA_ROOT };
