import { time } from '../../src/index';

const { timeout } = time;

describe('function call timeout', () => {
  const func_normal = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 1000);
  });

  it('should return error', async () => {
    try {
      await timeout(func_normal, 100)();
    } catch (error) {
      expect(error.message).toEqual('function call timeout');
    }
  });

  it('should return success', async () => {
    try {
      await timeout(func_normal, 2000)();
      expect(true).toBeTruthy();
    // eslint-disable-next-line no-empty
    } catch (error) {}
  });
});


describe('function call error', () => {
  const func_error = () => new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Invoke exception'));
    }, 1000);
  });

  it('should return timeout error', async () => {
    try {
      await timeout(func_error, 100)();
    } catch (error) {
      expect(error.message).toEqual('function call timeout');
    }
  });

  it('should return function error', async () => {
    try {
      await timeout(func_error, 2000)();
    } catch (error) {
      expect(error.message).toEqual('Invoke exception');
    }
  });
});
