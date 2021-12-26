import { func } from '../../src/index';

const { getDistance, Shape } = func;

describe('test getDistance', () => {
    it('should get distance', () => {
        expect.assertions(2);
        const distance1 = getDistance(121.43146, 29.739867, 121.431514, 29.739751);
        const distance2 = getDistance(121.43146, 29.739867, 121.431514, 29.739751, Shape.Flatter);
        expect(distance1).toEqual(9.0266);
        expect(distance2).toEqual(9.041382221269426);
    });

    it('should throw error', () => {
        try {
            getDistance(121.43146, 29.739867, 121.431514, null as unknown as any, Shape.Flatter);
        } catch (err) {
            expect(err.message).toEqual('参数出错');
        }
    });
});
