import styles from "./image-card.module.scss";
import ButtonIcon from "components/buttons/ButtonIcon";
import { MoreIcon } from "icons";
import image from "images/accountIcon.png";
import Checkbox from "components/Checkbox";
import { refreshToken } from "../../../helpers/AuthHelper";

export default function ImageCard({ file }) {
  const handleClick = async () => {
    const suffix = file.split('_').slice(2).join('_').split('.')[0];
    const store_id = file.split('_')[0];
    try {
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/download_file_minio/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ suffix, store_id }),
        }
      );
      const res = await resp.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(res);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link)
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={image} />
      <div className={styles.header}>
        <Checkbox />
        <ButtonIcon Icon={MoreIcon} />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{file}</p>
        {/* <p className={styles.date}>4 days ago</p> */}
      </div>
    </div>
  );
}
