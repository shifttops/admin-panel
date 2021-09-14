import { MoreIcon, SortIcon } from "icons";
import styles from "./edit.module.scss";
import Button from "../../../components/buttons/Button";
import AceEditor, { diff as DiffEditor } from "react-ace";

import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-github";

import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import ScriptsStore from "../../../store/ScriptsStore";

const InnerEdit = observer(() => {
  const [isComparingMode, setIsComparingMode] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const { scripts, getScripts, updateScript } = ScriptsStore;
  const scriptId =
    +location.pathname.split("/")[location.pathname.split("/").length - 2];

  const [value, setValue] = useState(["", ""]);

  const handleChange = (newValue) => {
    setValue((prev) => (isComparingMode ? newValue : [newValue, prev[1]]));
  };

  const handleSave = () => {
    updateScript({
      source: value[0],
      script: scripts.find((script) => script.playbook_id === scriptId),
      setError,
    });
  };

  const handleCompare = () => {
    setIsComparingMode((prev) => !prev);
  };

  useEffect(() => {
    if (!scripts.length) {
      getScripts(setError);
    }
  }, []);

  useEffect(() => {
    if (scripts.length && !value[0]) {
      const temp = scripts.find((script) => script.playbook_id === scriptId);
      const parentSource = scripts.find(
        (parent) => temp?.parent_id === parent.playbook_id
      )?.source;
      setValue([temp?.source, parentSource ? parentSource : ""]);
    }
  }, [scripts]);

  return (
    <div className={styles.page}>
      {scripts.length ? (
        <>
          <div className={styles.buttons}>
            {isComparingMode ? (
              <DiffEditor
                className={styles.editor}
                value={value}
                height="500px"
                width="100%"
                setOptions={{
                  useWorker: true,
                }}
                showGutter
                mode="yaml"
                onChange={handleChange}
              />
            ) : (
              <AceEditor
                mode="yaml"
                onChange={handleChange}
                name="UNIQUE_ID_OF_DIV"
                value={value[0]}
                showPrintMargin
                showGutter={true}
                highlightActiveLine
                setOptions={{
                  showLineNumbers: true,
                  tabSize: 4,
                }}
                width={"100%"}
                editorProps={{ $blockScrolling: false }}
              />
            )}
          </div>

          <div className={styles.buttons}>
            <Button text="Save" onClick={handleSave} />
            <Button
              text={isComparingMode ? "Hide diff" : "Show diff"}
              onClick={handleCompare}
              className="orange"
            />
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
});
export default InnerEdit;
