import { MoreIcon, SortIcon } from "icons";
import styles from "./edit.module.scss";
import Button from "../../../components/buttons/Button";
import AceEditor, { diff as DiffEditor } from "react-ace";

import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-github";

import { useState } from "react";
import InnerSidebar from "../../../components/InnerSidebar";
import { innerNavigationScripts } from "../../../constants/inner-navigation";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import ScriptsStore from "../../../store/ScriptsStore";
import { observe } from "mobx";

const initialValue = [
  `
---
receipt:     Oz-Ware Purchase Invoice
date:        2007-08-06
customer:
  given:   Dorothy
  family:  Gale

specialDelivery:  >
  Follow the Yellow Brick
  Road to the Emerald City.
  Pay no attention to the
  man behind the curtain.
---

GitHub Flavored Markdown
========================

Everything from markdown plus GFM features:

## URL autolinking

Underscores_are_allowed_between_words.

## Strikethrough text

GFM adds syntax to strikethrough text, which is missing from standard Markdown.

~~Mistaken text.~~
~~**works with other formatting**~~

~~spans across
lines~~

## Fenced code blocks (and syntax highlighting)

\`\`\`javascript
for (var i = 0; i < items.length; i++) {
console.log(items[i], i); // log them
}
\`\`\`

## Task Lists

- [ ] Incomplete task list item
- [x] **Completed** task list item

## A bit of GitHub spice

* SHA: be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
* User@SHA ref: mojombo@be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
* User/Project@SHA: mojombo/god@be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
* \#Num: #1
* User/#Num: mojombo#1
* User/Project#Num: mojombo/god#1

See http://github.github.com/github-flavored-markdown/.
`,
  `
---
receipt:     Oz-Ware Purchase Invoice
date:        2007-08-06
customer:
  given:   Dorothy
  family:  Gale

specialDelivery:  >
  Follow the Yellow Brick
  Road to the Emerald City.
  Pay no attention to the
  man behind the curtain.
---

GitHub Flavored Markdown
========================
123
`,
];
const InnerEdit = observer(() => {
  const [isComparingMode, setIsComparingMode] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const { scripts, getScripts, updateScript } = ScriptsStore;
  const scriptId =
    +location.pathname.split("/")[location.pathname.split("/").length - 2];

  const [value, setValue] = useState([
    // scripts.find((script) => script.playbook_id === scriptId)?.source,
    "",
    "",
  ]);

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
