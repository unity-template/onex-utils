/**
 * @remarks
 * 过滤 DTO 中的 函数 属性
 */
type FilterDtoFunction<P> = {
  [K in keyof P]: P[K] extends Function ? never : P[K];
};

/**
 * @remarks
 * 过滤 DTO 中的 never 属性
 */
type FilterDtoNever<T extends {}> = Pick<
T,
{ [K in keyof T]: T[K] extends never ? never : K }[keyof T]
>;

/**
 * @remarks
 * 当 DTO 作为组件的 Props，过滤 DTO 中函数方法
 */
export type FilterFunction<T> = FilterDtoNever<FilterDtoFunction<T>>;
