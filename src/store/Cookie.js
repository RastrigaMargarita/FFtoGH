import { makeAutoObservable } from "mobx";

class Cookie {
  constructor() {
    makeAutoObservable(this);
  }
  cookie = false;
}

const cookieStore = new Cookie();

export default cookieStore;
