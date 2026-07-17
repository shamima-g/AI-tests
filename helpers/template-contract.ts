/**
 * template-contract.ts — the ONE place the tests read the template's pinned shape.
 *
 * The pinned facts live in ../template-contract.json. Edit THAT file when the
 * template changes; every test that pins a stage list, status set, or doc-name
 * list reads it from here, so there is only ever one copy.
 *
 * This module also exposes the template's LIVE values (read straight from the
 * template on disk) so a drift test — and the `npm run reconcile` helper — can
 * compare "what we pinned" against "what the template actually is" and say
 * exactly what changed. Live readers return `null` when no template is present
 * (standalone run), so template-dependent checks can skip cleanly.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  EPIC_PHASES,
  STORY_STATUS_VALUES,
  E2E_STATUS_VALUES,
} from './schemas/epic-state.schema';
import { TARGET_ROOT, TEMPLATE_PRESENT } from './target';

const HERE = path.dirname(fileURLToPath(import.meta.url));

/**
 * Which recipe to read. When a target is active (QA_TARGET=dev|release, set by
 * run-target.cjs), each version is judged against ITS OWN contract
 * (template-contract.<target>.json). Falls back to the single default
 * template-contract.json for a plain local run, and again if a per-target file is
 * absent — so nothing breaks for someone running inside a repo without a target.
 */
export function contractPathFor(target: string | undefined = process.env.QA_TARGET): string {
  if (target) {
    const perTarget = path.join(HERE, '..', `template-contract.${target}.json`);
    if (fs.existsSync(perTarget)) return perTarget;
  }
  return path.join(HERE, '..', 'template-contract.json');
}

const CONTRACT_PATH = contractPathFor();

export interface TemplateContract {
  stages: string[];
  storyStatuses: string[];
  e2eStatusesCore: string[];
  docNameIds: string[];
}

/** The pinned expectations — the single editable source of truth. */
export const templateContract: TemplateContract = JSON.parse(
  fs.readFileSync(CONTRACT_PATH, 'utf8'),
) as TemplateContract;

/** The template's live epic phases, or null when no template is present. */
export function liveStages(): string[] | null {
  return TEMPLATE_PRESENT ? [...EPIC_PHASES] : null;
}

/** The template's live story-status values, or null when absent. */
export function liveStoryStatuses(): string[] | null {
  return TEMPLATE_PRESENT ? [...STORY_STATUS_VALUES] : null;
}

/** The template's live e2e-status values, or null when absent. */
export function liveE2eStatuses(): string[] | null {
  return TEMPLATE_PRESENT ? [...E2E_STATUS_VALUES] : null;
}

/** The template's live generated-doc IDs, or null when absent/unreadable. */
export function liveDocNameIds(): string[] | null {
  if (!TEMPLATE_PRESENT) return null;
  const p = path.join(TARGET_ROOT, '.claude', 'shared', 'generated-doc-conventions.json');
  if (!fs.existsSync(p)) return null;
  const parsed = JSON.parse(fs.readFileSync(p, 'utf8')) as { conventions: Array<{ id: string }> };
  return parsed.conventions.map((c) => c.id);
}
