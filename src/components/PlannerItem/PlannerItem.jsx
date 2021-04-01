import styles from "./plannerItem.module.scss";
import ButtonIcon from "../buttons/ButtonIcon/ButtonIcon";
import { MoreIcon, PathIcon, PlayIcon } from "../../icons/icons";
import cn from "classnames";

export default function PlannerItem({
  text,
  Icon = () => null,
  iconColor,
  hasError,
}) {
  return (
    <tr className={cn({ [styles.errorContainer]: hasError })}>
      <td>
        <ButtonIcon Icon={Icon} type={iconColor} />
      </td>
      <td className={styles.plannerItem__text}>{text}</td>
      <td className={styles.plannerItem__date}>16 March 2021</td>
      <td className={styles.plannerItem__period}>
        11:00, 13:00, 15:00 Every day
      </td>
      <td className={styles.plannerItem__end}>13.01.2021</td>
      <td>
        <ButtonIcon Icon={PathIcon} />
      </td>
      <td>
        <ButtonIcon Icon={MoreIcon} />
      </td>
    </tr>
  );
}
