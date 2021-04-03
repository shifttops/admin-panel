import styles from "./inner-info.module.scss";
import AdditionalInfo from "components/AdditionalInfo";

export default function InnerInfo() {
  return (
    <div className={styles.wrapper}>
      <AdditionalInfo leftTitle="Additional info" />
    </div>
  );
}
