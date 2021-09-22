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
import { useLocation, useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import ScriptsStore from "../../../store/ScriptsStore";
import { autorun, observe, reaction, toJS } from "mobx";
import routes from "../../../constants/routes";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import Popup from "reactjs-popup";
import CheckoutsPopup from "../../../components/popups/CheckoutsPopup/CheckoutsPopup";
import { useRef } from "react";

const InnerEdit = observer((props) => {
  const [isComparingMode, setIsComparingMode] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const location = useLocation();
  const {
    scripts,
    parentScriptSource,
    presets,
    script,
    getScripts,
    updateScript,
    copyScript,
    getScript,
    getPresets,
  } = ScriptsStore;

  const ref = useRef(null);

  // const [script, setScript] = useState({
  //   ...scripts.find(
  //     (script) =>
  //       script.playbook_id ===
  //       +location.pathname.split("/")[location.pathname.split("/").length - 2]
  //   ),
  // });

  const [name, setName] = useState();

  const handleChange = (newValue) => {
    script.current = {
      ...script.current,
      source: isComparingMode ? newValue[0] : newValue,
    };
  };

  const handleSave = async () => {
    if (script.current.playbook_id) {
      const initialScript = scripts.find(
        (initial) => initial.playbook_id === script.current.playbook_id
      );
      if (
        initialScript.source !== script.current.source ||
        initialScript.name !== script.current.name
      ) {
        const newScript = await updateScript({
          script: script.current,
          setError,
        });
        scripts.splice(
          0,
          scripts.findIndex(
            (findScript) =>
              findScript.playbook_id === script.current.playbook_id
          ),
          newScript
        );
        history.push(`${routes.scripts}/${newScript.playbook_id}/mode=edit`);
      } else {
        ToastsStore.error("Scripts are equal", 3000, "toast");
      }
    } else {
      if (script.current.name && script.current.source) {
        const newScript = await updateScript({
          script: script.current,
          setError,
        });
        if (newScript) {
          scripts.push(newScript);
          history.push(`${routes.scripts}/${newScript.playbook_id}/mode=edit`);
        }
      } else {
        ToastsStore.error("Name and source are required", 3000, "toast");
      }
    }
  };

  const handleCopy = async () => {
    if (script.current.playbook_id) {
      const newScript = await copyScript({
        playbook_id: script.current.playbook_id,
        setError,
      });
      if (newScript) {
        scripts.push(newScript);
        history.push(`${routes.scripts}/${newScript.playbook_id}/mode=edit`);
      }
    } else {
      ToastsStore.error("There is nothing to copy", 3000, "toast");
    }
  };

  const handleCompare = () => {
    setIsComparingMode((prev) => !prev);
  };

  const handleNameChange = (newName) => {
    script.current = {
      ...script.current,
      name: newName,
    };
  };

  useEffect(() => {
    console.log(scripts);
    if (!scripts.length) {
      console.log(123123);
      getScripts(setError);
    }
  }, [scripts.length]);

  // useEffect(() => {
  //   console.log(script.current.playbook_id, ref.current);
  //   if (script.current.playbook_id && ref.current) {
  //     getPresets(script.current.playbook_id);
  //   }
  // }, [script.current.playbook_id]);

  // const autorun1 = autorun(() => getPresets(script.current.playbook_id));
  // const reaction2 = reaction(
  //   () => script.current.playbook_id,
  //   (id, reaction) => {
  //     console.log(123,id);
  //     // if()
  //     getPresets(id);
  //   }
  // );

  useEffect(() => {
    if (scripts && !script.current.playbook_id) {
      script.current = {
        ...scripts.find(
          (script) =>
            script.playbook_id === +props.match.params.id
        ),
      };
      // setScript({
      //   ...scripts.find(
      //     (script) =>
      //       script.playbook_id ===
      //       +location.pathname.split("/")[
      //         location.pathname.split("/").length - 2
      //       ]
      //   ),
      // });
    }
  }, [scripts.length]);

  useEffect(() => {
    if (scripts.length) {
      // if (!Object.keys(script).length) {
      //   console.log(123);
      //   setScript({
      //     ...scripts.find(
      //       (script) =>
      //         script.playbook_id ===
      //         +location.pathname.split("/")[
      //           location.pathname.split("/").length - 2
      //         ]
      //     ),
      //   });
      // }
      if (script.current?.parent_id) {
        getScript({ parent_id: script.current?.parent_id, setError });
      }
    }
  }, [script.current]);

  
  useEffect(() => {
    
    // if (script.playbook_id) {
    //   getPresets(script.playbook_id);
    // }
    ref.current = true;
  }, []);

  return (
    <div className={styles.page}>
      {scripts.length ? (
        <>
          <input
            type="text"
            className={styles.dashboardHead__title}
            value={script.current?.name || ""}
            onChange={(e) => handleNameChange(e.target.value)}
          />
          <div className={styles.buttons}>
            {isComparingMode ? (
              <DiffEditor
                className={styles.editor}
                value={[script.current?.source, parentScriptSource]}
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
                value={script.current?.source}
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

            <Popup modal trigger={<Button text="Checkout" />}>
              {(close) => (
                <CheckoutsPopup onClose={close} playbook={script.current} />
              )}
            </Popup>

            <Button text="Copy" onClick={handleCopy} />
            <Button
              text={isComparingMode ? "Hide diff" : "Show diff"}
              onClick={handleCompare}
              className="orange"
            />
          </div>
          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.BOTTOM_RIGHT}
          />
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
});
export default InnerEdit;
