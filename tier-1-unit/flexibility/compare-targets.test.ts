/**
 * Dev-vs-release comparison (workflow-tests.md area R, Decision 1 → amber/red).
 * Pure diff/attribute/verdict over plain data:
 *   identical → GREEN · differ but all explained → AMBER · any unexplained → RED.
 */

import { describe, it, expect } from 'vitest';
import { diffLive, attribute, verdict } from '../../scripts/compare-targets.cjs';

// A minimal readLive()-shaped record.
const base = {
  stages: ['PLAN', 'BUILD', 'COMPLETE'],
  storyStatuses: ['pending', 'complete'],
  e2eStatuses: ['passed'],
  docNameIds: ['epic-brief'],
  agents: ['planner'],
  commands: ['start'],
};

// Changelog entries for the "b" side documenting the REVIEW stage + audit command.
const bEntries = [
  { type: 'Added', text: '**REVIEW stage** — a new stage.', version: '1.2.0' },
  { type: 'Added', text: '**`/audit` command** added.', version: '1.2.0' },
];

describe('diffLive', () => {
  it('PASS: identical templates produce no differences', () => {
    expect(diffLive(base, base)).toEqual([]);
  });

  it('PASS: a value only on one side is reported with the correct side', () => {
    const b = { ...base, stages: ['PLAN', 'BUILD', 'REVIEW', 'COMPLETE'] };
    const diffs = diffLive(base, b);
    expect(diffs).toContainEqual({ list: 'stages', value: 'REVIEW', side: 'b' });
  });

  it('PASS: an order-only change on an ordered list is flagged', () => {
    const b = { ...base, stages: ['BUILD', 'PLAN', 'COMPLETE'] };
    const diffs = diffLive(base, b);
    expect(diffs.some((d) => d.list === 'stages' && d.order)).toBe(true);
  });
});

describe('verdict — the three-way rule', () => {
  it('GREEN: no differences', () => {
    expect(verdict(attribute(diffLive(base, base), { a: [], b: [] }))).toBe('green');
  });

  it('AMBER: differences that are ALL explained by the changelog (pending promotion)', () => {
    const b = { ...base, stages: ['PLAN', 'BUILD', 'REVIEW', 'COMPLETE'], commands: ['start', 'audit'] };
    const attributed = attribute(diffLive(base, b), { a: [], b: bEntries });
    expect(attributed.every((d) => d.explained)).toBe(true);
    expect(verdict(attributed)).toBe('amber');
  });

  it('RED: a difference with NO changelog entry behind it is unexplained', () => {
    const b = { ...base, stages: ['PLAN', 'BUILD', 'REVIEW', 'COMPLETE'], docNameIds: ['epic-brief', 'mystery-doc'] };
    // b's changelog explains REVIEW but NOT mystery-doc.
    const attributed = attribute(diffLive(base, b), { a: [], b: bEntries });
    expect(attributed.some((d) => !d.explained && d.value === 'mystery-doc')).toBe(true);
    expect(verdict(attributed)).toBe('red');
  });

  it('RED: an order-only change is treated as needing review (unexplained)', () => {
    const b = { ...base, stages: ['BUILD', 'PLAN', 'COMPLETE'] };
    expect(verdict(attribute(diffLive(base, b), { a: [], b: [] }))).toBe('red');
  });
});
