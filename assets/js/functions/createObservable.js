export function createObservable() {
  return {
    subscribers: [],
    subscribe(cb) {
      this.subscribers.push(cb);
      return () => {
        this.unsubscribe(cb);
      };
    },
    unsubscribe(cb) {
      this.subscribers = this.subscribers.filter((item) => item != cb);
    },
    broadcast(data) {
      for (let i = 0; i < this.subscribers.length; i++) {
        this.subscribers[i](data);
      }
    },
  };
}
