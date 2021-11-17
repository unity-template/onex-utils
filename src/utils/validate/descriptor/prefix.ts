/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import { decorate } from '../common/decorate';

type options = [prefix: string | symbol];
const handleDescriptor = (target, key, descriptor, [prefix]: options) => {
  const INull = Symbol('null');
  let value: string | symbol = INull;

  return {
    ...descriptor,
    get() {
      if (value === INull) return undefined;
      return prefix
        ? `${prefix.toString()}${value.toString()}`
        : value.toString();
    },
    set(v: string) {
      value = v;
    },
  };
};

export const prefix = (...args) => {
  return decorate(handleDescriptor, args);
};
