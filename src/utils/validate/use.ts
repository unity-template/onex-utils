import { plainToClass } from 'class-transformer';
import Joi from 'joi';
import { getClassExtendedMetadata, getMethodParamTypes } from './common/metadata';
import { RULES_KEY } from './common/key';

/**
 * 组件的装饰器使用方式
 *
 * @example 基础使用方式
 * ```ts
 *   export class DataDto {
 *     @Rule(RuleType.string().required())
 *     @addPre('test') // 添加前缀
 *     bizCode: string;
 *
 *    @Rule(RuleType.string().required())
 *     @addPre('test') // 添加前缀
 *     bizName: string;
 *
 *    @Rule(RuleType.number())
 *     @addAlarm // 报警装饰
 *     note?: string;
 *   }
 *
 *  @ValidateComponentProps(DataDto)
 *   class Node extends Component<DataDto> {
 *     IRender() {
 *       console.log(this.props.bizCode, this.props.bizName, this.props.note);
 *     }
 *   }
 *  \/**
 *  new Node({
 *     bizCode: '你好',
 *     bizName: '世界',
 *   }).IRender();
 *   *\/
 *    * output:
 *    * Debugger attached.
 *    * DataDto.note: 参数告警
 *    * test-你好 test-世界 undefined
 *```
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
 *   export class DataDto {
 *     @Rule(RuleType.string().required())
 *     @addPre('test') // 添加前缀
 *     bizCode: string;
 *
 *    @Rule(RuleType.string().required())
 *     @addPre('test') // 添加前缀
 *     bizName: string;
 *
 *    @Rule(RuleType.number())
 *     @addAlarm // 报警装饰
 *     note?: string;
 *   }
 *
 *  const result = validateInterfaceData(DataDto)({
 *     bizCode: '你好',
 *     bizName: '世界',
 *     note: '213',
 *   });
 *
 *  console.log(result.bizCode, result.bizCode, result.note);
 *   // console.log test-你好 test-你好 213
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
    return plainToClass(ClassFto, data);
  };
}

/**
 * 通过HOC的方式检验组件服务端数据
 * @example 基础使用方式
 * ```ts
 *    export class DataDto {
 *      @Rule(RuleType.string().required())
 *      @addPre('test') // 添加前缀
 *      bizCode: string;
 *
 *      @Rule(RuleType.string().required())
 *      @addPre('test') // 添加前缀
 *      bizName: string;
 *
 *      @Rule(RuleType.number())
 *      @addAlarm // 报警装饰
 *      note?: string;
 *    }
 *
 *    class Node extends Component<DataDto> {
 *      IRender() {
 *        console.log(this.props.bizCode, this.props.bizName, this.props.note);
 *      }
 *    }
 *
 *    const INode = ValidateComponentPropsHoc(DataDto)(Node)
 *
 *    new INode({
 *      bizCode: '你好',
 *      bizName: '世界',
 *    }).IRender();
 *    \/**
 *     * output:
 *     * Debugger attached.
 *     * DataDto.note: 参数告警
 *     * test-你好 test-世界 undefined
 *    *\/
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


export function Validate(isTransform = true) {
  return function (
    target,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const origin = descriptor.value;
    const paramTypes = getMethodParamTypes(target, propertyKey);

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
