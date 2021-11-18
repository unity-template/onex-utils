/* eslint-disable @iceworks/best-practices/recommend-polyfill */
/* eslint-disable no-redeclare */
import * as Joi from 'joi';
import {
  attachClassMetadata,
  getClassMetadata,
  getPropertyType,
  saveClassMetadata,
} from './common/metadata';
import { RULES_KEY } from './common/key';
import { RuleOptions, createJoiSchemaRules, isSchema } from './common/schema';


const initOptions: RuleOptions = {
  required: true,
};

/**
 * 为DTO对象添加规则的装饰器
 *
 * @example 装饰器属性
 * ```ts
 *  class UserDTO {
 *    @Rule(RuleType.number().max(10))
 *    age: number;
 *  }
 * ```
 *
 * @example 针对extends进行装饰
 * ```ts
 *   class TO {}
 *
 *   @Rule(TO)
 *   class UserDTO extends TO {
 *     @Rule(RuleType.number().max(10))
 *     age: number;
 *   }
 * ```
 *
 * @example 属性类装饰
 * ```ts
 *  class WorldDTO {
 *    @Rule(RuleType.number().max(20))
 *    age: number;
 *  }
 *
 *  class UserDTO {
 *    @Rule(RuleType.number().max(10))
 *    age: number;
 *
 *    @Rule(WorldDTO)
 *    world: WorldDTO;
 *  }
 * ```
 */
export function Rule(rule: Joi.Schema | Function, options: RuleOptions = initOptions) {
  return function (...args) {
    if (args[1]) {
      const [target, propertyKey] = args;
      const schemaRule = isSchema(rule) ? rule : createJoiSchemaRules(
        getClassMetadata(RULES_KEY, rule),
        options,
        getPropertyType(target, propertyKey).name === 'Array',
      );
      attachClassMetadata(RULES_KEY, schemaRule, target, propertyKey.toString());
    } else {
      // 类装饰器
      const rules = getClassMetadata(RULES_KEY, rule);
      if (rules) {
        const currentRule = getClassMetadata(RULES_KEY, args[0]) ?? {};
        Object.keys(rules).forEach((item) => {
          if (!currentRule[item]) {
            currentRule[item] = rules[item];
          }
        });
        saveClassMetadata(RULES_KEY, currentRule, args[0]);
      }
    }
  };
}

export { Joi as RuleType };
