import styles from "./files-row.module.scss";
import { MoreIcon, PathIcon } from "icons";
import ButtonIcon from "components/buttons/ButtonIcon";
import Checkbox from "components/Checkbox";
// import minFiles from "images/min-files.jpg";
import image from "images/accountIcon.png";
import {
  getFileFormat,
  getFileName,
  getIconForFile,
  getTypeIconForFile,
} from "../../../helpers/functions";
import DateComp from "../../Date";

export default function FilesRow({ file }) {
  return (
    <tr className={styles.tableRow}>
      <td>
        <div className={styles.flex}>
          <Checkbox className={styles.margin} />
          <div className={styles.info}>
            <ButtonIcon
              Icon={getIconForFile(getFileFormat(getFileName(file.file, "/")))}
              type={getTypeIconForFile(
                getFileFormat(getFileName(file.file, "/"))
              )}
            />
            <p className={styles.name}>{getFileName(file.file, "/")}</p>
          </div>
        </div>
      </td>
      {/*<td className={styles.text}>64 files</td>*/}
      <td className={styles.text}>
        <DateComp date={file.created} />
      </td>
      {/*<td className={styles.text}>17 March 2021</td>*/}
      <td>
        <ButtonIcon Icon={MoreIcon} />
      </td>
    </tr>
  );
}
