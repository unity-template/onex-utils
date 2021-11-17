import { plainToClass } from 'class-transformer';
import Joi from 'joi';
import { getClassExtendedMetadata } from './common/utils';
import { RULES_KEY } from './common/key';

/**
 * 组件的装饰器使用方式
 *
 * @example 基础使用方式
 * ```ts
 *
 * ```
 */
export function ValidateAndTransformComponentProps(ClassFto) {
  return (IFunction) =>
    class extends IFunction {
      constructor(...args: Parameters<typeof IFunction>) {
        const [componentProps, ...otherArgs] = args;
        let newComponentProps = componentProps;
        const rules = getClassExtendedMetadata(RULES_KEY, ClassFto);
        if (rules) {
          const schema = Joi.object(rules);
          const result = schema.validate(componentProps);
          if (result.error) {
            return plainToClass(ClassFto, result.value);
          } else {
            newComponentProps = plainToClass(ClassFto, result.value);
          }
        }
        super(...[newComponentProps, ...otherArgs]);
      }
    } as ReturnType<typeof IFunction>;
}

/**
 * 校验服务端数据的使用方式
 * @example 基础使用方式
 * ```ts
 *
 * ```
 */
export function validateInterfaceData(ClassFto) {
  return (data: typeof ClassFto): typeof ClassFto => {
    const rules = getClassExtendedMetadata(RULES_KEY, ClassFto);
    if (rules) {
      const schema = Joi.object(rules);
      const result = schema.validate(data);
      if (result.error) {
        throw result.error;
      }
      return plainToClass(ClassFto, result.value);
    }
    return data;
  };
}

/**
 * 通过HOC的方式检验组件服务端数据
 * @example 基础使用方式
 * ```ts
 *
 * ```
 */
export function validateComponentPropsHoc(dto) {
  return (Component) => {
    return class extends Component {
      constructor(props: typeof dto) {
        super(validateInterfaceData(dto)(props));
      }
    };
  };
}
