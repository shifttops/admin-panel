import styles from "./video-card.module.scss";
import ButtonIcon from "components/buttons/ButtonIcon";
import { MoreIcon } from "icons";
import image from "images/image-files.jpg";
import Checkbox from "components/Checkbox";
import { getFileName } from "../../../helpers/functions";
import DateComp from "../../Date";

const VideoCard = ({ file }) => {
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
        <div>
          <span className={styles.name}>{getFileName(file.file, "/")}</span>
          <p className={styles.date}>
            {file.created ? <DateComp timeOnly date={file.created} /> : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
