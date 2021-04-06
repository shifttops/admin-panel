import styles from "./image-card.module.scss";
import ButtonIcon from "components/buttons/ButtonIcon";
import { MoreIcon } from "icons";
import image from "images/image-files.jpg";
import Checkbox from "components/Checkbox";

export default function ImageCard() {
  return (
    <div className={styles.card}>
      <img src={image} />
      <div className={styles.header}>
        <Checkbox />
        <ButtonIcon Icon={MoreIcon} />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>
          ID: 20209 - <span className={styles.name}>Screenshot_005</span>
        </p>
        <p className={styles.date}>4 days ago</p>
      </div>
    </div>
  );
}
