import { type } from '../../src/index';

const { isTrue } = type;

describe('type url isTrue', () => {
  test('should return false if value = null', () => {
    expect(isTrue(null)).toBe(false);
  });

  test('should return false if value = undefined', () => {
    expect(isTrue(undefined)).toBe(false);
  });

  test('should return true if value = `true`', () => {
    expect(isTrue('true')).toBe(true);
  });
});
