import {makeAutoObservable, observable, reaction} from "mobx";
import moment from "moment";
import {refreshToken} from "../helpers/AuthHelper";
import queryString from "query-string";
import {createDateFilters} from "../helpers/filters";
import {ToastsStore} from "react-toasts";
import Api from "../api";
import {getFileName} from "../helpers/functions";

class StoresStore {
  isFiltersFetching = false;
  isMapFetching = false;

  isLoading = 0;

  isRefreshing = false;
  isBrowserRefreshing = false;
  isCamerasRefreshing = false;
  isJiraRefreshing = false;

  isStoreInfoFetching = false;
  isMetricsFetching = false;
  isHistoryFetching = false;
  isCamerasFetching = false;
  isCamerasStatusFetching = false;
  isPlannerFetching = false;
  isServersFetching = false;
  isStatusFetching = false;
  isTicketsFetching = false;
  isConfigurationFilesFetching = false;
  isFilesFetching = false;
  isStoreStatusFetching = false;
  isScheduleFetching = false;

  isChatMessagesFetching = false;
  isChatFilesFetching = false;

  storeInfo = {
    store_id: 20209,
    address: "ул. Рябиновая, 12",
    county: "Москва",
    country: "Россия",
    store_type: "Франшиза",
    rfd: new Date().toLocaleDateString(),
    dod: new Date().toLocaleDateString(),
    status: 'Готов к установке',
    zipcode: 210027,
  };
  stores = [
    {
      store_id: 20209,
      address: "ул. Рябиновая, 12",
      store_county: "Москва",
      store_type: "Франшиза",
      date_deployment: new Date(),
      date_created: new Date(),
      status: 'Готов к установке',
    },
    {
      store_id: 20210,
      address: "ул. Мира, 2А",
      store_county: "Владимир",
      store_type: "Собственная",
      date_deployment: new Date(),
      date_created: new Date(),
      status: 'Работает',
    },
  ];
  storeErrors = observable.box([]);
  metrics = observable.box({});
  filters = {};
  cameras = observable.box([]);
  enabledFilters = {
    ...queryString.parse(window.location.search, {arrayFormat: "comma"}),
  };
  maintenanceScreens = observable.box([]);
  maintenanceScreensData = [];
  groups = [];
  periodicTasks = observable.box([]);
  messagesData = observable.box([]);
  chatFilesData = observable.box([]);
  chatInterval = observable.box(null);
  storeTickets = observable.box([]);
  configurationFiles = observable.box([]);
  storeFiles = observable.box([]);
  coordinates = observable.box([]);
  schedule = observable.box([
    {
      start_datetime: new Date(),
      end_datetime: new Date(),
    },
    {
      start_datetime: new Date(),
      end_datetime: new Date(),
    },
    {
      start_datetime: new Date(),
      end_datetime: new Date(),
      latest: true,
    }
  ]);

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.storeInfo.status,
      (status, previousValue, reaction) => {
        if (status && this.maintenanceScreensData.length) {
          this.maintenanceScreens.set([
            ...this.maintenanceScreensData.find(
              (screen) => screen.name === status
            )?.maintenance_screen,
          ]);
        }
      }
    );

    reaction(
      () => this.storeInfo.store_id,
      (store_id, previousValue, reaction) => {
        if (store_id && store_id !== previousValue) {
          this.storeInfo = {store_id: store_id};
          this.getStoreInfo(store_id, (msg) => msg && console.log("msg", msg));
        }
      }
    );

    reaction(
      () => this.storeErrors.get(),
      (errors, previousValue) => {
        if (!errors)
          this.getStoreErrorLogs(
            this.storeInfo.store_id,
            (msg) => msg && console.log("msg", msg)
          );
      }
    );

    reaction(
      () => this.metrics.get(),
      (metrics) => {
        if (!metrics)
          this.getMetrics(
            this.storeInfo.store_id,
            (msg) => msg && console.log("msg", msg)
          );
      }
    );

    reaction(
      () => this.cameras.get(),
      (cameras) => {
        if (!cameras)
          this.getStoreCameraImages(
            this.storeInfo.store_id,
            (msg) => msg && console.log("msg", msg)
          );
      }
    );

    reaction(
      () => this.maintenanceScreens.get(),
      (maintenanceScreens) => {
        if (!maintenanceScreens)
          this.getMaintenanceScreens((msg) => msg && console.log("msg", msg));
      }
    );

    reaction(
      () => this.periodicTasks.get(),
      (periodicTasks, previousValue, reaction) => {
        if (!periodicTasks) {
          this.getStorePeriodicTasks(
            this.storeInfo.store_id,
            (msg) => msg && console.log("msg", msg)
          );
        }
      }
    );

    reaction(
      () => this.storeTickets.get(),
      (tickets) => {
        if (!tickets) {
          this.getStoreTickets({
            store_id: this.storeInfo.store_id,
          });
        }
      }
    );

    reaction(
      () => this.configurationFiles.get(),
      (files) => {
        if (!files) {
          this.getStoreConfigurationFiles({
            store_id: this.storeInfo.store_id,
          });
        }
      }
    );

    reaction(
      () => this.storeFiles.get(),
      (files) => {
        if (!files) {
          this.getStoreMinioFiles({
            store_id: this.storeInfo.store_id,
          });
        }
      }
    );

    reaction(
      () => this.schedule.get(),
      async (schedule) => {
        if (!schedule) {
          await this.getStoreSchedule();
        }
      }
    );
  }

  getStores = async ({
    search = "",
    setError,
    field = null,
    type = "none",
    limit,
    offset = this.stores.length,
    signal,
    setResCount,
  }) => {
    try {
      await refreshToken();
      let url = `${process.env.REACT_APP_URL}/api/store/?limit=${limit}&offset=${offset}`;
      if (field && type !== "none") {
        url += `&filtered_by=${field}&type=${type}`;
      }
      if (search.length) {
        url += `&search=${search}`;
      }

      this.isLoading++;

      if (
        Object.keys(this.enabledFilters).length &&
        Object.keys(this.enabledFilters).some(
          (key) => this.enabledFilters[key]?.length
        )
      ) {
        const filtersForReq = createDateFilters(this.enabledFilters);

        Object.keys(filtersForReq).map((key) => {
          url += `&${key}=${filtersForReq[key]}`;
        });
      }

      // const resp = await fetch(url, {
      //   method: "GET",
      //   headers: {
      //     Authorization: `Token ${localStorage.getItem("access")}`,
      //   },
      //   signal,
      // });
      // if (resp.status === 200) {
      //   const res = await resp.json();
      //
      //   this.stores = offset
      //     ? [...this.stores, ...res.results]
      //     : [...res.results];
      //
      //   setResCount(res.count);
      //
      //   if (!res.count) {
      //     ToastsStore.error("No stores find", 3000, "toast");
      //   }
      // } else {
      //   const res = await resp.json();
      //
      //   ToastsStore.error(res.error, 3000, "toast");
      // }

      this.isLoading--;
    } catch (e) {
      this.isLoading--;

      setError(e.message);
    } finally {
      this.stores = [
        {
          store_id: 20209,
          address: "ул. Рябиновая, 12",
          store_county: "Москва",
          store_type: "Франшиза",
          date_deployment: new Date(),
          date_created: new Date(),
          status: 'Готов к установке',
        },
        {
          store_id: 20210,
          address: "ул. Мира, 2А",
          store_county: "Владимир",
          store_type: "Собственная",
          date_deployment: new Date(),
          date_created: new Date(),
          status: 'Работает',
        },
      ]
    }
  };

  getStoreInfo = async (id, setError) => {
    try {
      await refreshToken();

      this.isStoreInfoFetching = true;

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/store/${id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      if (resp.status === 200) {
        const res = await resp.json();
        res.rfd = res.date_created
          ? moment(res.date_created).format("DD.MM.YYYY")
          : "N/A";
        res.dod = res.date_deployment
          ? moment(res.date_deployment).format("DD.MM.YYYY")
          : "N/A";
        this.storeInfo = {...this.storeInfo, ...res};

        this.isStoreInfoFetching = false;
        if (res) {
          await Promise.all([
            res.store_location
              ? await this.getStoreLocation(res.store_location)
              : null,
            res.server_id && res.server_id[0]
              ? await this.getServersInfo({
                servers_id: res.server_id,
                setError,
              })
              : null,
            res.cameras && res.cameras.length
              ? await this.getStoreCameraStatus(id, setError)
              : null,
            await this.getStoreHardware(id, setError),
          ]);
          /*if (res.store_location) {
            await this.getStoreLocation(res.store_location);
          }
          if (res.server_id && res.server_id[0]) {
            await this.getServersInfo({ servers_id: res.server_id, setError });
          }
          if (res.cameras && res.cameras.length) {
            await this.getStoreCameraStatus(id, setError);
          }
          await this.getStoreHardware(id, setError);*/
          setError("");
        }
      }
    } catch (e) {
      this.isStoreInfoFetching = false;
      setError(e.message);
    }
  };

  getServersInfo = async ({servers_id, setError}) => {
    this.isServersFetching = true;

    const servers = await Promise.all(
      servers_id.map(async (server_id) => ({
        ...(await this.getStoreServer({server_id, setError})),
        software: await this.getServerSoftware({server_id, setError}),
      }))
    ).catch((e) => setError(e.message));

    this.storeInfo = {
      ...this.storeInfo,
      servers,
    };

    this.isServersFetching = false;
  };

  getStoreHardware = async (id, setError) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/hardware_status/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      if (resp.status === 200) {
        const res = await resp.json();

        this.storeInfo = {...this.storeInfo, ...res};
        setError("");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  getServerSoftware = async ({server_id, setError}) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/software/${server_id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (resp.status === 200) {
        const res = await resp.json();

        setError("");

        return res;
      }
    } catch (e) {
      setError(e.message);
    }
  };

  getStoreCameraStatus = async (store_id, setError) => {
    try {
      await refreshToken();

      this.isCamerasStatusFetching = true;

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/cameras/status/${store_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      if (resp.status === 200) {
        const res = await resp.json();
        this.storeInfo.cameras = this.storeInfo.cameras.map((camera) => {
          const cameraId = Object.keys(res).find((item) => camera.id === +item);
          return {...res[cameraId], ...camera};
        });
        this.storeInfo.is_all_lateral_works = res.is_all_lateral_works;
        setError("");
        this.isCamerasStatusFetching = false;
      }
    } catch (e) {
      this.isCamerasStatusFetching = false;
      setError(e.message);
    }
  };

  getStoreCameraImages = async (store_id, setError) => {
    try {
      await refreshToken();

      this.isCamerasFetching = true;

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/cameras/status/detail/${store_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      // if (resp.status === 200) {
      const res = await resp.json();

      const newRes = res.map((camera) => {
        camera = {...camera, ...camera.detail};
        delete camera.detail;
        return camera;
      });

      this.cameras.set([...newRes]);
      setError("");
      this.isCamerasFetching = false;
      // }
    } catch (e) {
      this.isCamerasFetching = false;
      setError(e.message);
    }
  };

  getStoreLocation = async (store_location) => {
    const resp_location = await fetch(
      `${process.env.REACT_APP_URL}/api/location/${store_location}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      }
    );
    if (resp_location.status === 200) {
      const res_location = await resp_location.json();
      res_location.fourDigitRestaurantID = parseInt(
        this.storeInfo.store_id.toString().slice(1)
      );
      res_location.threeDigitRestaurantID = parseInt(
        this.storeInfo.store_id.toString().slice(2)
      );
      this.storeInfo = {...this.storeInfo, ...res_location};
    }
  };

  getStoreServer = async ({server_id, setError}) => {
    try {
      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/server/${server_id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      if (resp.status === 200) {
        const res = await resp.json();
        setError("");

        return res;
      }
    } catch (e) {
      setError(e.message);
    }
  };

  getHardwareSetup = async ({id, setError}) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/hardware_setup/${id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      if (resp.status === 200) {
        const res = await resp.json();
        setError("");

        return res;
      }
    } catch (e) {
      setError(e.message);
    }
  };

  getStoreErrorLogs = async (store_id, setError) => {
    try {
      await refreshToken();

      this.isHistoryFetching = true;

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/fault_logs/${store_id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      if (resp.status === 200) {
        const res = await resp.json();
        this.storeErrors.set([...res]);
        setError("");
      }
      this.isHistoryFetching = false;
    } catch (e) {
      this.isHistoryFetching = false;
      setError(e.message);
    }
  };

  getFilters = async (setError) => {
    try {
      this.isFiltersFetching = true;
      await refreshToken();

      const resp = await fetch(`${process.env.REACT_APP_URL}/api/filters/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });
      if (resp.status === 200) {
        const res = await resp.json();
        this.filters = {...res};
        setError("");
      }
      this.isFiltersFetching = false;
    } catch (e) {
      this.isFiltersFetching = false;

      setError(e.message);
    }
  };

  getMetrics = async (store_id, setError) => {
    try {
      await refreshToken();

      this.isMetricsFetching = true;

      const resp = await fetch(`${process.env.REACT_APP_URL}/api/metrics/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({store_id}),
      });
      if (resp.status === 200) {
        const res = await resp.json();
        this.metrics.set({...res});
        setError("");
      } else this.metrics.set({});

      this.isMetricsFetching = false;
    } catch (e) {
      this.isMetricsFetching = false;
      setError(e.message);
    }
  };

  getMaintenanceScreens = async (setError) => {
    try {
      await refreshToken();
      this.isStatusFetching = true;

      const resp = await fetch(`${process.env.REACT_APP_URL}/api/status/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });

      if (resp.status === 200) {
        const res = await resp.json();
        this.maintenanceScreensData = [...res.results];
        this.updateMaintenanceScreens();
      } else ToastsStore.error(`Error ${resp.status}`, 3000, "toast");

      this.isStatusFetching = false;
      setError("");
    } catch (e) {
      this.isStatusFetching = false;
      setError(e.message);
    }
  };

  getGroups = async (setError) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/store_group/?limit=9999&offset=0`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      const res = await resp.json();
      this.groups = [...res.results];
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  updateMaintenanceScreens = () => {
    this.maintenanceScreens.set([
      ...this.maintenanceScreensData.find(
        (screen) => screen.name === this.storeInfo.status
      )?.maintenance_screen,
    ]);
  };

  getStorePeriodicTasks = async (store_id, setError) => {
    try {
      await refreshToken();

      this.isPlannerFetching = true;

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/store/${store_id}/periodic_tasks`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (resp.status === 200) {
        const res = await resp.json();
        this.periodicTasks.set([...res.results]);
        if (!res.results.length)
          ToastsStore.error("No tasks on this store", 3000, "toast");
      } else {
        const res = await resp.json();
        ToastsStore.error(res.error, 3000, "toast");
      }
      this.isPlannerFetching = false;
    } catch (e) {
      this.isPlannerFetching = false;
      setError(e.message);
    }
  };

  getStoreTickets = async ({store_id}) => {
    try {
      await refreshToken();

      this.isTicketsFetching = true;

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/store/${store_id}/tickets/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (resp.status === 200) {
        const res = await resp.json();
        this.storeTickets.set([...res]);
        if (!res.results.length)
          ToastsStore.error("No tickets on this store", 3000, "toast");
      } else {
        const res = await resp.json();
        ToastsStore.error(res.error, 3000, "toast");
      }
      this.isTicketsFetching = false;
    } catch (e) {
      this.isTicketsFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  manageStore = async (url) => {
    try {
      await refreshToken();

      if (url === "/refresh") this.isRefreshing = true;
      if (url === "/refresh_browser") this.isBrowserRefreshing = true;
      if (url === "/reboot_cameras") this.isCamerasStatusFetching = true;

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/store/${this.storeInfo.store_id}${url}`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (url === "/refresh") this.isRefreshing = false;
      if (url === "/refresh_browser") this.isBrowserRefreshing = false;
      if (url === "/reboot_cameras") this.isCamerasStatusFetching = false;

      if (resp.status === 200) {
        if (url === "/refresh") {
          ToastsStore.success("Tasks created", 3000, "toast");
        } else {
          return resp.json();
        }
      } else {
        const res = await resp.json();
        ToastsStore.error(res.error, 3000, "toast");
      }
    } catch (e) {
      this.isRefreshing = false;
      this.isBrowserRefreshing = false;
      this.isCamerasStatusFetching = false;
      ToastsStore.error("Something went wrong", 3000, "toast");
    }
  };

  getMessages = async ({store_id}) => {
    try {
      await refreshToken();

      this.isChatMessagesFetching = true;

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/store_chat/${store_id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (resp.status === 200) this.messagesData.set([...(await resp.json())]);
      else ToastsStore.error(resp.detail, 3000, "toast");
      this.isChatMessagesFetching = false;
    } catch (e) {
      this.isChatMessagesFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  getStoreChatFiles = async ({store_id}) => {
    try {
      await refreshToken();

      this.isChatFilesFetching = true;

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/store_chat_file/${store_id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (resp.status === 200) this.chatFilesData.set([...(await resp.json())]);
      else ToastsStore.error(resp.detail, 3000, "toast");
      this.isChatFilesFetching = false;
    } catch (e) {
      this.isChatFilesFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  getNewStoreChatData = async ({store_id}) => {
    clearInterval(this.chatInterval.get());

    await this.getMessages({store_id});
    await this.getStoreChatFiles({store_id});

    this.chatInterval.set(
      setInterval(() => {
        this.getMessages({store_id});
        this.getStoreChatFiles({store_id});
      }, 20000)
    );
  };

  sendMessage = async ({store_id, message, files, parent_id}) => {
    try {
      await refreshToken();

      const formData = new FormData();
      formData.set("store", store_id);
      formData.set("message", message);
      if (files.length) files.map((file) => formData.append("files", file));
      if (parent_id) formData.set("parent", parent_id);

      const resp = await fetch(`${process.env.REACT_APP_URL}/api/store_chat/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
        body: formData,
      });

      if (resp.status === 201) this.getNewStoreChatData({store_id});
      else ToastsStore.error(resp.detail, 3000, "toast");
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  editMessage = async ({
                         message,
                         is_message_pinned,
                         store_id,
                         id,
                         files = null,
                       }) => {
    try {
      await refreshToken();

      const formData = new FormData();
      formData.set("store", store_id);
      formData.set("message", message);
      formData.set("id", id);
      formData.set("is_message_pinned", is_message_pinned);
      if (files && files.length) {
        files.map((file) => formData.append("files", file));
      } else formData.set("files", files);

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/store_chat/${id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
          body: formData,
        }
      );

      if (resp.status === 200) this.getNewStoreChatData({store_id});
      else ToastsStore.error(resp.detail, 3000, "toast");
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  deleteMessage = async ({id, store_id}) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/store_chat/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (resp.status === 204) this.getNewStoreChatData({store_id});
      else ToastsStore.error(resp.detail, 3000, "toast");
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  editStoreChatFile = async ({file, newName, store_id}) => {
    try {
      await refreshToken();

      const data = new FormData();
      data.set("pk", file.pk);
      data.set("store_message", file.store_message);
      data.set("file_url", file.file_url);
      data.set("file", newName);

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/store_chat_file/${file.pk}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
          body: data,
        }
      );

      if (resp.status === 200) this.getNewStoreChatData({store_id});
      else ToastsStore.error("Server error", 3000, "toast");
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  deleteStoreChatFile = async ({id, store_id}) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/store_chat_file/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (resp.status === 204) this.getNewStoreChatData({store_id});
      else ToastsStore.error(resp.detail, 3000, "toast");
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  getStoreConfigurationFiles = async ({store_id}) => {
    try {
      this.isConfigurationFilesFetching = true;
      await refreshToken();

      const resp = await Api.get(
        `/display_store_configuration_files/${store_id}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (resp.status === 200) this.configurationFiles.set([...resp.data]);
      else ToastsStore.error(resp.data.detail, 3000, "toast");
      this.isConfigurationFilesFetching = false;
    } catch (e) {
      this.isConfigurationFilesFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  getStoreMinioFiles = async ({store_id}) => {
    try {
      this.isFilesFetching = true;
      await refreshToken();

      const {data, status} = await Api.get(
        `/display_store_minio_files/${store_id}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (status === 200)
        this.storeFiles.set([
          ...data.map(({date_upload: date, filename}) => ({
            created: moment(date),
            filename,
          })),
        ]);
      else ToastsStore.error(data.detail, 3000, "toast");
      this.isFilesFetching = false;
    } catch (e) {
      this.isFilesFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  downloadMinioFile = async ({store_id, suffix, fileName}) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/download_file_minio/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({suffix, store_id}),
        }
      );

      if (resp.status === 200) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(await resp.blob());
        link.download = getFileName(fileName, "/");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else ToastsStore.error("Error on download", 3000, "toast");
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  uploadMinioFile = async ({store_id, suffix, file}) => {
  };

  getStoresCoordinates = async () => {
    try {
      this.isMapFetching = true;
      await refreshToken();

      const {data, status} = await Api.get(
        `/coordinates/?limit=9999&offset=0`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (status === 200) {
        this.coordinates.set(data.results);
      } else ToastsStore.error(JSON.stringify(data), 3000, "toast");
      this.isMapFetching = false;
    } catch (e) {
      this.isMapFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  setStoreStatus = async ({storeStatus, title}) => {
    try {
      this.isStoreStatusFetching = true;
      await refreshToken();

      const {data, status} = await Api.post(
        `/set_store_status/${this.storeInfo.store_id}`,
        {status: storeStatus, title: title},
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (status === 200) {
        this.storeInfo = {
          ...this.storeInfo,
          status: storeStatus,
          maintenance_screen: title,
        };
      } else ToastsStore.error(JSON.stringify(data), 3000, "toast");
      this.isStoreStatusFetching = false;
    } catch (e) {
      this.isStoreStatusFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  getStoreSchedule = async () => {
    try {
      this.isScheduleFetching = true;
      await refreshToken();

      const {data, status} = await Api.get(
        `/store/${this.storeInfo.store_id}/schedule`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (status === 200) {
        this.schedule.set([...data]);
      } else ToastsStore.error(JSON.stringify(data), 3000, "toast");
      this.isScheduleFetching = false;
    } catch (e) {
      this.isScheduleFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };
}

export default new StoresStore();
