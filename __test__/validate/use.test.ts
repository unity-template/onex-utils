import * as validate from '../../src/utils/validate';

const {
  Rule,
  RuleType,
  validateInterfaceData,
  ValidateAndTransformComponentProps,
  validateComponentPropsHoc,
} = validate;

class Component<P> {
  props!: P;
  constructor(data: P) {
    this.props = data;
  }
}

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
    const IValidate = validateInterfaceData(ServiceDTO);
    const result = IValidate({
      bizCode: '你好',
      bizName: '世界',
      note: '213',
    });
    expect(result.note).toEqual(213);
  });

  test('should validate and translate component props', () => {
    @ValidateAndTransformComponentProps(ServiceDTO)
    class TestComponent extends Component<ServiceDTO> {
      testData = () => this.props;
    }
    const testComponent = new TestComponent({
      bizCode: '你好',
      bizName: '世界',
      note: '213',
    });
    expect(testComponent.testData().note).toEqual(213);
  });

  test('should validate and translate function component props', () => {
    const result = validateComponentPropsHoc(ServiceDTO)((data: ServiceDTO) => data)({
      bizCode: '你好',
      bizName: '世界',
      note: '213',
    });
    expect(result.note).toEqual(213);
  });
});
