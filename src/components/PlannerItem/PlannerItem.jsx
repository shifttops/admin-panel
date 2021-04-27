import styles from "./planner-item.module.scss";
import ButtonIcon from "../buttons/ButtonIcon/ButtonIcon";

import cn from "classnames";
import { MoreIcon, PathIcon } from "icons";

export default function PlannerItem({
  text,
  Icon = () => null,
  iconColor,
  hasError,
  globalStore,
  className,
}) {
  return (
    <tr className={cn({ [styles.errorContainer]: hasError })}>
      <td>
        <ButtonIcon Icon={Icon} type={iconColor} />
      </td>
      {globalStore && <td className={styles.store}>20209</td>}
      <td className={styles.plannerItem__text + " " + className}>{text}</td>
      <td className={styles.plannerItem__date}>16 March 2021</td>
      <td className={styles.plannerItem__period}>
        11:00, 13:00, 15:00 Every day
      </td>
      <td className={styles.plannerItem__end}>13.01.2021</td>
      <td className={styles.buttons}>
        <div className={styles.buttonsWrap}>
          <ButtonIcon Icon={PathIcon} />
          <ButtonIcon Icon={MoreIcon} />
        </div>
      </td>
    </tr>
  );
}
