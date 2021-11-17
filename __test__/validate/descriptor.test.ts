import { validate } from '../../src/index';

const { Attribute, validateInterfaceData } = validate;

class ServiceDTO {
  @Attribute.prefix('pre-')
  bizCode: string;
  bizName: string;
  note?: string;
}

describe('test decorator utils', () => {
  it('should return time', () => {
    const data = validateInterfaceData(ServiceDTO)({
      bizCode: '你好',
      bizName: '阿里',
      note: '123',
    });
    expect(data.bizCode).toEqual('pre-你好');
  });
});
