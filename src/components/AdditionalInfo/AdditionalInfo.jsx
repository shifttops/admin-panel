import styles from "./additional-info.module.scss";
import { ArrowDownIcon } from "icons";
import cn from "classnames";
import SliderCheckbox from "components/SliderCheckbox";
import StoresStore from "../../store/StoresStore";
import { observer } from "mobx-react";
import DropDownFields from "../DropDownFields";

const AdditionalInfo = observer(({ leftTitle, rightTitle }) => {
  const items = [
    {
      name: "Cameras",
      result: "All cameras are working",
      error: "All cameras are working",
    },
    {
      name: "Lateral cameras",
    },
  ];

  const { storeInfo } = StoresStore;

  return (
    <div className={styles.system}>
      <div className={styles.head}>
        <span>{leftTitle}</span>
        <span>{rightTitle}</span>
      </div>
      <div
        className={styles.item + " " + styles.opened + " " + styles.dropdown}
      >
        <button className={styles.dropdownHead}>
          <p className={cn(styles.category, styles.categoryDropdown)}>
            {items[0].name}
          </p>
        </button>
        <div className={styles.text}>
          <div>
            {storeInfo.cameras &&
              storeInfo.cameras.map((camera) => (
                <SliderCheckbox
                  key={camera.id}
                  label={camera.view_name}
                  passed={camera.passed}
                />
              ))}
          </div>
        </div>
      </div>

      <div className={styles.item}>
        <p className={cn(styles.category, styles.categoryDropdown)}>
          Lateral cameras
        </p>
        <div
          className={`${styles.check} ${
            storeInfo.is_all_lateral_works ? "" : styles.error
          }`}
        >
          {storeInfo.is_all_lateral_works
            ? "All cameras are working"
            : "Check failed"}
        </div>
      </div>
      {storeInfo.servers && storeInfo.servers.map((server, serverIndex) => (
          <DropDownFields serverIndex={serverIndex} key={server.name} />
      ))}
    </div>
  );
});



export default AdditionalInfo;
