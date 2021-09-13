import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import { MoreIcon, SortIcon } from "icons";
import styles from "./files-page.module.scss";
import Button from "components/buttons/Button";
import FilesTableHead from "components/tables/FilesTableHead";
import FilesFolderRow from "components/tables/FilesFolderRow";
import InnerSidebar from "../../components/InnerSidebar";
import Checkbox from "components/Checkbox";
import routes from "../../constants/routes";
import InnerEdit from "./InnerEdit/InnerEdit";
import InnerLaunch from "./InnerLaunch/InnerLaunch";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import ScriptsStore from "../../store/ScriptsStore";
import { computed, toJS } from "mobx";

const FilesPage = observer(() => {
  const location = useLocation();
  const history = useHistory();
  const { tags, getScripts, scriptsByTags } = ScriptsStore;
  const [error, setError] = useState("");
  const [enabledTags, setEnabledTags] = useState([]);
  // const [links, setLinks] = useState([
  //   {
  //     to: `${routes.scriptsEdit}`,
  //     name: "Edit",
  //     component: <InnerEdit />,
  //   },
  //   {
  //     to: `${routes.scripts}`,
  //     name: "Launch",
  //     component: <InnerLaunch />,
  //   },
  // ]);

  const handleTagClick = (tag) => {
    if (enabledTags.includes(tag)) {
      setEnabledTags((prev) => {
        prev.splice(prev.indexOf(tag), 1);
        return [...prev];
      });
    } else {
      setEnabledTags((prev) => [...prev, tag]);
    }
  };

  const handleScriptClick = (id) => {
    history.push(`${routes.scripts}/${id}/mode=edit`);
  };

  useEffect(() => {
    // if (!location.search) {
    //   history.replace(links[0].to);
    //   console.log(location.search);
    // }
    getScripts(setError);
    // setLinks((prev) => [
    //   ...prev,
    //   {
    //     to: `${routes.scripts}?mode=launch`,
    //     name: "Launch",
    //     component: <InnerLaunch />,
    //   },
    // ]);
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* <InnerSidebar links={links} /> */}
      <div className={styles.page}>
        <div className={styles.pageHead}>
          <div className={styles.pageInfo}>
            <h2 className={styles.title}>Scripts</h2>
            <SearchQuick />
            <ButtonIcon Icon={SortIcon} className={styles.btnIcon} />
          </div>
          <div className={styles.button}>
            <Button text="Upload file" />
          </div>
        </div>
        <div className={styles.tags}>
          Tags:{" "}
          {tags.map((tag) => (
            <button
              key={tag}
              className={`${styles.tag} ${
                enabledTags.includes(tag) ? styles.enabledTag : ""
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className={styles.scripts}>
          {scriptsByTags(enabledTags).map((script) => (
            <div
              className={styles.scriptBlock}
              key={script.playbook_id}
              onClick={() => handleScriptClick(script.playbook_id)}
            >
              <span className={styles.name}>Name: {script.name}</span>

              <div className={styles.tags}>
                {script.tags &&
                  script.tags.map(
                    (tag) => (
                      <button key={tag} className={styles.tag}>
                        {tag}
                      </button>
                    )
                  )}
              </div>
              <span>Number of executions: {script.number_of_executions}</span>
              <span>
                Successfull executions: {script.successfull_executions}
              </span>
              <span>
                Last updated:{" "}
                {`${new Date(
                  script.date_created
                ).toLocaleDateString()} ${new Date(
                  script.date_created
                ).toLocaleTimeString("en-US", { hour12: false })}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default FilesPage;
