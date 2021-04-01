import styles from "./AdditionalInfo.module.scss";
import SliderCheckbox from "../SliderCheckbox";
import { ArrowDownIcon, SpeedIcon, TempIcon } from "../../icons/icons";
import cn from "classnames";

export default function AdditionalInfo({ leftTitle, rightTitle }) {
  return (
    <div className={styles.system}>
      <div className={styles.head}>
        <span>{leftTitle}</span>
        <span>{rightTitle}</span>
      </div>
      <div className={styles.item}>
        <p
          className={cn(
            styles.category,
            styles.categoryDropdown,
            styles.opened
          )}
        >
          Cameras
          <ArrowDownIcon />
        </p>
        <div className={styles.resultError}>One camera is off</div>
      </div>
      <div className={styles.text}>
        <div className="info__error--info">
          <span className={styles.error}>Error Code 0xa00f4294</span>
          <p className={styles.descr}>
            This error is related to the camera not working properly and it is
            most likely caused by corrupted or missing drivers. This error can
            also occur due to a recently installed update for Windows 10, or due
            to corrupted drivers.
          </p>
        </div>
        <div className="checkbox-wrap">
          <SliderCheckbox />
          <SliderCheckbox />
          <SliderCheckbox />
          <SliderCheckbox />
        </div>
      </div>
      <div className={styles.item}>
        <p className={cn(styles.category, styles.categoryDropdown)}>
          Lateral cameras
          <ArrowDownIcon />
        </p>
        <div className={styles.check}>All cameras are working</div>
      </div>
      <div className={styles.item}>
        <p className={styles.category}>GPU</p>
        <div className={styles.resultInfo}>
          <div className={styles.temp}>
            <TempIcon />
            <span>68</span>
          </div>
          <div className={styles.process}>
            <SpeedIcon />
            <span>80%</span>
          </div>
        </div>
      </div>
      <div className={styles.item}>
        <p className={styles.category}>CPU</p>
        <div className={styles.resultInfo}>
          <div className={styles.temp}>
            <TempIcon />
            <span>34</span>
          </div>
          <div className={styles.processHigh}>
            <SpeedIcon />
            <span>90%</span>
          </div>
        </div>
      </div>
      <div className={styles.item}>
        <p className={styles.category}>Videocard</p>
        <span className={styles.result}>NVIDIA RTX2080 SUPER</span>
      </div>
      <div className={styles.item}>
        <p className={styles.category}>Network card</p>
        <span className={styles.result}>TP-Link AC1300 PCIe</span>
      </div>
      <div className={styles.item}>
        <p className={styles.category}>CPU type</p>
        <span className={styles.result}>
          Intel(R) Core(TM) i7-4790 CPU @ 3.60GHz
        </span>
      </div>
      <div className={styles.item}>
        <p className={styles.category}>OS</p>
        <span className={styles.result}>Windows 10, version 20H2</span>
      </div>
    </div>
  );
}
