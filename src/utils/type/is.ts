const toStr = Object.prototype.toString;

const IsNumber = {
    /**
     * 判断是不是number类型
     *
     * @example
     * ```ts
     * import { type } from 'onex-utils';
     *
     * const { is } = type;
     *
     * expect(is.number(1)).toBe(true)
     * ```
     */
    number(value: any): value is Number {
        return toStr.call(value) === '[object Number]';
    },
};

const IsFunction = {
    /**
     * 判断是不是function类型
     *
     * @example
     * ```ts
     * import { type } from 'onex-utils';
     *
     * const { is } = type;
     *
     * expect(is.fun(() => {})).toBe(true)
     * ```
     */
    fun(value: any): value is Function {
        const str = toStr.call(value);
        return (
            str === '[object Function]' ||
            str === '[object GeneratorFunction]' ||
            str === '[object AsyncFunction]'
        );
    },

    /**
     * 判断是不是function类型
     *
     * @example
     * ```ts
     * import { type } from 'onex-utils';
     *
     * const { is } = type;
     *
     * expect(is.function(() => {})).toBe(true)
     * ```
     */
    function(value: any): value is Function {
        return this.fun(value);
    },
};

const IsError = {
    /**
     * 判断是不是error类型
     *
     * @example
     * ```ts
     * import { type } from 'onex-utils';
     *
     * const { is } = type;
     *
     * expect(is.error(new Error())).toBe(true)
     * ```
     */
    error(value: any): value is Error {
        return toStr.call(value) === '[object Error]';
    },
};

const IsBoolean = {
    /**
     * 判断是不是bool类型
     *
     * @remarks
     * 1. 只能判断是否是bool值，不能判断是否是true或者false
     * 2. 不针对类型进行转化，只判断是否boolean类型
     *
     * @example
     * ```ts
     * import { type } from 'onex-utils';
     *
     * const { is } = type;
     *
     * expect(is.bool(false)).toBe(true)
     * ```
     */
    bool(value: any): value is boolean {
        return toStr.call(value) === '[object Boolean]';
    },

    /**
     * 判断是不是bool类型
     *
     * @remarks
     * 1. 只能判断是否是bool值，不能判断是否是true或者false
     * 2. 不针对类型进行转化，只判断是否boolean类型
     *
     * @example
     * ```ts
     * import { type } from 'onex-utils';
     *
     * const { is } = type;
     *
     * expect(is.boolean(false)).toBe(true)
     * ```
     */
    boolean(value: any): value is boolean {
        return this.bool(value);
    },

    /**
     * 判断是不是bool类型，并且对应的值是false
     *
     * @remarks
     * 1. 如果判断不是bool值，返回false
     * 2. 如果是bool，在判断是否是具体的false值
     *
     * @example
     * ```ts
     * import { type } from 'onex-utils';
     *
     * const { is } = type;
     *
     * expect(is.false(false)).toBe(true)
     * expect(is.false(true)).toBe(false)
     * ```
     */
    false(value: any): value is boolean {
        return this.bool(value) && !Number(value);
    },

    /**
     * 判断是不是bool类型，并且对应的值是false
     *
     * @remarks
     * 1. 如果判断不是bool值，返回false
     * 2. 如果是bool，在判断是否是具体的true值
     *
     * @example
     * ```ts
     * import { type } from 'onex-utils';
     *
     * const { is } = type;
     *
     * expect(is.true(false)).toBe(false)
     * expect(is.true(true)).toBe(true)
     * ```
     */
    true(value: any): value is boolean {
        return this.bool(value) && Boolean(Number(value));
    },
};

const IsObject = {
    /**
     * 判断是不是对象类型
     *
     * @example
     * ```ts
     * import { type } from 'onex-utils';
     *
     * const { is } = type;
     *
     * expect(is.object({})).toBe(true);
     * expect(is.object([])).toBe(false);
     * ```
     */
    object(value: any): value is object {
        return toStr.call(value) === '[object Object]';
    },
};

const IsArray = {
    /**
     * 判断是不是数组类型
     *
     * @example
     * ```ts
     * import { type } from 'onex-utils';
     *
     * const { is } = type;
     *
     * expect(is.array([])).toBe(true);
     * expect(is.array({})).toBe(false);
     * ```
     */
    array(value: any): value is [] {
        if (Array.isArray) {
            return Array.isArray(value);
        }
        return toStr.call(value) === '[object Array]';
    },
};

export const is = {
    ...IsNumber,
    ...IsFunction,
    ...IsError,
    ...IsBoolean,
    ...IsObject,
    ...IsArray,
};
