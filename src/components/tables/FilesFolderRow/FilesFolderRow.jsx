import styles from "./files-folder-row.module.scss";
import { MoreIcon } from "icons";
import ButtonIcon from "components/buttons/ButtonIcon";
import Checkbox from "components/Checkbox";

export default function FilesFolderRow({ label }) {
  return (
    <tr>
      <td className={styles.name}>
        <Checkbox label={label} />
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
