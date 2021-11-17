import { validate } from '../../src/index';

const { AttributeDescriptor, validateInterfaceData } = validate;


describe('test decorator utils', () => {
  it('should return pre when prefix params is exist', () => {
    class ServiceDTO {
      @AttributeDescriptor.prefix('pre-')
      bizCode: string;
    }
    const data = validateInterfaceData(ServiceDTO)({ bizCode: '你好' });
    expect(data.bizCode).toEqual('pre-你好');
  });

  it('should return pre when prefix params is not exist', () => {
    class ServiceDTO {
      @AttributeDescriptor.prefix()
      bizCode: string;
    }
    const data = validateInterfaceData(ServiceDTO)({ bizCode: '你好' });
    expect(data.bizCode).toEqual('你好');
  });

  it('should return pre when prefix params is symbol', () => {
    class ServiceDTO {
      @AttributeDescriptor.prefix(Symbol('null'))
      bizCode: string;
    }
    const data = validateInterfaceData(ServiceDTO)({ bizCode: '你好' });
    expect(data.bizCode).toEqual('Symbol(null)你好');
  });
});
