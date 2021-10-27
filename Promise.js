class Promise {
  constructor(fn) {
    this.value;
    this.state = "pending";
    this.callbacks = [];
    fn(this._resolve.bind(this), this._reject.bind(this));
  }

  then(resolvedCb, rejectCb) {
    return new Promise((resolve, reject) => {
      this._handle({
        resolvedCb,
        rejectCb,
        resolve,
        reject,
      });
    });
  }

  _handle(item) {
    if (this.state === "pending") {
      this.callbacks.push(item);
      return;
    }
    if (this.state === "fulfilled") {
      if (!item.resolvedCb) return item.resolve(this.value);
      const ret = item.resolveCb(this.value);
      return item.resolve(ret);
    }
    // if
  }

  _resolve(value) {
    this.value = value;
    this.state = "fulfilled";
    this.callbacks.forEach((item) => {
      this._handle(item);
    });
  }

  _reject(error) {
    this.value = error;
    this.state = "rejected";
    this.callbacks.forEach((item) => {
      this._handle(item);
    });
  }
}
