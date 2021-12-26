import { DecoratorManager } from './manager';
import 'reflect-metadata';

export type DecoratorKey = string | symbol;
export const INJECT_CLASS_KEY_PREFIX = 'INJECTION_CLASS_META_DATA';

const manager = new DecoratorManager();

export function getClassExtendedMetadata(
    decoratorNameKey: DecoratorKey,
    target,
) {
    const extKey = DecoratorManager.getDecoratorClsExtendedKey(decoratorNameKey);
    let metadata = manager.getMetadata(extKey, target);
    if (metadata !== undefined) {
        return metadata;
    }
    const father = Reflect.getPrototypeOf(target);
    if (father?.constructor !== Object) {
        metadata = mergeMeta(
            getClassExtendedMetadata(decoratorNameKey, father),
            manager.getMetadata(decoratorNameKey, target),
        );
    }
    manager.saveMetadata(extKey, metadata || null, target);
    return metadata;
}

export function getMethodParamTypes(target, propertyKey: string | symbol) {
    return Reflect.getMetadata('design:paramtypes', target, propertyKey);
}

export function attachClassMetadata(
    decoratorNameKey: DecoratorKey,
    data: any,
    target,
    groupBy?: string,
) {
    return manager.attachMetadata(
        decoratorNameKey,
        data,
        target,
        undefined,
        groupBy,
    );
}

export function getPropertyType(target, propertyKey: string | symbol) {
    return transformTypeFromTSDesign(
        Reflect.getMetadata('design:type', target, propertyKey),
    );
}

export function saveClassMetadata(
    decoratorNameKey: DecoratorKey,
    data,
    target,
) {
    return manager.saveMetadata(decoratorNameKey, data, target);
}

const testKeyMap = new Map<DecoratorKey, Error>();

export function getClassMetadata(decoratorNameKey: DecoratorKey, target) {
    if (testKeyMap.size > 0 && testKeyMap.has(decoratorNameKey)) {
        throw testKeyMap.get(decoratorNameKey);
    }
    return manager.getMetadata(decoratorNameKey, target);
}

function mergeMeta(_target: any, _src: any) {
    let target = _target;
    let src = _src;

    if (!target) {
        target = src;
        src = null;
    }
    if (!target) {
        return null;
    }
    if (Array.isArray(target)) {
        return target.concat(src || []);
    }
    if (typeof target === 'object') {
        return Object.assign({}, target, src);
    }
    throw new Error(`can not merge meta that type of ${typeof target}`);
}

export interface TSDesignType {
  name: string;
  originDesign: any;
  isBaseType: boolean;
}

export function isUndefined(value) {
    return value === undefined;
}

export function isNull(value) {
    return value === null;
}

export function isNullOrUndefined(value) {
    return isUndefined(value) || isNull(value);
}

function transformTypeFromTSDesign(designFn): TSDesignType {
    if (isNullOrUndefined(designFn)) {
        return { name: 'undefined', isBaseType: true, originDesign: designFn };
    }

    switch (designFn.name) {
    case 'String':
        return { name: 'string', isBaseType: true, originDesign: designFn };
    case 'Number':
        return { name: 'number', isBaseType: true, originDesign: designFn };
    case 'Boolean':
        return { name: 'boolean', isBaseType: true, originDesign: designFn };
    case 'Symbol':
        return { name: 'symbol', isBaseType: true, originDesign: designFn };
    case 'Object':
        return { name: 'object', isBaseType: true, originDesign: designFn };
    case 'Function':
        return { name: 'function', isBaseType: true, originDesign: designFn };
    default:
        return {
            name: designFn.name,
            isBaseType: false,
            originDesign: designFn,
        };
    }
}
