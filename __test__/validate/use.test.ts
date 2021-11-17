import { validate } from '../../src/index';

const { Rule, RuleType, validateInterfaceData } = validate;

class ServiceDTO {
  @Rule(RuleType.string().required())
  bizCode: string;

  @Rule(RuleType.string().required())
  bizName: string;

  @Rule(RuleType.number())
  note?: string;
}

describe('validate interface Data', () => {
  test('should transform service data', () => {
    expect(validateInterfaceData(ServiceDTO)({
      bizCode: '你好',
      bizName: '阿里',
      note: '213',
    }).note).toEqual(213);
  });
});
