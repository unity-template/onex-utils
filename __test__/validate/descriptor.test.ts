import * as validate from '../../src/utils/validate';

const { AttributeDecorator, validateInterfaceData } = validate;


describe('test decorator utils', () => {
    it('should return pre when prefix params is exist', () => {
        class ServiceDTO {
            @AttributeDecorator.prefix('pre-')
            bizCode: string;
        }
        const data = validateInterfaceData(ServiceDTO)({ bizCode: '你好' });
        expect(data.bizCode).toEqual('pre-你好');
    });

    it('should return pre when prefix params is not exist', () => {
        class ServiceDTO {
            @AttributeDecorator.prefix()
            bizCode: string;
        }
        const data = validateInterfaceData(ServiceDTO)({ bizCode: '你好' });
        expect(data.bizCode).toEqual('你好');
    });

    it('should return pre when prefix params is symbol', () => {
        class ServiceDTO {
            @AttributeDecorator.prefix(Symbol('null'))
            bizCode: string;
        }
        const data = validateInterfaceData(ServiceDTO)({ bizCode: '你好' });
        expect(data.bizCode).toEqual('Symbol(null)你好');
    });
});
