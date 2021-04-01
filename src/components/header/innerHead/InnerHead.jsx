import Button from "../../buttons/Button";
import ButtonIcon from "../../buttons/ButtonIcon/ButtonIcon";
import { CheckIcon, PrintIcon, ReportIcon } from "../../../icons/icons";
import styles from "./InnerHead.module.scss";
import { Link } from "react-router-dom";

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
            <div className={styles.innerStore__btn}>
              <Button text="Deployed" Icon={CheckIcon} />
            </div>
          </div>
          <div className={styles.dashboard__buttons}>
            <div className={styles.dashboard__icon}>
              <ButtonIcon Icon={PrintIcon} />
            </div>
            <Button text="Report" Icon={ReportIcon} disabled />
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
