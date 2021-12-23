import { makeAutoObservable, observable } from "mobx";
import { refreshToken } from "../helpers/AuthHelper";
import { ToastsStore } from "react-toasts";

class AppStore {
  isSidebarOpen = observable.box(true);
  isSidebarOverlap = false;
  notificationsData = observable.box([]);
  unreadNotificationCount = 0;
  searchStores = observable.box([]);
  isLoadingSearch = 0;

  constructor() {
    makeAutoObservable(this);
    this.connectSocket();
  }

  connectSocket = () => {
    this.socket = new WebSocket(
      `${process.env.REACT_APP_URL.replace(
        "https",
        "wss"
      )}/ws/?token=${localStorage.getItem("access")}`
    );

    this.socket.onopen = () => console.log("socket connected");

    this.socket.onclose = () => {
      console.log("socket disconnected");
      setTimeout(() => {
        this.connectSocket();
      }, 3000);
    };

    this.socket.onmessage = (event) => {
      this.notificationsData.set(JSON.parse(event.data));
      this.unreadNotificationCount = this.notificationsData.get().length;
      console.log(JSON.parse(event.data).length);
    };
  };

  readNotification = async (
    setError = (error) => console.log(`Error: ${error}`)
  ) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/update_last_view_notification/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: new Date() }),
        }
      );

      this.unreadNotificationCount = 0;
    } catch (e) {
      setError(e.error);
    }
  };

  sidebarToggle = () => {
    this.isSidebarOpen.set(!this.isSidebarOpen.get());
  };

  getStoresForSearch = async ({
    search,
    offset = this.searchStores.get().length,
    limit,
    signal,
    setResCount,
  }) => {
    try {
      await refreshToken();
      this.isLoadingSearch++;

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/store/?limit=${limit}&offset=${offset}&search=${search}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
          signal,
        }
      );

      if (resp.status === 200) {
        const res = await resp.json();

        this.searchStores.set(
          offset
            ? [...this.searchStores.get(), ...res.results]
            : [...res.results]
        );

        setResCount(res.count);

        if (!res.count) {
          ToastsStore.error("No stores find", 3000, "toast");
        }
      } else {
        const res = await resp.json();
        ToastsStore.error(res.detail, 3000, "toast");
      }

      this.isLoadingSearch--;
    } catch (e) {
      this.isLoadingSearch--;
    }
  };
}

export default new AppStore();
