import { decorate } from '../../common/decorate';

type options = [prefix: string | symbol];
const handleDescriptor = (target, key, descriptor, [prefix]: options) => {
  const INull = Symbol('null');
  let value: string | symbol = INull;

  const get: PropertyDescriptor['get'] = () => {
    if (value === INull) return undefined;
    return prefix
      ? `${prefix.toString()}${value.toString()}`
      : value.toString();
  };

  const set: PropertyDescriptor['set'] = (v: string) => {
    value = v;
  };

  return {
    ...descriptor,
    get,
    set,
  };
};

export const prefix = (...args) => {
  return decorate(handleDescriptor, args);
};
