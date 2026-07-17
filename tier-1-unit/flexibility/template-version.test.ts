/**
 * Version marker + drift gap (workflow-tests.md area P, Layer A). The suite
 * baseline comes from VERSION; the template version from template-version.json
 * (git tag as fallback). A missing/malformed marker reports "unknown", never
 * crashes; the gap direction is computed correctly.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { suiteVersion, templateVersion, versionGap } from '../../helpers/template-version.cjs';

let dir: string;
beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tv-'));
});
afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

function writeMarker(ref: unknown): void {
  fs.writeFileSync(path.join(dir, 'template-version.json'), typeof ref === 'string' ? ref : JSON.stringify(ref));
}

describe('suiteVersion', () => {
  it('PASS: reads the suite baseline from the VERSION file', () => {
    // The real VERSION at the QA root — normalised (no leading v).
    expect(suiteVersion()).toMatch(/^\d+\.\d+\.\d+/);
  });
});

describe('templateVersion — good case', () => {
  it('PASS: reads templateRef from a valid template-version.json', () => {
    writeMarker({ templateRef: 'v1.1.0', appliedAt: '2026-07-14T00:00:00Z' });
    const { version, source } = templateVersion(dir);
    expect(version).toBe('1.1.0');
    expect(source).toBe('template-version.json');
  });
});

describe('templateVersion — broken/absent marker', () => {
  it('BROKEN: a malformed marker does not crash — reports unknown (no git tag here)', () => {
    writeMarker('{ this is not json');
    const { version, source } = templateVersion(dir);
    expect(version).toBeNull();
    expect(source).toBe('unknown');
  });

  it('PASS: a missing marker reports unknown, not an error', () => {
    expect(() => templateVersion(dir)).not.toThrow();
    expect(templateVersion(dir).version).toBeNull();
  });
});

describe('versionGap — direction', () => {
  it('PASS: equal versions read as in-sync', () => {
    const suite = suiteVersion()!;
    writeMarker({ templateRef: suite });
    expect(versionGap(dir).direction).toBe('in-sync');
  });

  it('PASS: an older template reads as template-ahead=false (suite-ahead)', () => {
    writeMarker({ templateRef: '0.0.1' });
    expect(versionGap(dir).direction).toBe('suite-ahead');
  });

  it('PASS: a newer template reads as template-ahead', () => {
    writeMarker({ templateRef: '999.0.0' });
    expect(versionGap(dir).direction).toBe('template-ahead');
  });

  it('BROKEN: an unreadable template version reads as unknown gap, never throws', () => {
    // no marker written
    expect(versionGap(dir).direction).toBe('unknown');
  });
});
