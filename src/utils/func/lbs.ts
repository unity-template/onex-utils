const EARTH_RADIUS = 6378137.0;
const { PI } = Math;

function isNoDefined(value): boolean {
  return value === null || value === undefined;
}

interface GetDistance {
  (lat1: number, lng1: number, lat2: number, lng2: number): number;
}

function getRad(d: number) {
  return (d * PI) / 180.0;
}

/**
 * 默认地球是一个球面，计算两点之间的距离
 * @param lat1 - 纬度
 * @param lng1 - 经度
 * @param lat2 - 纬度
 * @param lng2 - 经度
 * @returns 距离，单位是m
 */
export const getGreatCircleLbsDistance: GetDistance = (
  lat1,
  lng1,
  lat2,
  lng2,
) => {
  const radLat1 = getRad(lat1);
  const radLat2 = getRad(lat2);

  const a = radLat1 - radLat2;
  const b = getRad(lng1) - getRad(lng2);

  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2),
      ),
    );
  s *= EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000.0;

  return s;
};

/**
 * 默认地球是一个椭圆形，计算两点之间的距离
 *
 * @remarks 相较于球面更加精确
 *
 * @param lat1 - 纬度
 * @param lng1 - 经度
 * @param lat2 - 纬度
 * @param lng2 - 经度
 * @returns 椭圆形球面之间的距离
 */
export const getFlatterCircleDistance: GetDistance = (
  lat1,
  lng1,
  lat2,
  lng2,
) => {
  const f = getRad((lat1 + lat2) / 2);
  const g = getRad((lat1 - lat2) / 2);
  const l = getRad((lng1 - lng2) / 2);

  let sg = Math.sin(g);
  let sl = Math.sin(l);
  let sf = Math.sin(f);

  sg *= sg;
  sl *= sl;
  sf *= sf;

  const a = EARTH_RADIUS;
  const fl = 1 / 298.257;

  const s = sg * (1 - sl) + (1 - sf) * sl;
  const c = (1 - sg) * (1 - sl) + sf * sl;
  const w = Math.atan(Math.sqrt(s / c));
  const r = Math.sqrt(s * c) / w;
  const d = 2 * w * a;
  const h1 = (3 * r - 1) / 2 / c;
  const h2 = (3 * r + 1) / 2 / s;

  return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
};

export enum Shape {
  GreatCircle = 'GreatCircle',
  Flatter = 'Flatter',
}

/**
 * 获取LBS两点之间的距离
 *
 * @param lat1 - 纬度
 * @param lng1 - 经度
 * @param lat2 - 纬度
 * @param lng2 - 经度
 * @param shapeType - 地球类型 球面：{@link Shape.GreatCircle} 椭球面：{@link Shape.Flatter}
 * @returns 两点之间的距离
 */
export const getDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  shapeType: Shape = Shape.GreatCircle,
): number => {
  if (
    isNoDefined(lat1) ||
    isNoDefined(lng1) ||
    isNoDefined(lat2) ||
    isNoDefined(lng2)
  ) {
    throw new Error('参数出错');
  }
  if (shapeType === Shape.GreatCircle) {
    return getGreatCircleLbsDistance(lat1, lng1, lat2, lng2);
  }
  return getFlatterCircleDistance(lat1, lng1, lat2, lng2);
};
