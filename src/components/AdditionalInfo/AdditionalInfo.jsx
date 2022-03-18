import styles from "./additional-info.module.scss";
import { ArrowDownIcon } from "icons";
import cn from "classnames";
import SliderCheckbox from "components/SliderCheckbox";
import StoresStore from "../../store/StoresStore";
import { observer } from "mobx-react";
import DropDownFields from "../dropdown/DropDownFields";
import Loader from "../Loader";

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

  const {
    storeInfo,
    isCamerasStatusFetching,
    isStoreInfoFetching,
    isServersFetching,
  } = StoresStore;

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
        {!isCamerasStatusFetching &&
        !isStoreInfoFetching &&
        storeInfo.cameras &&
        storeInfo.cameras.length ? (
          <div className={styles.text}>
            <div>
              {storeInfo.cameras.map((camera) => (
                <SliderCheckbox
                  key={camera.id}
                  label={camera.view_name}
                  passed={camera.passed}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.text}>
            {isCamerasStatusFetching || isStoreInfoFetching ? (
              <Loader types={["small"]} />
            ) : (
              "No cameras"
            )}
          </div>
        )}
      </div>

      <div className={styles.item}>
        <p className={cn(styles.category, styles.categoryDropdown)}>
          Lateral cameras
        </p>
        {!isCamerasStatusFetching &&
        !isStoreInfoFetching &&
        storeInfo.is_all_lateral_works !== undefined ? (
          <div
            className={cn(styles.check, {
              [styles.error]: !storeInfo.is_all_lateral_works,
            })}
          >
            {storeInfo.is_all_lateral_works
              ? "All cameras are working"
              : "Check failed"}
          </div>
        ) : !isCamerasStatusFetching &&
          !isStoreInfoFetching &&
          (!storeInfo.cameras ||
            !storeInfo.cameras.length ||
            storeInfo.is_all_lateral_works === undefined) ? (
          <div className={styles.error}>Check failed</div>
        ) : (
          <Loader types={["small"]} />
        )}
      </div>
      {!isServersFetching &&
      !isStoreInfoFetching &&
      storeInfo &&
      storeInfo.status &&
      storeInfo.servers ? (
        storeInfo.servers.map((server, serverIndex) =>
          server ? (
            <DropDownFields serverIndex={serverIndex} key={server.name} />
          ) : null
        )
      ) : isServersFetching || isStoreInfoFetching ? (
        <div className={styles.loader}>
          <Loader types={["small"]} />
        </div>
      ) : null}
    </div>
  );
});

export default AdditionalInfo;
