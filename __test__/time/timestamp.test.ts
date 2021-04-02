import { time } from '../../src/index';

const { getTimeStamp, TimeStampType } = time;

describe('get time stamp', () => {
  test('should return `TimeStampType.second`', () => {
    expect(getTimeStamp(TimeStampType.second).toString().length).toEqual(10);
  });

  test('should return `TimeStampType.millisecond`', () => {
    expect.assertions(2);
    expect(getTimeStamp().toString().length).toEqual(13);
    expect(getTimeStamp(TimeStampType.millisecond).toString().length).toEqual(13);
  });
});

