const initState = { message: null, level: null };

export class MessageStore {
  name = "message";

  get state() {
    return this.getState();
  }

  init(cb) {
    this.setState(initState, cb);
  }

  addMessage = (message = null, level = null) => {
    console.log("add message: ", { message, level });
    this.setState({ message, level }, () => {
      if (level.value === 4) {
        setTimeout(this.deleteMessage, 3000);
      }
    });
  };

  deleteMessage = () => {
    this.setState(initState);
  };
}

export default new MessageStore();
