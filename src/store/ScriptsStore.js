import { computed, observable, action, makeAutoObservable, toJS } from "mobx";
import { computedFn } from "mobx-utils";
import { refreshToken } from "../helpers/AuthHelper";

class ScriptsStore {
  scripts = [];
  tags = [];
  hosts = {};
  logs = [];
  logInfo = {};

  constructor() {
    makeAutoObservable(this);
  }

  scriptsByTags = computedFn((tags) => {
    console.log(tags);
    if (!tags.length) {
      console.log(this.scripts);
      return this.scripts;
    }
    return this.scripts.filter((script) =>
      tags.every((tag) => script.tags && script.tags.includes(tag))
    );
  });

  createTags = (scripts) => {
    scripts.forEach((script) => {
      script.tags &&
        script.tags.forEach((tag) => {
          if (!this.tags.includes(tag)) {
            this.tags.push(tag);
          }
        });
    });
  };

  getScripts = async (setError) => {
    try {
      await refreshToken();

      const resp = await fetch(
        "https://staptest.mcd-cctv.com​/api/ansible_playbook/?limit=9999&offset=0",
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      const res = await resp.json();
      this.createTags(res.results);
      this.scripts = [...res.results];
      console.log(toJS(this.scripts));
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  updateScript = async ({ source, script, setError }) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/ansible_playbook/${script.playbook_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source,
            // tags: script.tags,
            name: script.name,
          }),
        }
      );
      if (resp.status === 200) {
        console.log("ok");
        setError("");
      } else setError("Some error");
    } catch (e) {
      setError(e.message);
    }
  };

  launchScript = async ({ hosts, variables, playbook_id, setError }) => {
    const newVariables = { ...variables };
    Object.keys(newVariables).forEach(
      (key) => !newVariables[key] && delete newVariables[key]
    );
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/execute_playbook/${playbook_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            servers: hosts.hosts,
            groups: hosts.groups,
            variables: newVariables,
          }),
        }
      );
      if (resp.status === 200) {
        const res = resp.json();
        setError("");
      } else setError("Some error");
    } catch (e) {
      setError(e.message);
    }
  };

  getHosts = async (setError) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/available_hosts/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      if (resp.status === 200) {
        const res = await resp.json();
        this.hosts = { ...res };
        console.log(res);
        setError("");
      } else setError("Some error");
    } catch (e) {
      setError(e.message);
    }
  };

  getScriptsLogs = async (setError) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/running_playbooks/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      if (resp.status === 200) {
        const res = await resp.json();
        this.logs = res.tasks;
        console.log(res);
        setError("");
      } else setError("Some error");
    } catch (e) {
      setError(e.message);
    }
  };

  getScriptLogInfo = async ({task_id, setError}) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/execution_status/${task_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      if (resp.status === 200) {
        const res = await resp.json();
        this.logInfo = res;
        console.log(res);
        setError("");
      } else setError("Some error");
    } catch (e) {
      setError(e.message);
    }
  };
}

export default new ScriptsStore();
