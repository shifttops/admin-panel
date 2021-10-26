import {makeAutoObservable, observable} from "mobx";

class AppStore {
  isSidebarOpen = observable.box(true)
  isSidebarOverlap = false

  constructor() {
    makeAutoObservable(this)
  }

  sidebarToggle = () => {
    this.isSidebarOpen.set(!this.isSidebarOpen.get());
  }
}

export default new AppStore();