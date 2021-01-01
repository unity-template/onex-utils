export const EventEmitter = class _EventEmitter {
  subs: Record<string, Function[]>;

  constructor() {
    this.subs = {};
  }
  /**
   * 为指定事件注册一个监听器，接受一个事件名称 eventName 和一个回调监听器函数 listener。
   * @param eventName - 事件名称
   * @param listener - 监听器函数
   */
  on(eventName, listener) {
    (this.subs[eventName] || (this.subs[eventName] = [])).push(listener);
  }
  /**
   * 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
   * @param eventName - 事件名称
   * @param listener - 监听器函数
   */
  once(eventName, listener) {
    const listenerCb = (...args) => {
      listener(...args);
      this.off(eventName, listener);
    };
    this.on(eventName, listenerCb);
  }
  /**
   * 触发指定事件的监听器
   * @param eventName - 事件名称
   * @param args - 传入监听器函数的参数
   */
  emit(eventName, ...args) {
    this.subs[eventName] &&
      this.subs[eventName].forEach((listener) => {
        listener(...args);
      });
  }
  /**
   * 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。
   * @param eventName - 事件名称
   * @param listener - 监听器函数
   */
  off(eventName, listener) {
    if (this.subs[eventName]) {
      const index = this.subs[eventName].findIndex((cb) => cb === listener);
      this.subs[eventName].splice(index, 1);
      if (!this.subs[eventName].length) delete this.subs[eventName];
    }
  }
  /**
   * 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。
   * @param eventName - 事件名称
   */
  allOff(eventName) {
    if (eventName && this.subs[eventName]) {
      delete this.subs[eventName];
    } else {
      this.subs = {};
    }
  }
};
