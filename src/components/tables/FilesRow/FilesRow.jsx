import styles from "./files-row.module.scss";
import { MoreIcon, PathIcon } from "icons";
import ButtonIcon from "components/buttons/ButtonIcon";
import Checkbox from "components/Checkbox";
// import minFiles from "images/min-files.jpg";
import image from "images/accountIcon.png";

export default function FilesRow({ file }) {
  return (
    <tr className={styles.tableRow}>
      <td>
        <div className={styles.flex}>
          <Checkbox className={styles.margin} />
          <div className={styles.info}>
            <img className={styles.img} src={image} />
            <p className={styles.name}>{file}</p>
          </div>
        </div>
      </td>
      <td className={styles.text}>64 files</td>
      <td className={styles.text}>16 March 2021</td>
      <td className={styles.text}>17 March 2021</td>
      <td>
        <ButtonIcon Icon={MoreIcon} />
      </td>
    </tr>
  );
}
