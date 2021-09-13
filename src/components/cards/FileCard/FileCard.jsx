import styles from "./file-card.module.scss";
import ButtonIcon from "components/buttons/ButtonIcon";
import { MoreIcon } from "icons";

export default function FileCard({ camera }) {
  return (
    <div className={styles.card}>
      <img src={camera.preview ? `data:image/png;base64,${camera.preview}` : 'https://i.imgur.com/OVmimIN.jpg'} alt="" />
      <div className={styles.cameraDescr}>
        <div className={styles.info}>
          <p className={styles.cameraName}>{`${camera.view_name} .${
            camera.ip_address && camera.ip_address.split(".")[
              camera.ip_address.split(".").length - 1
            ]
          }`}</p>
          <ButtonIcon Icon={MoreIcon} className={styles.cardMore} />
        </div>
      </div>
    </div>
  );
}
