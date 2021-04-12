import styles from "./inner-camers.module.scss";
import ButtonIcon from "components/buttons/ButtonIcon";
import { OpenPathIcon, RefreshIcon, SaveVideo } from "icons";
import Button from "components/buttons/Button";
import FileCard from "components/cards/FileCard";
import cameraScreen from "images/cameraScreen.jpg";
import cameraScreen2 from "images/cameraScreen2.jpg";

export default function InnerCameras() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h2 className={styles.title}>Cameras</h2>
        <div className={styles.buttons}>
          <ButtonIcon Icon={OpenPathIcon} />
          <ButtonIcon Icon={SaveVideo} />
          <ButtonIcon Icon={RefreshIcon} />
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
