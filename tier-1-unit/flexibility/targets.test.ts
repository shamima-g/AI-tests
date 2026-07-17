/**
 * Channel resolution (workflow-tests.md area N). A named target resolves to its
 * repo + contract; an unknown name is a loud, listing error — never a silent
 * default onto the wrong repo. Tested against both the fixture and the real file.
 */

import { describe, it, expect } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTargets, targetNames, resolveTarget } from '../../helpers/targets.cjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FIXTURE = path.join(HERE, '..', '..', 'fixtures', 'flexibility', 'targets.sample.json');

describe('channel resolution — good case', () => {
  it('PASS: dev and release resolve to their repo URL + contract', () => {
    const dev = resolveTarget('dev', FIXTURE);
    expect(dev.repo).toMatch(/dev/);
    expect(dev.contract).toBe('template-contract.dev.json');
    const rel = resolveTarget('release', FIXTURE);
    expect(rel.contract).toBe('template-contract.release.json');
  });

  it('PASS: the real targets.json lists dev and release, each with a repo + contract', () => {
    const names = targetNames();
    expect(names).toContain('dev');
    expect(names).toContain('release');
    for (const n of names) {
      const t = resolveTarget(n);
      expect(t.repo, `${n}.repo`).toBeTruthy();
      expect(t.contract, `${n}.contract`).toMatch(/^template-contract\..+\.json$/);
    }
  });
});

describe('channel resolution — broken case', () => {
  it('BROKEN: an unknown target name throws a clear error listing the known ones (no silent default)', () => {
    expect(() => resolveTarget('staging', FIXTURE)).toThrowError(/Unknown target "staging"/);
    expect(() => resolveTarget('staging', FIXTURE)).toThrowError(/dev, release/);
  });

  it('PASS: loadTargets rejects a targets file with no targets', () => {
    // Point at a JSON file that has no "targets" key.
    const empty = path.join(HERE, '..', '..', 'tsconfig.json');
    expect(() => loadTargets(empty)).toThrowError(/no "targets"/);
  });
});
