import styles from "./report-popup.module.scss";
import { CloseIcon, DateIcon } from "icons";
import Checkbox from "components/Checkbox";
import global from "scss/global.scss";
import ButtonChoice from "components/buttons/ButtonChoice";
import Button from "components/buttons/Button";

export default function ReportPopup({ onClose }) {
  return (
    <div className={styles.popup}>
      <div className={styles.popupHead}>
        <span className={styles.title}>Report options</span>
        <CloseIcon onClick={onClose} />
      </div>
      <form>
        <div className={styles.block}>
          <p className={styles.category}>Period</p>
          <div className={styles.date}>
            <input placeholder="DD.MM.YYYY" />
            <input placeholder="DD.MM.YYYY" />
            <button className={styles.dateButton}>
              <DateIcon />
            </button>
          </div>
        </div>
        <div className={styles.block}>
          <p className={styles.category}>Information in the report</p>
          <Checkbox className={styles.checkbox} label="Problems" />
          <Checkbox className={styles.checkbox} label="Events" />
          <Checkbox className={styles.checkbox} label="System status" />
          <Checkbox className={styles.checkbox} label="Status of devices" />
        </div>
        <div className={styles.block}>
          <p className={styles.category}>Format</p>
          <ButtonChoice text="Excel" />
          <ButtonChoice text="PDF" />
          <ButtonChoice text="Web" />
          <div className={styles.popupButton}>
            <Button text="Create report" />
          </div>
        </div>
      </form>
    </div>
  );
}
