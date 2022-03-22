import { time } from '../../src/index';

const { setRAFInterval, cancelRAFInterval: cancelRequestInterval } = time;

describe('RequestInterval', () => {
    jest.useFakeTimers('modern');
    test('setRequestInterval, cancelRequestInterval should be defined', () => {
        expect(setRAFInterval).toBeDefined();
        expect(cancelRequestInterval).toBeDefined();
    });
    test('should do nothing with undefined callback', () => {
        // @ts-ignore
        const id = setRAFInterval(undefined, 100);
        expect(typeof id.id).toEqual(typeof 1);
        cancelRequestInterval(id);
    });
    test('should work when delay is undefined', () => {
        const callback = jest.fn();
        const id = setRAFInterval(callback);
        expect(callback).not.toBeCalled();
        jest.advanceTimersByTime(50);
        expect(callback).toHaveBeenCalled();
        cancelRequestInterval(id);
    });
    test('should not call until time is up', () => {
        const callback = jest.fn();
        const id = setRAFInterval(callback, 100);
        expect(callback).not.toBeCalled();
        jest.advanceTimersByTime(200);
        expect(callback).toHaveBeenCalledTimes(1);
        cancelRequestInterval(id);
    });
    test('should call 3 times', () => {
        const callback = jest.fn();
        const id = setRAFInterval(callback, 100);
        expect(callback).not.toBeCalled();
        jest.advanceTimersByTime(350);
        expect(callback).toHaveBeenCalledTimes(3);
        cancelRequestInterval(id);
    });
    test('cancelRequestInterval should work', () => {
        const callback = jest.fn();
        const id = setRAFInterval(callback, 100);
        jest.advanceTimersByTime(150);
        expect(callback).toHaveBeenCalledTimes(1);
        cancelRequestInterval(id);
        jest.advanceTimersByTime(200);
        expect(callback).toHaveBeenCalledTimes(1);
    });
});
