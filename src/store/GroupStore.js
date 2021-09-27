import { computed, observable, action, makeAutoObservable, toJS } from "mobx";
import { refreshToken } from "../helpers/AuthHelper";
import { computedFn } from "mobx-utils";

class GroupsStore {
  groups = [];

  constructor() {
    makeAutoObservable(this);
  }

  getGroups= async (setError) => {
    try {
      await refreshToken();
      
      const resp = await fetch(
          "https://staptest.mcd-cctv.com/api/store_group",
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
}

export default new GroupsStore();
