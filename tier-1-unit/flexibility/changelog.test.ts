/**
 * Changelog parsing + gap attribution (workflow-tests.md area Q).
 * Template-independent — pure string→data, fed the sample fixture. Good and
 * broken cases for parse, entries-between, attribution, and version compare.
 */

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseChangelog,
  entriesBetween,
  findExplaining,
  compareVersions,
  normaliseVersion,
} from '../../helpers/changelog.cjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SAMPLE = fs.readFileSync(
  path.join(HERE, '..', '..', 'fixtures', 'flexibility', 'CHANGELOG.sample.md'),
  'utf8',
);

describe('parseChangelog — good input', () => {
  const versions = parseChangelog(SAMPLE);

  it('PASS: returns released versions newest-first, skipping Unreleased', () => {
    expect(versions.map((v) => v.version)).toEqual(['1.2.0', '1.1.0', '1.0.0', '0.4.1']);
  });

  it('PASS: parses the date and typed entries of a version', () => {
    const v120 = versions.find((v) => v.version === '1.2.0')!;
    expect(v120.date).toBe('2026-08-01');
    expect(v120.entries).toContainEqual({ type: 'Added', text: expect.stringContaining('REVIEW stage') });
    expect(v120.entries).toContainEqual({ type: 'Removed', text: expect.stringContaining('dashboard') });
  });
});

describe('parseChangelog — broken/edge input', () => {
  it('PASS: a malformed/typo heading is ignored, not fatal (parser never throws)', () => {
    expect(() => parseChangelog(SAMPLE)).not.toThrow();
    expect(parseChangelog(SAMPLE).map((v) => v.version)).not.toContain('not-a-version — a typo');
  });

  it('PASS: empty / null input yields an empty list, not an error', () => {
    expect(parseChangelog('')).toEqual([]);
    expect(parseChangelog(null as unknown as string)).toEqual([]);
  });
});

describe('entriesBetween', () => {
  const versions = parseChangelog(SAMPLE);

  it('PASS: (1.0.0, 1.2.0] returns only the 1.1.0 and 1.2.0 entries', () => {
    const got = entriesBetween(versions, '1.0.0', '1.2.0').map((e) => e.version);
    expect(new Set(got)).toEqual(new Set(['1.1.0', '1.2.0']));
    expect(got).not.toContain('1.0.0'); // exclusive lower bound
  });

  it('PASS: tolerates a leading "v" on the bounds', () => {
    expect(entriesBetween(versions, 'v1.1.0', 'v1.2.0').every((e) => e.version === '1.2.0')).toBe(true);
  });

  it('BROKEN-RANGE: a reversed or equal range yields [] (no gap), not an error', () => {
    expect(entriesBetween(versions, '1.2.0', '1.0.0')).toEqual([]);
    expect(entriesBetween(versions, '1.1.0', '1.1.0')).toEqual([]);
  });
});

describe('findExplaining — attribution', () => {
  const entries = parseChangelog(SAMPLE).flatMap((v) => v.entries.map((e) => ({ ...e, version: v.version })));

  it('PASS: a symbol named in the changelog is explained (incl. kebab/spaced variants)', () => {
    expect(findExplaining(entries, 'REVIEW')).toBeTruthy();
    expect(findExplaining(entries, 'audit')).toBeTruthy();
  });

  it('BROKEN: a symbol NOT in any entry is unexplained (returns null)', () => {
    expect(findExplaining(entries, 'TOTALLY-UNDOCUMENTED-STAGE')).toBeNull();
  });
});

describe('compareVersions / normaliseVersion', () => {
  it('PASS: orders versions numerically and strips a leading v', () => {
    expect(compareVersions('1.2.0', '1.10.0')).toBeLessThan(0);
    expect(compareVersions('v2.0.0', '1.9.9')).toBeGreaterThan(0);
    expect(compareVersions('1.1.0', 'v1.1.0')).toBe(0);
    expect(normaliseVersion('  V1.1.0 ')).toBe('1.1.0');
  });

  it('PASS: a pre-release sorts before its plain release', () => {
    expect(compareVersions('1.1.0-rc', '1.1.0')).toBeLessThan(0);
  });
});
