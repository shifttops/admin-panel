import styles from "./file-card.module.scss";
import ButtonIcon from "components/buttons/ButtonIcon";
import { MoreIcon } from "icons";
import { useState } from "react";
import Loader from "../../Loader";

const FileCard = ({ camera }) => {
  const [isImageReady, setIsImageReady] = useState(false);

  return (
    <div className={styles.card}>
      <img
        onLoad={() => setIsImageReady(true)}
        onError={() => setIsImageReady(false)}
        src={
          camera.preview
            ? `${process.env.REACT_APP_URL}${camera.preview}`
            : "https://i.imgur.com/OVmimIN.jpg"
        }
        alt=""
      />
      {!isImageReady ? (
        <div className={styles.loader}>
          <Loader types={["medium", "grey"]} />
        </div>
      ) : null}
      <div className={styles.cameraDescr}>
        <div className={styles.info}>
          <p className={styles.cameraName}>{`${camera.view_name} .${
            camera.ip_address &&
            camera.ip_address.split(".")[
              camera.ip_address.split(".").length - 1
            ]
          }`}</p>
          <ButtonIcon Icon={MoreIcon} className={styles.cardMore} />
        </div>
      </div>
    </div>
  );
};

export default FileCard;
