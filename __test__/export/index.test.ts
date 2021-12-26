import utils, { func } from '../../src/index';

describe('test export way', () => {
    test('should return equal', () => {
        expect(utils.func).toEqual(func);
    });
});
