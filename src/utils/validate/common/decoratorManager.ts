import 'reflect-metadata';

export type DecoratorKey = string | symbol;
export const INJECT_CLASS_KEY_PREFIX = 'INJECTION_CLASS_META_DATA';

export class DecoratorManager extends Map {
  static getDecoratorClassKey(decoratorNameKey: DecoratorKey) {
    return `${decoratorNameKey.toString()}_CLS`;
  }

  static removeDecoratorClassKeySuffix(decoratorNameKey: DecoratorKey) {
    return decoratorNameKey.toString().replace('_CLS', '');
  }

  static getDecoratorMethodKey(decoratorNameKey: DecoratorKey) {
    return `${decoratorNameKey.toString()}_METHOD`;
  }

  static getDecoratorClsExtendedKey(decoratorNameKey: DecoratorKey) {
    return `${decoratorNameKey.toString()}_EXT`;
  }

  static getDecoratorClsMethodPrefix(decoratorNameKey: DecoratorKey) {
    return `${decoratorNameKey.toString()}_CLS_METHOD`;
  }

  static getDecoratorClsMethodKey(
    decoratorNameKey: DecoratorKey,
    methodKey: DecoratorKey,
  ) {
    return `${DecoratorManager.getDecoratorClsMethodPrefix(
      decoratorNameKey,
    )}:${methodKey.toString()}`;
  }

  static getDecoratorMethod(
    decoratorNameKey: DecoratorKey,
    methodKey: DecoratorKey,
  ) {
    return `${DecoratorManager.getDecoratorMethodKey(
      decoratorNameKey,
    )}_${methodKey.toString()}`;
  }

  static saveMetadata(
    metaKey: string,
    target: any,
    dataKey: string,
    data: any,
  ) {
    // filter Object.create(null)
    if (typeof target === 'object' && target.constructor) {
      target = target.constructor;
    }

    let m: Map<string, any>;
    if (Reflect.hasOwnMetadata(metaKey, target)) {
      m = Reflect.getMetadata(metaKey, target);
    } else {
      m = new Map<string, any>();
    }

    m.set(dataKey, data);
    Reflect.defineMetadata(metaKey, m, target);
  }

  static attachMetadata(
    metaKey: string,
    target: any,
    dataKey: string,
    data: any,
    groupBy?: string,
  ) {
    // filter Object.create(null)
    if (typeof target === 'object' && target.constructor) {
      target = target.constructor;
    }

    let m: Map<string, any>;
    if (Reflect.hasOwnMetadata(metaKey, target)) {
      m = Reflect.getMetadata(metaKey, target);
    } else {
      m = new Map<string, any>();
    }

    if (!m.has(dataKey)) {
      if (groupBy) {
        m.set(dataKey, {});
      } else {
        m.set(dataKey, []);
      }
    }
    if (groupBy) {
      m.get(dataKey)[groupBy] = data;
    } else {
      m.get(dataKey).push(data);
    }
    Reflect.defineMetadata(metaKey, m, target);
  }

  static getMetadata(metaKey: string, target: any, dataKey?: string) {
    // filter Object.create(null)
    if (typeof target === 'object' && target.constructor) {
      target = target.constructor;
    }

    let m: Map<string, any>;
    if (!Reflect.hasOwnMetadata(metaKey, target)) {
      m = new Map<string, any>();
      Reflect.defineMetadata(metaKey, m, target);
    } else {
      m = Reflect.getMetadata(metaKey, target);
    }
    if (!dataKey) {
      return m;
    }
    return m.get(dataKey);
  }

  /**
   * the key for meta data store in class
   */
  injectClassKeyPrefix = INJECT_CLASS_KEY_PREFIX;
  /**
   * the key for method meta data store in class
   */
  injectClassMethodKeyPrefix = 'INJECTION_CLASS_METHOD_META_DATA';

  /**
   * the key for method meta data store in method
   */
  injectMethodKeyPrefix = 'INJECTION_METHOD_META_DATA';

  saveModule(key, module) {
    if (!this.has(key)) {
      this.set(key, new Set());
    }
    this.get(key).add(module);
  }

  resetModule(key) {
    this.set(key, new Set());
  }

  listModule(key) {
    return Array.from(this.get(key) || {});
  }

  saveMetadata(decoratorNameKey: DecoratorKey, data, target, propertyName?) {
    if (propertyName) {
      const dataKey = DecoratorManager.getDecoratorMethod(
        decoratorNameKey,
        propertyName,
      );
      DecoratorManager.saveMetadata(
        this.injectMethodKeyPrefix,
        target,
        dataKey,
        data,
      );
    } else {
      const dataKey = DecoratorManager.getDecoratorClassKey(decoratorNameKey);
      DecoratorManager.saveMetadata(
        this.injectClassKeyPrefix,
        target,
        dataKey,
        data,
      );
    }
  }

  attachMetadata(
    decoratorNameKey: DecoratorKey,
    data,
    target,
    propertyName?: string,
    groupBy?: string,
  ) {
    if (propertyName) {
      const dataKey = DecoratorManager.getDecoratorMethod(
        decoratorNameKey,
        propertyName,
      );
      DecoratorManager.attachMetadata(
        this.injectMethodKeyPrefix,
        target,
        dataKey,
        data,
        groupBy,
      );
    } else {
      const dataKey = DecoratorManager.getDecoratorClassKey(decoratorNameKey);
      DecoratorManager.attachMetadata(
        this.injectClassKeyPrefix,
        target,
        dataKey,
        data,
        groupBy,
      );
    }
  }

  getMetadata(decoratorNameKey: DecoratorKey, target, propertyName?) {
    if (propertyName) {
      const dataKey = DecoratorManager.getDecoratorMethod(
        decoratorNameKey,
        propertyName,
      );
      return DecoratorManager.getMetadata(
        this.injectMethodKeyPrefix,
        target,
        dataKey,
      );
    } else {
      const dataKey = `${DecoratorManager.getDecoratorClassKey(
        decoratorNameKey,
      )}`;
      return DecoratorManager.getMetadata(
        this.injectClassKeyPrefix,
        target,
        dataKey,
      );
    }
  }

  savePropertyDataToClass(
    decoratorNameKey: DecoratorKey,
    data,
    target,
    propertyName,
  ) {
    const dataKey = DecoratorManager.getDecoratorClsMethodKey(
      decoratorNameKey,
      propertyName,
    );
    DecoratorManager.saveMetadata(
      this.injectClassMethodKeyPrefix,
      target,
      dataKey,
      data,
    );
  }

  attachPropertyDataToClass(
    decoratorNameKey: DecoratorKey,
    data,
    target,
    propertyName,
    groupBy?: string,
  ) {
    const dataKey = DecoratorManager.getDecoratorClsMethodKey(
      decoratorNameKey,
      propertyName,
    );
    DecoratorManager.attachMetadata(
      this.injectClassMethodKeyPrefix,
      target,
      dataKey,
      data,
      groupBy,
    );
  }

  getPropertyDataFromClass(
    decoratorNameKey: DecoratorKey,
    target,
    propertyName,
  ) {
    const dataKey = DecoratorManager.getDecoratorClsMethodKey(
      decoratorNameKey,
      propertyName,
    );
    return DecoratorManager.getMetadata(
      this.injectClassMethodKeyPrefix,
      target,
      dataKey,
    );
  }

  listPropertyDataFromClass(decoratorNameKey: DecoratorKey, target) {
    const originMap = DecoratorManager.getMetadata(
      this.injectClassMethodKeyPrefix,
      target,
    );
    const res = [];
    for (const [key, value] of originMap) {
      if (
        key.indexOf(
          DecoratorManager.getDecoratorClsMethodPrefix(decoratorNameKey),
        ) !== -1
      ) {
        res.push(value);
      }
    }
    return res;
  }
}
