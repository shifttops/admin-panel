import { MoreIcon } from "../../../icons/icons";
import ButtonIcon from "../../buttons/ButtonIcon/ButtonIcon";
import styles from "./FileCard.module.scss";

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
