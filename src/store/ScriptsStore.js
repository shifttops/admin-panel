import {
  computed,
  observable,
  action,
  makeAutoObservable,
  toJS,
  observe,
} from "mobx";
import { computedFn } from "mobx-utils";
import { refreshToken } from "../helpers/AuthHelper";
import { ToastsStore } from "react-toasts";
import routes from "../constants/routes";

class ScriptsStore {
  scripts = [];
  parentScriptSource = "";
  tags = [];
  hosts = {};
  logs = [];
  running_logs = [];
  logInfo = {};
  checkouts = {};
  presets = [];
  script = { current: {} };
  preset = { current: {} };

  constructor() {
    makeAutoObservable(this);
    this.disposer = observe(this.script, (change) => {
      if (
        change.oldValue.playbook_id !== change.object[change.name].playbook_id
      ) {
        this.getPresets(change.object[change.name].playbook_id);
      }
    });
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

  getPresets = async (script_id) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com​/api/ansible_playbook/${script_id}/presets`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      const res = await resp.json();
      // this.createTags(res.results);
      // this.scripts = [...res.results];
      // console.log(toJS(this.scripts));
      console.log(res);
      this.presets = res;
      // setError("");
    } catch (e) {
      // setError(e.message);
      console.log(e.message);
    }
  };

  getScript = async ({ parent_id, setError }) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com​/api/ansible_playbook/${parent_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      const res = await resp.json();
      this.parentScriptSource = res.source;
      console.log(res);
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  copyScript = async ({ playbook_id, setError }) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/ansible_playbook/${playbook_id}/copy`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   source: script.source,
          //   name: script.name,
          // }),
        }
      );
      if (resp.status === 201) {
        setError("");
        return resp.json();
      } else {
        const res = await resp.json();
        ToastsStore.error(res.error, 3000, "toast");
        // setError("Some error");
        return null;
      }
    } catch (e) {
      setError(e.message);
    }
  };

  updateScript = async ({ script, setError }) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/ansible_playbook/${
          script.playbook_id ? script.playbook_id : ""
        }`,
        {
          method: script.playbook_id ? "PATCH" : "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source: script.source,
            name: script.name,
          }),
        }
      );
      if (resp.status === 201) {
        setError("");
        return resp.json();
      } else {
        const res = await resp.json();
        ToastsStore.error(res.error, 3000, "toast");
        // setError("Some error");
        return null;
      }
    } catch (e) {
      setError(e.message);
    }
  };

  getCheckouts = async ({ playbook_id, setError }) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/ansible_playbook/${playbook_id}/checkout`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      const res = await resp.json();
      if (resp.status === 200) {
        this.checkouts = res;
        console.log(res);
      } else {
        const res = await resp.json();
        ToastsStore.error(res.error, 3000, "toast");
        // setError("Some error");
        return null;
      }
    } catch (e) {
      setError(e.message);
    }
  };

  checkoutScript = async ({ playbook_id, checkout_id, setError }) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/ansible_playbook/${playbook_id}/checkout/${checkout_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.status === 200) {
        setError("");
        console.log("CHECKOUT !!");
        return resp.json();
      } else {
        const res = await resp.json();
        ToastsStore.error(res.error, 3000, "toast");
        // setError("Some error");
        return null;
      }
    } catch (e) {
      setError(e.message);
    }
  };

  launchScript = async ({ hosts, variables, playbook_id, setError }) => {
    const newVariables = { ...variables };
    Object.keys(newVariables).forEach(
      (key) => !newVariables[key] && delete newVariables[key]
    );
    if (!playbook_id) {
      ToastsStore.error("This is an empty script", 3000, "toast");
      return null;
    }
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
        return resp.json();
      } else {
        const res = await resp.json();
        ToastsStore.error(res.error, 3000, "toast");
        return null;
      }
    } catch (e) {
      // setError(e.message);
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  createPreset = async ({ name, script_id, hosts, variables, setError }) => {
    const newVariables = Object.keys(variables)
      .filter((key) => variables[key])
      .map((key) => ({
        variable: key,
        value: variables[key],
      }));
    if (!script_id) {
      ToastsStore.error("This is an empty script", 3000, "toast");
      return null;
    }
    try {
      await refreshToken();
      const resp = await fetch(
        `https://staptest.mcd-cctv.com​/api/ansible_playbook_preset/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            playbooks: [script_id],
            hosts: hosts.hosts,
            groups: hosts.groups,
            mappings: newVariables,
          }),
        }
      );
      if (resp.status === 201) {
        setError("");
        const res = await resp.json();
        ToastsStore.success(`${name} created successfully`, 3000, "toast");
      } else {
        const res = await resp.json();
        ToastsStore.error(res.error, 3000, "toast");
        // setError("Some error");
        return null;
      }
    } catch (e) {
      setError(e.message);
    }
  };

  getHosts = async (setError) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/available_hosts`,
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
        `https://staptest.mcd-cctv.com/api/ansible_playbook_logs/?limit=99`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      if (resp.status === 200) {
        const res = await resp.json();
        this.logs = res.results;
        console.log(toJS(this.logs));
        setError("");
      } else setError("Some error");
    } catch (e) {
      setError(e.message);
    }
  };

  handleRemove = async ({ playbook_id, setError }) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/ansible_playbook/${playbook_id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      if (resp.status === 204) {
        this.getScripts(setError);
        setError("");
      } else setError("Some error");
    } catch (e) {
      setError(e.message);
    }
  };

  getScriptsRunningLogs = async (setError) => {
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
        this.running_logs = res.tasks;
        console.log(toJS(this.running_logs));
        setError("");
      } else setError("Some error");
    } catch (e) {
      setError(e.message);
    }
  };

  getScriptLogInfo = async ({ task_id, setError }) => {
    try {
      await refreshToken();

      const resp = await fetch(
        `https://staptest.mcd-cctv.com/api/${
          +task_id == task_id ? "ansible_playbook_logs/" : "execution_status/"
        }${task_id}`,
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
