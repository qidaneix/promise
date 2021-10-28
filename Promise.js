// class Promise {
//   constructor(fn) {
//     this.value;
//     this.state = "pending";
//     this.callbacks = [];
//     fn(this._resolve.bind(this), this._reject.bind(this));
//   }

//   then(resolvedCb, rejectCb) {
//     return new Promise((resolve, reject) => {
//       this._handle({
//         resolvedCb,
//         rejectCb,
//         resolve,
//         reject,
//       });
//     });
//   }

//   _handle(item) {
//     if (this.state === "pending") {
//       this.callbacks.push(item);
//       return;
//     }
//     if (this.state === "fulfilled") {
//       if (!item.resolvedCb) return item.resolve(this.value);
//       const ret = item.resolveCb(this.value);
//       return item.resolve(ret);
//     }
//     // if
//   }

//   _resolve(value) {
//     this.value = value;
//     this.state = "fulfilled";
//     this.callbacks.forEach((item) => {
//       this._handle(item);
//     });
//   }

//   _reject(error) {
//     this.value = error;
//     this.state = "rejected";
//     this.callbacks.forEach((item) => {
//       this._handle(item);
//     });
//   }
// }

class Promise {
  constructor(fn) {
    this.state = "pending";
    this.value;
    this.callbacks = [];

    fn(this._resolve.bind(this), this._reject.bind(this));
  }

  then(resolvedCb, rejectedCb) {
    return new Promise((resolve, reject) => {
      this._handle({
        resolvedCb,
        resolve,
        rejectedCb,
        reject,
      });
    });
  }

  catch(cb) {
    return this.then(undefined, cb);
  }

  // finally(cb) {
  //   return this.then(
  //     () => {},
  //     () => {}
  //   );
  // }

  _handle(callback) {
    if (this.state === "pending") {
      this.callbacks.push(callback);
      return;
    }
    const cb =
      this.state === "fulfilled" ? callback.resolvedCb : callback.rejectedCb;
    const r = this.state === "fulfilled" ? callback.resolve : callback.reject;
    if (!cb) r(this.value);
    else {
      const ret = cb(this.value);
      r(ret);
    }
  }

  _resolve(value) {
    this.value = value;
    this.state = "fulfilled";
    this.callbacks.forEach((callback) => {
      this._handle(callback);
    });
  }
  _reject(error) {
    this.value = error;
    this.state = "rejected";
  }
}
