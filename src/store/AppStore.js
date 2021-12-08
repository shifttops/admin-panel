import {makeAutoObservable, observable} from "mobx";
import {refreshToken} from "../helpers/AuthHelper";

class AppStore {
  isSidebarOpen = observable.box(true);
  isSidebarOverlap = false;
  notificationsData = observable.box([]);
  unreadNotificationCount = 0;

  constructor() {
    makeAutoObservable(this)

    this.connectSocket()
  }

  connectSocket = () => {
    this.socket = new WebSocket(`${process.env.REACT_APP_URL.replace('https', 'wss')}/ws/?token=${localStorage.getItem('access')}`);

    this.socket.onopen = () => console.log('socket connected')

    this.socket.onclose = () => {
      setTimeout(() => {
        this.connectSocket()
      }, 3000)
    }

    this.socket.onmessage = (event) => {
      this.notificationsData.set(JSON.parse(event.data))
      this.unreadNotificationCount = this.notificationsData.get().length;
    }
  }

  readNotification = async ( setError = (error) => console.log(`Error: ${error}`) ) => {
    try {
      await refreshToken();

      const resp = await fetch(`${process.env.REACT_APP_URL}/api/update_last_view_notification/`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({date: new Date()})
      })

      this.unreadNotificationCount = 0;
    } catch (e) {
      setError(e.error)
    }
  }


  sidebarToggle = () => {
    this.isSidebarOpen.set(!this.isSidebarOpen.get());
  }
}

export default new AppStore();