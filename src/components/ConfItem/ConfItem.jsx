import styles from "./conf-item.module.scss";
import ButtonIcon from "../buttons/ButtonIcon";
// import { EditIcon, MoreIcon, PathIcon } from "icons";
import DateComp from "../Date";
import {
  getFileFormat,
  getFileName,
  getIconForFile,
  getTypeIconForFile,
} from "../../helpers/functions";
import { ToastsStore } from "react-toasts";
import { useState } from "react";
import Loader from "../Loader";

const ConfItem = ({ file: { filename, date_upload }, download }) => {
  const [name] = useState(getFileName(filename, "/"));
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (name.includes("suffix")) {
      setIsLoading(true);
      const suffix = name.split("_").slice(2).join("_").split(".")[0];
      const store_id = name.split("_")[0];

      await download({ suffix, store_id, fileName: name });
      setIsLoading(false);
    } else ToastsStore.error("Version of this file is old.", 3000, "toast");
  };

  return (
    <tr>
      <td>
        {!isLoading ? (
          <ButtonIcon
            Icon={getIconForFile(getFileFormat(name))}
            type={getTypeIconForFile(getFileFormat(name))}
            onClick={handleClick}
          />
        ) : (
          <div className={styles.loader}>
            <Loader types={["small"]} />
          </div>
        )}
      </td>
      <td className={styles.text}>{name}</td>
      {/*<td className={styles.date}>4 days ago</td>*/}
      <td className={styles.period}>
        <DateComp date={date_upload} />
      </td>
      {/*      <td className={styles.buttons}>
        <ButtonIcon Icon={EditIcon} />
        <ButtonIcon Icon={MoreIcon} />
      </td>*/}
    </tr>
  );
};

export default ConfItem;
