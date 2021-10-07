import { makeAutoObservable, reaction } from "mobx";
import { refreshToken } from "../helpers/AuthHelper";
import { ToastsStore } from "react-toasts";

class PlannerStore {
  plannerTasks = []

  constructor() {
    makeAutoObservable(this);
  }

  getPlannerTasks = async ({setError}) => {
    try {
      await refreshToken();
      const resp = await fetch(`${process.env.REACT_APP_URL}/api/periodic_task/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });

      const res = await resp.json();
      this.plannerTasks = [...res.results];

      setError("");
    } catch (e) {
      setError(e.message);
    }
  }

  getCrontab = async ({setError, crontabId}) => {
    try {
      await refreshToken();
      const resp = await fetch(`${process.env.REACT_APP_URL}/api/crontab_schedule/${crontabId}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });

      const res = await resp.json();

      return res.results
    } catch (e) {
      setError(e.message);
    }
  }

  postCrontab = async ({setError, planner, script, variables, hosts}) => {
    try {
      await refreshToken();

      const {period} = planner

      const resp = await fetch(`${process.env.REACT_APP_URL}/api/crontab_schedule/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({minute: period[0], hour: period[2], day_of_week: period[4], day_of_month: period[6], month_of_year: period[8]})
      });

      if( resp.status === 201 ){
        const res = await resp.json()
        await this.postTask({
          setError,
          taskData: {name: script.name, crontab: res.pk, enabled: false, kwargs: JSON.stringify({playbook_id: script.playbook_id, variables, store_groups: hosts.groups})}
        })
      }
    } catch (e) {
      setError(e.message);
    }
  }

  postTask = async ({setError, taskData}) => {
    try {
      await refreshToken();
      const resp = await fetch(`${process.env.REACT_APP_URL}/api/periodic_task/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData)
      });

      const res = await resp.json();

      if(res.resultCode === 200 ){}
    } catch (e) {
      setError(e.message);
    }
  }
}

export default new PlannerStore();
