'use strict';
/**
 * template-live.cjs — read a template checkout's LIVE shape (its own values),
 * parameterised by root so two checkouts can be compared. This is the same set of
 * facts the per-version contracts pin and `reconcile-template.cjs` reads, but here
 * it takes an explicit root so `compare-targets.cjs` can read two at once.
 *
 * Every reader tolerates absence (returns null / []) — a checkout that lacks a
 * file is a data point, not a crash.
 */

const fs = require('fs');
const path = require('path');

/** The epic-state enums (stages/story/e2e), or null if the template lacks the lib. */
function readEpicEnums(root) {
  const lib = path.join(root, '.claude', 'scripts', 'lib', 'epic-state.js');
  if (!fs.existsSync(lib)) return null;
  try {
    // Resolve fresh each call so two different roots don't share a cached module.
    delete require.cache[require.resolve(lib)];
    const mod = require(lib);
    return {
      stages: [...(mod.EPIC_PHASES || [])],
      storyStatuses: [...(mod.STORY_STATUS_VALUES || [])],
      e2eStatuses: [...(mod.E2E_STATUS_VALUES || [])],
    };
  } catch {
    return null;
  }
}

/** The generated-doc convention ids, or null if absent. */
function readDocIds(root) {
  const p = path.join(root, '.claude', 'shared', 'generated-doc-conventions.json');
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8')).conventions.map((c) => c.id);
  } catch {
    return null;
  }
}

/** Sorted base-names of files in .claude/<dir> ending in <suffix> (README/_ excluded). */
function listNames(root, dir, suffix) {
  const d = path.join(root, '.claude', dir);
  if (!fs.existsSync(d)) return [];
  return fs
    .readdirSync(d)
    .filter((f) => f.endsWith(suffix) && f !== 'README.md' && !f.startsWith('_'))
    .map((f) => f.replace(suffix, ''))
    .sort();
}

/** Everything we compare between two templates, keyed by list name. */
function readLive(root) {
  const epic = readEpicEnums(root);
  return {
    stages: epic ? epic.stages : null,
    storyStatuses: epic ? epic.storyStatuses : null,
    e2eStatuses: epic ? epic.e2eStatuses : null,
    docNameIds: readDocIds(root),
    agents: listNames(root, 'agents', '.md').filter((n) => n !== 'tone-guide'),
    commands: listNames(root, 'commands', '.md'),
  };
}

module.exports = { readEpicEnums, readDocIds, listNames, readLive };
