import Joi from 'joi';
import { JsonObject } from 'type-fest';
import { plainToClass } from 'class-transformer';

function validateDataRules(rules: Joi.Schema, value: JsonObject) {
  const schema = Joi.object(rules);
  const result = schema.validate(value);
  return result;
}

function transformDataToClass<T>(dto: { new (): T }, value: JsonObject) {
  return plainToClass(dto, value) as T;
}

interface Option {
  dto: { new (): unknown };
  rules: Joi.Schema;
  value: JsonObject;
}

export function validateAndTranslate(options: Option) {
  // 针对类型进行校验
  const result = validateDataRules(options.rules, options.value);
  // 针对类型进行转化
  result.value = transformDataToClass(options.dto, result.value);
  return result;
}
