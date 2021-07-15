import { computed, observable, action, makeAutoObservable, toJS } from "mobx";
import { computedFn } from "mobx-utils";
import moment from "moment";
import { refreshToken } from "../helpers/AuthHelper";
import queryString from 'query-string';


class StoresStore {
  storeInfo = {};
  stores = [];
  storeErrors = [];
  filters = {};
  enabledFilters = { ...queryString.parse(location.search, { arrayFormat: 'comma' }) }

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

  // getErrors = async (setError) => {
  //   try {
  //     await refreshToken();

  //     const resp = await fetch(
  //       "https://staptest.mcd-cctv.com/api/fault_logs/?limit=9999&offset=0",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Token ${localStorage.getItem("access")}`,
  //         },
  //       }
  //     );
  //     const res = await resp.json();
  //     // this.stores = [...res.results];
  //     console.log(res);
  //     setError("");
  //   } catch (e) {
  //     setError(e.message);
  //   }
  // };

  getStores = async (setError) => {
    try {
      await refreshToken();

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
      console.log(this.stores);
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  getFilteredStores = async (filters, setError) => {
    try {
      await refreshToken();

      const resp = await fetch(
        "https://staptest.mcd-cctv.com/api/store/?limit=9999&offset=0",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": 'application/json',
          },
          body: JSON.stringify(filters),
        }
      );
      const res = await resp.json();
      this.stores = [...res.results];
      console.log(this.stores);
      setError("");
    } catch (e) {
      setError(e.message);
    }
  }

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
        res.dod = res.dod ? moment(res.dod).format("DD.MM.YYYY") : "N/A";
        this.storeInfo = { ...res };
        if (res) {
          if (res.store_location) {
            await this.getStoreLocation(res.store_location);
          }
          if (res.server_id) {
            await this.getStoreServer(res.server_id);
          }
          setError("");
        }
      }
    } catch (e) {
      setError(e.message);
    }
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
        console.log(res);
        this.storeInfo = { ...this.storeInfo, ...res };
        console.log(this.storeInfo);
        setError("");
      }
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

  getStoreServer = async (server_id, setError) => {
    try {
      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/server/${server_id}`,
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
        this.storeInfo = { ...this.storeInfo, ...res };
        console.log(this.storeInfo);
        setError("");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  getHardwareSetup = async (store_id, setError) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/hardware_setup/${store_id}`,
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
        this.storeInfo = { ...this.storeInfo, ...res };
        console.log(this.storeInfo);
        setError("");
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
}

export default new StoresStore();
