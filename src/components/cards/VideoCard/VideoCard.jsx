import styles from "./video-card.module.scss";
import ButtonIcon from "components/buttons/ButtonIcon";
import { MoreIcon } from "icons";
import image from "images/image-files.jpg";
import Checkbox from "components/Checkbox";

export default function VideoCard() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Checkbox />
        <ButtonIcon Icon={MoreIcon} />
      </div>
      <div className={styles.img}>
        <img src={image} />
        <div className={styles.bg}>
          <span>3 min, 23 sec</span>
        </div>
      </div>

      <div className={styles.info}>
        <p className={styles.title}>
          ID: 20209 - <span className={styles.name}>Video_013</span>
        </p>
        <p className={styles.date}>4 days ago</p>
      </div>
    </div>
  );
}