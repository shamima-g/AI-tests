/**
 * JSON Schema for the per-epic `state.json`, SINGLE-SOURCED from the template.
 *
 * The phase / story-status / e2e-status / halt-stage enums and the default-state
 * factory are imported from `.claude/scripts/lib/epic-state.js` — never copied here
 * — so this schema cannot drift from the producer. (This is the epic-branch
 * replacement for the retired `workflow-state` schema, which single-sourced from
 * the removed `workflow-helpers.ALL_PHASES`.)
 *
 * When no template is present (standalone run), the imports fall back to empty
 * enums; the schema test skips via `describeTemplate`, so the fallback is never
 * exercised.
 */

import { createRequire } from 'node:module';
import path from 'node:path';
import { TARGET_ROOT, TEMPLATE_PRESENT } from '../target';

const require = createRequire(import.meta.url);

interface EpicStateLib {
  EPIC_PHASES: string[];
  STORY_STATUS_VALUES: string[];
  E2E_STATUS_VALUES: string[];
  HALT_STAGES: string[];
  VALID_TRANSITIONS: Record<string, string[]>;
  defaultEpicState: (o: { slug: string; name: string; dependsOn?: string[] }) => Record<string, unknown>;
}

const lib: EpicStateLib | null = TEMPLATE_PRESENT
  ? (require(path.join(TARGET_ROOT, '.claude', 'scripts', 'lib', 'epic-state.js')) as EpicStateLib)
  : null;

export const EPIC_PHASES: string[] = lib?.EPIC_PHASES ?? [];
export const STORY_STATUS_VALUES: string[] = lib?.STORY_STATUS_VALUES ?? [];
export const E2E_STATUS_VALUES: string[] = lib?.E2E_STATUS_VALUES ?? [];
export const HALT_STAGES: string[] = lib?.HALT_STAGES ?? [];
export const VALID_TRANSITIONS: Record<string, string[]> = lib?.VALID_TRANSITIONS ?? {};
export const defaultEpicState: EpicStateLib['defaultEpicState'] =
  lib?.defaultEpicState ?? (() => ({}));

/**
 * A string constrained to `values` — or an UNCONSTRAINED string when the list is
 * empty (a standalone run with no template). An empty `enum: []` is an invalid
 * JSON Schema that makes `ajv.compile` throw at import, before `describeTemplate`
 * can skip the suite; omitting `enum` keeps the schema valid. The unconstrained
 * form is never exercised — the tests that use this schema skip without a template.
 */
function stringEnum(values: string[]): Record<string, unknown> {
  return values.length ? { type: 'string', enum: [...values] } : { type: 'string' };
}

/** Ajv-compatible JSON Schema for a per-epic state.json document. */
export const epicStateSchema: Record<string, unknown> = {
  type: 'object',
  required: ['schemaVersion', 'epic', 'phase', 'stories', 'lastUpdated'],
  additionalProperties: true,
  properties: {
    schemaVersion: { type: 'integer', minimum: 1 },
    epic: {
      type: 'object',
      required: ['slug', 'name'],
      additionalProperties: true,
      properties: {
        slug: { type: 'string', pattern: '^[a-z0-9]+(-[a-z0-9]+)*$' },
        name: { type: 'string', minLength: 1 },
        createdAt: { type: 'string' },
        dependsOn: { type: 'array', items: { type: 'string' } },
        introducesSharedSurface: { type: 'boolean' },
        unverifiedAssumptions: { type: 'array', items: { type: 'string' } },
        manualTestResults: { type: 'array' },
      },
    },
    phase: stringEnum(EPIC_PHASES),
    stories: {
      type: 'object',
      additionalProperties: {
        type: 'object',
        additionalProperties: true,
        properties: {
          status: stringEnum(STORY_STATUS_VALUES),
          commit: { type: ['string', 'null'] },
          e2eStatus: stringEnum(E2E_STATUS_VALUES),
        },
      },
    },
    halt: {
      oneOf: [
        { type: 'null' },
        {
          type: 'object',
          additionalProperties: true,
          // `stage`, when present, must be one of the known halt stages; halt objects
          // without a stage (e.g. a plain { reason }) are still valid.
          properties: { stage: stringEnum(HALT_STAGES) },
        },
      ],
    },
    lastUpdated: { type: 'string' },
  },
};
