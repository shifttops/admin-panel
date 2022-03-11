import { makeAutoObservable } from "mobx";
import { refreshToken } from "../helpers/AuthHelper";

class GroupsStore {
  groups = [];

  constructor() {
    makeAutoObservable(this);
  }

  getGroups = async (setError) => {
    try {
      await refreshToken();

      const resp = await fetch(`${process.env.REACT_APP_URL}/api/store_group`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });
      const res = await resp.json();
      this.groups = [...res.results];
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };
}

export default new GroupsStore();
