import styles from "./file-card.module.scss";
import ButtonIcon from "components/buttons/ButtonIcon";
import { MoreIcon } from "icons";

export default function FileCard({ screen }) {
  return (
    <div className={styles.card}>
      <img src={screen} alt="" />
      <div className={styles.cameraDescr}>
        <div className={styles.info}>
          <p className={styles.cameraName}>Camera #52</p>
          <ButtonIcon Icon={MoreIcon} />
        </div>
        <span className={styles.date}>Updated a day ago</span>
      </div>
    </div>
  );
}
