import { makeAutoObservable, observable } from "mobx";
import { refreshToken } from "../helpers/AuthHelper";
import {ToastsStore} from "react-toasts";

class ActivityLogsStore {
  isLoading = 0;
  logs = observable.box([]);

  constructor() {
    makeAutoObservable(this);
  }

  getLogs = async ({
    search = "",
    setError,
    field = null,
    type = "none",
    limit,
    offset = this.logs.get().length,
    signal,
    setResCount
  }) => {
    try {
      await refreshToken();
      let url = `${process.env.REACT_APP_URL}/api/logs/?limit=${limit}&offset=${offset}`;
      if (search.length) url += `&search=${search}`;
      if (field && type !== "none") url += `&filtered_by=${field}&type=${type}`;

      this.isLoading++;

      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
        signal,
      });

      if (resp.status === 200) {
        const res = await resp.json();

        this.logs.set(
          offset ? [...this.logs.get(), ...res.results] : [...res.results]
        );

        setResCount(res.count)

        if(!res.count) ToastsStore.error("No logs find", 3000, "toast");
      } else {
        const res = await resp.json();

        ToastsStore.error(res.error, 3000, "toast");
      }

      this.isLoading--;
    } catch (e) {
      this.isLoading--;

      setError(e.message);
    }
  };
}

export default new ActivityLogsStore();
