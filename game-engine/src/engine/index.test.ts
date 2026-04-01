import { ENGINE_VERSION, ENGINE_NAME } from './index';

describe('Engine', () => {
  test('exports a version string', () => {
    expect(ENGINE_VERSION).toBeDefined();
    expect(typeof ENGINE_VERSION).toBe('string');
  });

  test('version follows semver format', () => {
    // Semver looks like "1.2.3" - three numbers separated by dots
    const semverPattern = /^\d+\.\d+\.\d+$/;
    expect(ENGINE_VERSION).toMatch(semverPattern);
  });

  test('exports an engine name', () => {
    expect(ENGINE_NAME).toBeDefined();
    expect(ENGINE_NAME.length).toBeGreaterThan(0);
  });
});
