import { computed, observable, action, makeAutoObservable, toJS } from "mobx";
import { computedFn } from "mobx-utils";
import { refreshToken } from "../helpers/AuthHelper";

class ScriptsStore {
  scripts = [];
  tags = [];

  constructor() {
    makeAutoObservable(this);
  }

  scriptsByTags = computedFn((tags) => {
    console.log(tags);
    if(!tags.length) {
      console.log(this.scripts);
      return this.scripts;
    }
    return this.scripts.filter(script => tags.every(tag => script.tags && script.tags.includes(tag)));
  });

  createTags = (scripts) => {
    scripts.forEach(script => {
      script.tags && script.tags.forEach(tag => {
        if(!this.tags.includes(tag)) {
          this.tags.push(tag);
        }
      })
    })
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

  updateScript = async({source, script, setError}) => {
    try {
      await refreshToken();

      const resp = await fetch(`https://staptest.mcd-cctv.com/api/ansible_playbook/${script.playbook_id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source,
          // tags: script.tags,
          name: script.name
        }),
      });
      if (resp.status === 200) {
        console.log('ok')
        setError("");
      } else setError("Some error");
    } catch (e) {
      setError(e.message);
    }
  }

}

export default new ScriptsStore();
