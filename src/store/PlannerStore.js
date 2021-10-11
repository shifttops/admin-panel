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

      if(resp.status === 200){
        return await resp.json()
      }else {
        const res = await resp.json();
        ToastsStore.error(`Crontab ${crontabId} ${res.detail}`, 3000, "toast");
        return null
      }
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  }

  addCrontab = async ({setError, planner, script, variables, hosts}) => {
    try {
      await refreshToken();

      let { period, endDate, startDate } = planner
      period = period.split(" ");

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/crontab_schedule/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            minute: period[0],
            hour: period[1],
            day_of_week: period[2],
            day_of_month: period[3],
            month_of_year: period[4],
          }),
        }
      );

      if (resp.status === 201) {
        const res = await resp.json();
        await this.addPeriodicTask({
          setError,
          taskData: {
            name: script.name,
            crontab: res.pk,
            enabled: false,
            kwargs: JSON.stringify({
              playbook_id: script.playbook_id,
              variables,
              store_groups: hosts.groups,
              server_ids: hosts.hosts
            }),
            expires: endDate,
            start_time: startDate
          },
        });
      }
      else {
        const res = await resp.json();
        ToastsStore.error(res.error, 3000, "toast");
      }
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  }

  addPeriodicTask = async ({setError, taskData}) => {
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

      if(resp.status !== 201) {
        const res = await resp.json();
        ToastsStore.error(res.error, 3000, "toast");
      }
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  }
}

export default new PlannerStore();
