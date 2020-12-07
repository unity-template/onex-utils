/**
 * @jest-environment jsdom
 */

import dayjs from 'dayjs';
import { time } from '../../src/index';

const { createDayjs } = time;

describe('time create dayjs', () => {
  test('should return dayjs instance if time is undefined', () => {
    const dayjsInstance = createDayjs();
    expect(dayjs.isDayjs(dayjsInstance)).toBeTruthy();
  });

  test('should return dayjs instance if time is Date instance', () => {
    const dayjsInstance = createDayjs(new Date());
    expect(dayjs.isDayjs(dayjsInstance)).toBeTruthy();
  });

  test('should return dayjs instance if time is a timestamp', () => {
    expect.assertions(4);
    expect(dayjs.isDayjs(createDayjs('1607341332000'))).toBeTruthy();
    expect(dayjs.isDayjs(createDayjs(1607341332000))).toBeTruthy();
    expect(dayjs.isDayjs(createDayjs('1607341332'))).toBeTruthy();
    expect(dayjs.isDayjs(createDayjs(1607341332))).toBeTruthy();
  });

  test('should return dayjs instance if time is a time string', () => {
    expect.assertions(3);
    expect(dayjs.isDayjs(createDayjs('Mon Dec 07 2020 20:00:33 GMT+0800'))).toBeTruthy();
    expect(dayjs.isDayjs(createDayjs('2019-03-06T08:00:00+08:00'))).toBeTruthy();
    expect(dayjs.isDayjs(createDayjs('2019-03-06T00:00:00Z'))).toBeTruthy();
  });
});
