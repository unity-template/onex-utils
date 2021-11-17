import { getClassExtendedMetadata, getMethodParamTypes } from './utils';
import { plainToClass } from 'class-transformer';
import * as Joi from 'joi';
import { RULES_KEY } from './key';

export function Validate(isTransform = true) {
  return function (
    target,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const origin = descriptor.value;
    const paramTypes = getMethodParamTypes(target, propertyKey);

    // eslint-disable-next-line no-param-reassign
    descriptor.value = function (...args: any[]) {
      for (let i = 0; i < paramTypes.length; i++) {
        const item = paramTypes[i];
        const rules = getClassExtendedMetadata(RULES_KEY, item);
        if (rules) {
          const schema = Joi.object(rules);
          const result = schema.validate(args[i]);
          if (result.error) {
            throw result.error;
          } else {
            args[i] = result.value;
          }
          // passed
          if (isTransform) {
            args[i] = plainToClass(item, args[i]);
          }
        }
      }
      return origin.call(this, ...args);
    };
  };
}
