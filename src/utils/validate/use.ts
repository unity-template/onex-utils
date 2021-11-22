import Joi from 'joi';
import { JsonObject } from 'type-fest';
import { plainToClass } from 'class-transformer';
import { RULES_KEY } from './common/key';
import {
  getClassExtendedMetadata,
  getMethodParamTypes,
} from './common/metadata';

function validateDataRules(rules: Joi.Schema, value: JsonObject) {
  const schema = Joi.object(rules);
  const result = schema.validate(value);
  if (result.error) {
    console.warn('数据校验：', result.error);
  }
  return result.value;
}

function transformDataToClass<T>(dto: { new (): T }, value: JsonObject) {
  return plainToClass(dto, value) as T;
}

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
 *  new Node({
 *     bizCode: '你好',
 *     bizName: '世界',
 *   }).IRender();
 *   // output:
 *   // Debugger attached.
 *   // DataDto.note: 参数告警
 *   // test-你好 test-世界 undefined
 *```
 */
export function ValidateAndTransformComponentProps(ClassDto) {
  return (IFunction) =>
    class extends IFunction {
      constructor(...args: Parameters<typeof IFunction>) {
        const [componentProps, ...otherArgs] = args;
        const rules = getClassExtendedMetadata(RULES_KEY, ClassDto);
        const newComponentProps = transformDataToClass(
          ClassDto,
          validateDataRules(rules, componentProps as JsonObject),
        );
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
 *  // console.log test-你好 test-你好 213
 * ```
 */
export function validateInterfaceData<T>(ClassFto: { new (): T }) {
  return (data: any): T => {
    const rules = getClassExtendedMetadata(RULES_KEY, ClassFto);
    return transformDataToClass(ClassFto, validateDataRules(rules, data));
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
 *
 *    // output:
 *    // Debugger attached.
 *    // DataDto.note: 参数告警
 *    // test-你好 test-世界 undefined
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

/**
 * 类方法检验
 *
 * @example 基础实例
 * ```ts
 *   class TO {}
 *
 *  @Rule(TO)
 *   class UserDTO extends TO {
 *     @Rule(RuleType.number().max(10))
 *     age: number;
 *   }
 *
 *  @Rule(UserDTO)
 *   class HelloDTO extends UserDTO {
 *   }
 *
 *  class Hello {
 *     @Validate()
 *     school(a, data: HelloDTO) {
 *       return data;
 *     }
 *   }
 *   const user = {
 *     age: 8,
 *   };
 *   const result = new Hello().school(1, user);
 *   expect(result).toEqual(user);
 * ```
 */
export function Validate() {
  return function (
    target,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const origin = descriptor.value;
    const paramTypes = getMethodParamTypes(target, propertyKey);

    // eslint-disable-next-line no-param-reassign
    descriptor.value = function (...args: any[]) {
      const funArgs: unknown[] = [];
      for (let i = 0; i < paramTypes.length; i++) {
        const currentType = paramTypes[i];
        const currentArg = args[i];
        const rules = getClassExtendedMetadata(RULES_KEY, currentType);
        if (rules) {
          const newData = transformDataToClass(
            currentType,
            validateDataRules(rules, currentArg),
          );
          funArgs.push(newData);
          continue;
        }
        funArgs.push(currentArg);
      }
      return origin.call(this, ...funArgs);
    };
  };
}
