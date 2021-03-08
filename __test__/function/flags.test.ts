import { func } from '../../src/index';
import ts from 'typescript';


describe('func flag utils', () => {
  test('should return all flags', () => {
    const allFlags = [ts.SymbolFlags.Property, ts.SymbolFlags.EnumMember];
    expect(func.getEnumFlags(
      ts.SymbolFlags.Property | ts.SymbolFlags.EnumMember,
    )).toEqual(allFlags);
  });

  test('should return remove flag', () => {
    expect(func.removeFlag(ts.SymbolFlags.Enum | ts.SymbolFlags.Alias, ts.SymbolFlags.Alias)).toBe(ts.SymbolFlags.Enum);
  });

  test('should return remove all flag', () => {
    expect(func.removeFlag(
      ts.SymbolFlags.Enum | ts.SymbolFlags.Alias | ts.SymbolFlags.Class,
      ts.SymbolFlags.Alias | ts.SymbolFlags.Class,
    )).toBe(ts.SymbolFlags.Enum);
  });

  test('should return hasAllFlags boolean', () => {
    expect(func.hasAllFlags(
      ts.SymbolFlags.Enum | ts.SymbolFlags.Alias,
      ts.SymbolFlags.Enum | ts.SymbolFlags.Alias,
    )).toBe(true);
  });

  test('should return hasAnyFlag boolean', () => {
    expect(func.hasAnyFlag(
      ts.SymbolFlags.EnumMember | ts.SymbolFlags.Class,
      ts.SymbolFlags.EnumMember | ts.SymbolFlags.Property,
    )).toBe(true);
  });
});
