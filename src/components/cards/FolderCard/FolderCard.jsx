import styles from "./folder-card.module.scss";
import Checkbox from "components/Checkbox";
import ButtonIcon from "components/buttons/ButtonIcon";
import { MoreIcon } from "icons";

export default function FolderCard() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Checkbox />
        <ButtonIcon Icon={MoreIcon} />
      </div>
      <p className={styles.title}>Screenshots</p>
      <p className={styles.info}>
        Updated a day ago
        <span>64 files</span>
      </p>
    </div>
  );
}
