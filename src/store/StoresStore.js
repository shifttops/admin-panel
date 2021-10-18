import {makeAutoObservable, observable, reaction} from "mobx";
import moment from "moment";
import { refreshToken } from "../helpers/AuthHelper";
import queryString from "query-string";
import { filtersRequestMapper } from "../helpers/mappers";
import { createDateFilters } from "../helpers/filters";
import { ToastsStore } from "react-toasts";

class StoresStore {
  isLoading = 0;
  storeInfo = {};
  stores = {stores: []};
  storeErrors = [];
  filters = {};
  cameras = [];
  enabledFilters = {
    ...queryString.parse(window.location.search, { arrayFormat: "comma" }),
  };
  maintenanceScreens = [];
  maintenanceScreensData = [];
  groups = [];

  constructor() {
    makeAutoObservable(
      this
      //   , {
      //   storeInfo: observable,
      //   stores: observable,
      //   searchStores: computed,
      //   getStores: action,
      //   getStoreInfo: action,
      //   getStoreHardware: action,
      //   getStoreServer: action,
      // }
    );
    reaction(
      () => this.storeInfo.status,
      (status, previousValue, reaction) => {
        if (status && this.maintenanceScreensData.length) {
          this.maintenanceScreens = [
            ...this.maintenanceScreensData.find(
              (screen) => screen.name === status
            )?.maintenance_screen,
          ];
        }
      }
    );

    reaction(
      () => this.storeInfo.store_id,
      (store_id, previousValue, reaction) => {
        if (store_id) {
          this.getStoreInfo(store_id, (msg) => msg && console.log("msg", msg));
        }
      }
    );
  }

  getStores = async ({
    search,
    setError,
    field = null,
    type = "none",
    limit,
    offset = this.stores.stores.length,
    signal, setResCount
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

      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
        signal,
      });

      if(resp.status === 200) {
        const res = await resp.json();

        this.stores.stores = offset
          ? [...this.stores.stores, ...res.results]
          : [...res.results];

        setResCount(res.count)

        if (!res.count) {
          ToastsStore.error("No stores find", 3000, "toast");
        }
      }

      this.isLoading--;
    } catch (e) {
      this.isLoading--;

      setError(e.message);
    }
  };

  getStoreInfo = async (id, setError) => {
    try {
      await refreshToken();

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
        this.storeInfo = { ...res };
        if (res) {
          if (res.store_location) {
            await this.getStoreLocation(res.store_location);
          }
          if (res.server_id && res.server_id[0]) {
            await this.getServersInfo({ servers_id: res.server_id, setError });
          }
          if (res.cameras && res.cameras.length) {
            await this.getStoreCameraStatus(id, setError);
          }
          await this.getStoreHardware(id, setError);
          setError("");
        }
      }
    } catch (e) {
      setError(e.message);
    }
  };

  getServersInfo = async ({ servers_id, setError }) => {
    const servers = await Promise.all(
      servers_id.map((server_id) =>
        this.getStoreServer({ server_id, setError })
      )
    ).catch((e) => setError(e.message));

    this.storeInfo = {
      ...this.storeInfo,
      servers,
    };
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

        this.storeInfo = { ...this.storeInfo, ...res };
        setError("");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  getStoreCameraStatus = async (store_id, setError) => {
    try {
      await refreshToken();

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
          return { ...res[cameraId], ...camera };
        });
        this.storeInfo.is_all_lateral_works = res.is_all_lateral_works;
        setError("");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  getStoreCameraImages = async (store_id, setError) => {
    try {
      await refreshToken();

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
        camera = { ...camera, ...camera.detail };
        delete camera.detail;
        return camera;
      });
      this.cameras = newRes;
      setError("");
      // }
    } catch (e) {
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
      this.storeInfo = { ...this.storeInfo, ...res_location };
    }
  };

  getStoreServer = async ({ server_id, setError }) => {
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

  getHardwareSetup = async ({ id, setError }) => {
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

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/fault_logs/${store_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      if (resp.status === 200) {
        const res = await resp.json();
        console.log(res);
        this.storeErrors = res;
        console.log(this.storeErrors);
        setError("");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  getFilters = async (setError) => {
    try {
      await refreshToken();

      const resp = await fetch(`${process.env.REACT_APP_URL}/api/filters/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });
      if (resp.status === 200) {
        const res = await resp.json();
        this.filters = { ...res };
        setError("");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  getMetrics = async (store_id, setError) => {
    try {
      await refreshToken();

      const resp = await fetch(`${process.env.REACT_APP_URL}/api/metrics/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ store_id }),
      });
      if (resp.status === 200) {
        const res = await resp.json();
        this.storeInfo = { ...this.storeInfo, ...res };
        setError("");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  getMaintenanceScreens = async (setError) => {
    try {
      await refreshToken();
      const resp = await fetch(`${process.env.REACT_APP_URL}/api/status/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });

      const res = await resp.json();
      this.maintenanceScreensData = [...res.results];
      this.updateMaintenanceScreens();

      setError("");
    } catch (e) {
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
    this.maintenanceScreens = [
      ...this.maintenanceScreensData.find(
        (screen) => screen.name === this.storeInfo.status
      )?.maintenance_screen,
    ];
  };

  setMaintenanceScreen = async ({ setError, screen }) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/set_store_status/${this.storeInfo.store_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: this.storeInfo.status,
            title: screen,
          }),
        }
      );

      if (resp.status === 200) {
        setError("");

        this.storeInfo.maintenance_screen = screen;
      } else {
        const res = await resp.json();
        ToastsStore.error(res.error, 3000, "toast");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  updateJiraStatus = async ({ store_id, setError }) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/status/refresh`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      console.log(resp);
      if (resp.status === 200) {
        ToastsStore.success("Updated", 3000, "toast");
        setTimeout(() => {
          this.getStoreInfo(store_id, setError);
        }, 5000);
      } else {
        const res = await resp.json();
        ToastsStore.error(res.error, 3000, "toast");
      }
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  };
}

export default new StoresStore();
