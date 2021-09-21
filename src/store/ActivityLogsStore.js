import { computed, observable, action, makeAutoObservable, toJS } from "mobx";
import { refreshToken } from "../helpers/AuthHelper";
import { computedFn } from "mobx-utils";

class ActivityLogsStore {
  isLoading = 0
  jira_logs = [];
  fault_logs = [];

  tempJira = []
  tempFault = []

  constructor() {
    makeAutoObservable(this);
  }

  get logs() {
    // return [...this.tempJira, ...this.tempFault].sort(
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
          "https://staptest.mcd-cctv.com/api/jira_logs/?limit=9999&offset=0",
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
          `https://staptest.mcd-cctv.com/api/fault_logs/?limit=9999&offset=0`,
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

  getJiraPart = async ({search, setError, field = null, type = "none", limit, offset = this.logs.length, signal}) => {
    try {
      await refreshToken();

      this.isLoading++;

      const resp = await fetch(`https://staptest.mcd-cctv.com/api/jira_logs/?limit=${limit}&offset=${offset}&search=${search}&filtered_by=${field}&type=${type}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
        signal,
      });

      const res = await resp.json();

      this.tempJira = offset
          ? (this.tempJira = [...this.tempJira, ...res.results])
          : (this.tempJira = [...res.results]);

      this.isLoading--;

      setError("");
    } catch (e) {
      this.isLoading--;

      setError(e.message);
    }
  }

  getFaultPart = async ({search, setError, field = null, type = "none", limit, offset = this.logs.length, signal}) => {
    try {
      await refreshToken();

      this.isLoading++;

      const resp = await fetch(`https://staptest.mcd-cctv.com/api/fault_logs/?limit=${limit}&offset=${offset}&search=${search}&filtered_by=${field}&type=${type}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
        signal,
      });

      const res = await resp.json();

      this.tempFault = offset
          ? (this.tempFault = [...this.tempFault, ...res.results])
          : (this.tempFault = [...res.results]);

      this.isLoading--;

      setError("");
    } catch (e) {
      this.isLoading--;

      setError(e.message);
    }
  }
}

export default new ActivityLogsStore();
