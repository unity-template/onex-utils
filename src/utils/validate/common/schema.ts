import Joi, * as joi from 'joi';

export interface RuleOptions {
  name?: string;
  required?: boolean;
  min?: number;
  max?: number;
}

export const createJoiSchemaRules = (
  alreadyRules: Joi.Schema,
  options: RuleOptions,
  isArray: boolean,
): Joi.Schema => {
  const objectRule = joi.object(alreadyRules).meta({ id: options.name });
  let arrayRule!: Joi.ArraySchema;
  if (isArray) {
    arrayRule = joi.array().items(objectRule);
    if (options.min) {
      arrayRule = arrayRule.min(options.min);
    }
    if (options.max) {
      arrayRule = arrayRule.max(options.max);
    }
  }
  if (options.required) {
    if (isArray) {
      arrayRule.required();
    } else {
      objectRule.required();
    }
  }
  return isArray ? arrayRule : objectRule;
};

export function isSchema(rule: joi.Schema | Function): rule is Joi.Schema {
  return joi.isSchema(rule);
}
