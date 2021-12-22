import { makeAutoObservable, observable } from "mobx";
import moment from "moment";

class ChatStore {
  chatData = observable.box([]);

  constructor() {
    makeAutoObservable(this);
  }
}

export default new ChatStore();
