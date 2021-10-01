import { computed, observable, action, makeAutoObservable, toJS } from "mobx";
import { refreshToken } from "../helpers/AuthHelper";
import { computedFn } from "mobx-utils";

class ActivityLogsStore {
  jira_logs = [];
  fault_logs = [];

  constructor() {
    makeAutoObservable(this);
  }

  get logs() {
    return [...this.jira_logs, ...this.fault_logs].sort(
        (a, b) =>
            new Date(b.error_time ? b.error_time : b.changed_on) -
            new Date(a.error_time ? a.error_time : a.changed_on)
    );
  }

  searchLogs = computedFn((search) => {
    if (!search) return this.logs;
    return this.logs.filter((log) =>
        log.store.toString().includes(search.toLowerCase())
    );
  });

  getJiraLogs = async (setError) => {
    try {
      await refreshToken();

      const resp = await fetch(
          `${process.env.REACT_APP_URL}/api/jira_logs/?limit=9999&offset=0`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("access")}`,
            },
          }
      );
      const res = await resp.json();
      this.jira_logs = [...res.results];
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  getFaultLogs = async (setError) => {
    try {
      await refreshToken();

      const resp = await fetch(
          `${process.env.REACT_APP_URL}/api/fault_logs/?limit=9999&offset=0`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("access")}`,
            },
          }
      );
      const res = await resp.json();
      this.fault_logs = [...res.results];
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };
}

export default new ActivityLogsStore();
