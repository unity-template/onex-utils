import * as Joi from 'joi';
import { createJoiSchemaRules, isSchema, RuleOptions } from './common/schema';
import { RULES_KEY } from './common/key';
import {
  attachClassMetadata,
  getClassMetadata,
  getPropertyType,
  saveClassMetadata,
} from './common/metadata';

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
 *
 * @Rule(UserDTO)
 * class EmployeeUserDto extends UserDto {
 *    @Rule(RuleType.string().required())
 *    post: string;
 * }
 * ```
 */
export function Rule(
  rule: Joi.Schema | { new (): unknown },
  options: RuleOptions = initOptions,
) {
  return function (...args) {
    if (args[1]) {
      // 类属性装饰器
      const [target, propertyKey] = args;
      const schemaRule = isSchema(rule)
        ? rule
        : createJoiSchemaRules(
          getClassMetadata(RULES_KEY, rule),
          options,
          getPropertyType(target, propertyKey).name === 'Array',
        );
      attachClassMetadata(
        RULES_KEY,
        schemaRule,
        target,
        propertyKey.toString(),
      );
    } else {
      // 类装饰器
      const parentRules = getClassMetadata(RULES_KEY, rule) ?? {};
      const childRules = getClassMetadata(RULES_KEY, args[0]) ?? {};
      if (Object.keys(parentRules).length > 0) {
        const allClassRule = {
          ...parentRules,
          ...childRules,
        };
        saveClassMetadata(RULES_KEY, allClassRule, args[0]);
      }
    }
  };
}

export { Joi as RuleType };
