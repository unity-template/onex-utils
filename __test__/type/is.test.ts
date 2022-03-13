import { type } from '../../src/index';

const { is } = type;

describe('test is number', () => {
    it('should return true', () => {
        expect(is.number(1)).toBe(true);
    });

    it('should return false', () => {
        expect(is.number('1')).toBe(false);
    });
});


describe('test is function', () => {
    it('should return true', () => {
        expect.assertions(2);
        expect(is.function(() => {})).toBe(true);
        expect(is.fun(() => {})).toBe(true);
    });

    it('should return false', () => {
        expect.assertions(2);
        expect(is.function(1)).toBe(false);
        expect(is.fun(1)).toBe(false);
    });
});

describe('test is error', () => {
    it('should return true', () => {
        expect.assertions(2);
        expect(is.error(new Error())).toBe(true);
        expect(is.error(new TypeError())).toBe(true);
    });

    it('should return false', () => {
        expect.assertions(2);
        expect(is.error(1)).toBe(false);
        expect(is.error('1')).toBe(false);
    });
});

describe('test is boolean', () => {
    it('should return true', () => {
        expect.assertions(4);
        expect(is.boolean(true)).toBe(true);
        expect(is.boolean(false)).toBe(true);
        expect(is.bool(true)).toBe(true);
        expect(is.bool(false)).toBe(true);
    });

    it('should return false', () => {
        expect.assertions(2);
        expect(is.boolean(1)).toBe(false);
        expect(is.boolean('1')).toBe(false);
    });

    it('should return false when use is.false', () => {
        expect.assertions(2);
        expect(is.false(true)).toBe(false);
        expect(is.false(false)).toBe(true);
    });

    it('should return false when use is.true', () => {
        expect.assertions(2);
        expect(is.true(true)).toBe(true);
        expect(is.true(false)).toBe(false);
    });
});


describe('test is object', () => {
    it('should return true', () => {
        expect.assertions(2);
        expect(is.object({})).toBe(true);
        expect(is.object([])).toBe(false);
    });

    it('should return false', () => {
        expect.assertions(2);
        expect(is.object(1)).toBe(false);
        expect(is.object('1')).toBe(false);
    });
});

describe('test is array', () => {
    it('should return true', () => {
        expect(is.array([])).toBe(true);
    });

    it('should return false', () => {
        expect(is.array({})).toBe(false);
    });
});


describe('test is error', () => {
    it('should return true', () => {
        expect(is.error(new Error())).toBe(true);
    });
});
