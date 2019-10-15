import MessageStore from "./MessageStore";
import { noop, StatusMessageEnum as Enum } from "../utils";
import { getStoreMessage } from "./storeMessages";

class Store {
  initState = {};
  queuedStates = [];
  timer = null;

  init(cb) {
    this.setState(this.initState, cb);
  }

  get state() {
    return (this.getState || noop)();
  }
  set state(obj) {
    this.queuedStates.push(obj);
    this.timer = setTimeout(() => {
      if (this.queuedStates.length) {
        (this.setState || noop)(Object.assign(...this.queuedStates));
        this.queuedStates = [];
      }
      clearTimeout(this.timer);
    }, 100);
  }

  setStoreMessage(fName) {
    this.storeMessage = getStoreMessage(fName);
  }

  async service(f = noop, args = [], showSuccess = true, showLoading = true) {
    const message = this.storeMessage;
    this.setState({ ...this.state, loading: true, error: null });
    if (showLoading && message) {
      MessageStore.addMessage(message.loading, Enum.INFO);
    }
    try {
      const res = await f(...args);
      console.log("res", res);
      this.setState({ ...this.state, ...res, loading: false, error: null });
      if (showSuccess) {
        MessageStore.addMessage(message.success, Enum.SUCCESS);
      } else {
        MessageStore.deleteMessage();
      }
      return Promise.resolve(res);
    } catch (error) {
      console.log("error", error);
      this.setState({ ...this.state, loading: false, error });
      if (error.reauth) this.getUserState();
      MessageStore.addMessage(error.message, Enum.ERROR);
      return Promise.reject(error);
    }
  }
}

export default Store;
