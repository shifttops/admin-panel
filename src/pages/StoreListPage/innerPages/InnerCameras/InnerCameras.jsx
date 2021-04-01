import Button from "../../../../components/buttons/Button";
import ButtonIcon from "../../../../components/buttons/ButtonIcon/ButtonIcon";
import FileCard from "../../../../components/cards/FileCard/FileCard";
import { OpenPathIcon, SaveVideo } from "../../../../icons/icons";
import styles from "./InnerCamers.module.scss";
import cameraScreen from "../../../../images/cameraScreen.jpg";
import cameraScreen2 from "../../../../images/cameraScreen2.jpg";

export default function InnerCameras() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h2 className={styles.title}>Cameras</h2>
        <div className={styles.buttons}>
          <ButtonIcon Icon={OpenPathIcon} />
          <ButtonIcon Icon={SaveVideo} />
          <Button text="Plan video recording" />
        </div>
      </div>
      <div className={styles.cards}>
        <FileCard screen={cameraScreen} />
        <FileCard screen={cameraScreen2} />
        <FileCard screen={cameraScreen} />
        <FileCard screen={cameraScreen2} />
      </div>
    </div>
  );
}
