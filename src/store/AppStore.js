import { makeAutoObservable, observable } from "mobx";
import { refreshToken } from "../helpers/AuthHelper";
import { ToastsStore } from "react-toasts";
import { isArray } from "@craco/craco/lib/utils";

class AppStore {
  isSidebarOpen = observable.box(true);
  isSidebarOverlap = false;

  notificationsData = observable.box([]);
  unreadNotificationCount = 0;

  searchStores = observable.box([]);

  isLoadingSearch = 0;
  isLoadingNotificationSettings = false;
  isUpdatingNotificationSettings = false;

  notificationSettings = observable.box([]);

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
      const data = JSON.parse(event.data);
      if (isArray(data)) {
        console.log("array notifications data", data);
        this.notificationsData.set([
          ...data.reverse(),
          ...this.notificationsData.get(),
        ]);
      } else {
        console.log("object notifications data", data);
        this.notificationsData.set([
          { ...data },
          ...this.notificationsData.get(),
        ]);
      }
      this.unreadNotificationCount = this.notificationsData.get().length;
    };
  };

  getNotificationSettings = async () => {
    try {
      this.isLoadingNotificationSettings = true;
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/get_user_notification_types/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (resp.status === 200) {
        const res = await resp.json();
        this.notificationSettings.set(res.notification_types);
      } else ToastsStore.error("Error with settings getting", 3000, "toast");

      this.isLoadingNotificationSettings = false;
    } catch (e) {
      this.isLoadingNotificationSettings = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  updateNotificationsSettings = async ({
    isDateOnly = false,
    isSettingsOnly = false,
    notificationsList,
  }) => {
    try {
      if (isSettingsOnly) this.isUpdatingNotificationSettings = true;
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/update_event_data/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isDateOnly
              ? {
                  date: new Date(),
                }
              : isSettingsOnly
              ? {
                  notifications_types: notificationsList,
                }
              : null
          ),
        }
      );

      if (resp.status === 200) {
        if (isSettingsOnly) {
          this.notificationSettings.set(notificationsList);
          ToastsStore.success("Saved successfully", 3000, "toast");
        }
      } else ToastsStore.error("Error with saving", 3000, "toast");

      if (isDateOnly) this.unreadNotificationCount = 0;
      if (isSettingsOnly) this.isUpdatingNotificationSettings = false;
    } catch (e) {
      this.isUpdatingNotificationSettings = false;
      ToastsStore.error(e.message, 3000, "toast");
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
