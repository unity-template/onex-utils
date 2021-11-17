import { validate } from '../../src/index';

const { AttributeDescriptor, validateInterfaceData } = validate;

class ServiceDTO {
  @AttributeDescriptor.prefix('pre-')
  bizCode: string;
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
