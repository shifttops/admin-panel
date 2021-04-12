import styles from "./inner-head.module.scss";
import { Link } from "react-router-dom";
import Button from "components/buttons/Button";
import { CheckIcon, PrintIcon, ReportIcon, RestartIcon } from "icons";
import ButtonIcon from "components/buttons/ButtonIcon";
import Popup from "reactjs-popup";
import ReportPopup from "components/popups/ReportPopup";

export default function InnerHead() {
  return (
    <div className={styles.innerStore}>
      <div className={styles.innerStore__head}>
        <Link className={styles.innerStore__back} to="/">
          Back to Store list
        </Link>
        <div className={styles.innerStore__status}>
          <div className={styles.innerStore__wrap}>
            <p className={styles.innerStore__number}>Store ID: 20209</p>
            <div className={styles.innerStore__buttons}>
              <Button text="Deployed" Icon={CheckIcon} />
              <Button
                text="Restart"
                Icon={RestartIcon}
                className={styles.yellowBorder}
              />
            </div>
          </div>
          <div className={styles.dashboard__buttons}>
            <div className={styles.dashboard__icon}>
              <ButtonIcon Icon={PrintIcon} className={styles.buttonIcon} />
            </div>
            <Popup nested trigger={<Button text="Report" Icon={ReportIcon} />}>
              {(close) => <ReportPopup onClose={close} />}
            </Popup>
          </div>
        </div>
        <div className={styles.innerStore__info}>
          <p className={styles.innerStore__region}>
            Region:<span>München</span>
          </p>
          <p className={styles.innerStore__region}>
            Location:<span>Maria-Probst-Straße 1</span>
          </p>
          <p className={styles.innerStore__region}>
            Store type:<span>Franchise</span>
          </p>
        </div>
      </div>
    </div>
  );
}
