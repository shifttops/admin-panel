import styles from "./conf-item.module.scss";
import ButtonIcon from "../buttons/ButtonIcon";
import { EditIcon, MoreIcon, PathIcon } from "icons";

export default function ConfItem({ Icon = () => null, iconColor }) {
  return (
    <tr>
      <td>
        <ButtonIcon Icon={Icon} type={iconColor} />
      </td>
      <td className={styles.text}>
        Configuration - <span>13.01.2021</span>
      </td>
      <td className={styles.date}>4 days ago</td>
      <td className={styles.period}>16 March 2021</td>
      <td className={styles.buttons}>
        <ButtonIcon Icon={EditIcon} />
        <ButtonIcon Icon={MoreIcon} />
      </td>
    </tr>
  );
}
