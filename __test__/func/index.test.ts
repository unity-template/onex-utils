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


describe('fun curry utils', () => {
    test('should return curry function', () => {
        const testFun = (a: number, b: number) => [a, b];
        expect(func.curry(testFun)(1)(2)()).toEqual([1, 2]);
    });

    test('should return curryRight function', () => {
        const testFun = (a: number, b: number) => [a, b];
        expect(func.curryRight(testFun)(1)(2)()).toEqual([2, 1]);
    });

    test('should return unCurry function', () => {
        const testArr = [];
        func.unCurry(Array.prototype.push)(testArr, 1, 2);
        expect(testArr).toEqual([1, 2]);
    });
});

describe('func utils uuid', () => {
    test('should return random uuid', () => {
        const testId = func.uuid();
        expect(testId.length).toEqual(36);
    });
});


describe('func utils hash', () => {
    test('should return object hash', () => {
        const testId = func.hash({ foo: 'bar' });
        expect(testId).toEqual('a75c05bdca7d704bdfcd761913e5a4e4636e956b');
    });
});

