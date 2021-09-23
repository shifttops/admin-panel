import { makeAutoObservable } from "mobx";
import { computedFn } from "mobx-utils";
import moment from "moment";
import { refreshToken } from "../helpers/AuthHelper";
import queryString from "query-string";
import { filtersRequestMapper } from "../helpers/mappers";
import { createDateFilters } from "../helpers/dateForFiltersHelper";

class StoresStore {
  storeInfo = {};
  stores = [];
  storeErrors = [];
  filters = {};
  cameras = [];
  enabledFilters = {
    ...queryString.parse(window.location.search, { arrayFormat: "comma" }),
  };
  maintenanceScreens = [];

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
  }

  searchStores = computedFn((search) => {
    if (!search) return this.stores;
    return this.stores.filter((store) =>
      Object.values(store).some(
        (value) =>
          value && value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  getStores = async (setError) => {
    try {
      await refreshToken();
      if (
        Object.keys(this.enabledFilters).length &&
        Object.keys(this.enabledFilters).some(
          (key) => this.enabledFilters[key]?.length
        )
      ) {
        let filtersForReq = {};
        Object.keys(this.enabledFilters).forEach((key) => {
          let reqKey = filtersRequestMapper.find(
            (item) => key === item.name
          )?.reqName;
          if (reqKey) {
            filtersForReq[reqKey] = this.enabledFilters[key];
          } else {
            filtersForReq[key] = this.enabledFilters[key];
          }
        });
        filtersForReq = createDateFilters(filtersForReq);
        const resp = await fetch("https://staptest.mcd-cctv.com/api/filters/", {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filtersForReq),
        });
        const res = await resp.json();
        this.stores = [...res];
      } else {
        const resp = await fetch(
          "https://staptest.mcd-cctv.com/api/store/?limit=9999&offset=0",
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("access")}`,
            },
          }
        );
        const res = await resp.json();
        this.stores = [...res.results];
      }
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  getStoreInfo = async (id, setError) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/store/${id}/`,
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
          setError("");
        }
      }
    } catch (e) {
      setError(e.message);
    }
  };

  getServersInfo = async ({ servers_id, setError }) => {
    const servers = await Promise.all(
      servers_id.map((server_id) => this.getStoreServer({ server_id, setError }))
    ).catch((e) => setError(e));

    this.storeInfo = {
      ...this.storeInfo,
      servers,
    };
  };

  getStoreHardware = async (id, setError) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/hardware_status/${id}`,
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
        `https://staptest.mcd-cctv.com/api/cameras/status/${store_id}`,
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
        `https://staptest.mcd-cctv.com/api/cameras/status/detail/${store_id}`,
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
      `https://staptest.mcd-cctv.com/api/location/${store_location}/`,
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
        `https://staptest.mcd-cctv.com/api/server/${server_id}/`,
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
        `https://staptest.mcd-cctv.com/api/hardware_setup/${id}/`,
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
        `https://staptest.mcd-cctv.com/api/fault_logs/${store_id}`,
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

      const resp = await fetch(`https://staptest.mcd-cctv.com/api/filters/`, {
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

      const resp = await fetch(`https://staptest.mcd-cctv.com/api/metrics/`, {
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
      const resp = await fetch(`https://staptest.mcd-cctv.com/api/status/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });

      const res = await resp.json();
      this.maintenanceScreens = [...res.results.find(screen => screen.name === this.storeInfo.status).maintenance_screen];

      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  setMaintenanceScreen = async ({ setError, screen}) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/set_store_status/${this.storeInfo.store_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: this.storeInfo.status, title: screen}),
        }
      );

      if(resp.status === 200){
        setError("");

        return !!resp.status
      }
    }
    catch (e) {
      setError(e.message)
    }
  };

  updateJiraStatus = async () => {

  }
}

export default new StoresStore();
