import { makeAutoObservable } from "mobx";
import { refreshToken } from "../helpers/AuthHelper";
import { ToastsStore } from "react-toasts";

class PlannerStore {
  plannerTasks = [];
  isFetching = false;

  constructor() {
    makeAutoObservable(this);
  }

  getPlannerTasks = async ({ setError }) => {
    try {
      await refreshToken();

      this.isFetching = true;

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/periodic_task/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      const res = await resp.json();
      this.plannerTasks = [...res.results];

      setError("");
      this.isFetching = false;
    } catch (e) {
      setError(e.message);
      this.isFetching = false;
    }
  };

  getCrontab = async ({ setError, crontabId }) => {
    try {
      await refreshToken();
      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/crontab_schedule/${crontabId}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (resp.status === 200) {
        return await resp.json();
      } else {
        const res = await resp.json();
        ToastsStore.error(`Crontab ${crontabId} ${res.detail}`, 3000, "toast");
        return null;
      }
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  addCrontab = async ({
    setError,
    planner,
    script,
    variables,
    hosts,
    task_name,
  }) => {
    try {
      await refreshToken();

      let { period, endDate, startDate } = planner;
      period = period.split(" ");

      // const resp = await fetch(
      //   `${process.env.REACT_APP_URL}/api/crontab_schedule/`,
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Token ${localStorage.getItem("access")}`,
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       minute: period[0],
      //       hour: period[1],
      //       day_of_week: period[4],
      //       day_of_month: period[2],
      //       month_of_year: period[3],
      //     }),
      //   }
      // );

      // if (resp.status === 201) {
      //   const res = await resp.json();
      await this.addPeriodicTask({
        setError,
        taskData: {
          name: task_name,
          // crontab: res.pk,
          enabled: false,
          kwargs: JSON.stringify({
            playbook_id: script.playbook_id,
            variables,
            store_groups: hosts.groups,
            server_ids: hosts.hosts,
          }),
          expires: endDate,
          start_time: startDate,
          crontab: {
            minute: period[0],
            hour: period[1],
            day_of_week: period[4],
            day_of_month: period[2],
            month_of_year: period[3],
          },
        },
      });
      // } else {
      //   const res = await resp.json();
      //   ToastsStore.error(res.error, 3000, "toast");
      // }
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  addPeriodicTask = async ({ setError, taskData }) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/periodic_task/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        }
      );

      if (resp.status !== 201) {
        const res = await resp.json();
        ToastsStore.error(res.detail, 3000, "toast");
      }
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  handleChangeTask = async ({ task, period }) => {
    try {
      await refreshToken();

      const body = { ...task };
      if (period.minute) {
        body.crontab = period;
      } else {
        body.crontab = {};
      }
      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/periodic_task/${task.pk}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (resp.status !== 200) {
        const res = await resp.json();
        ToastsStore.error(res.detail, 3000, "toast");
      }
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  deleteTask = async (pk) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/periodic_task/${pk}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      if (resp.status === 204) {
        this.plannerTasks.splice(
          this.plannerTasks.findIndex((item) => item.pk === pk),
          1
        );
      } else {
        const res = await resp.json();
        ToastsStore.error(res.detail, 3000, "toast");
      }
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
    }
  };
}

export default new PlannerStore();
