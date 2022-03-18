import { observer } from "mobx-react";
import styles from "./set-store-status.module.scss";
import StoresStore from "../../store/StoresStore";
import Button from "../buttons/Button";
import { storeStatusMapper } from "../../helpers/mappers";
import { ArrowDownIcon, StatusIcon } from "../../icons";
import { useRef, useState } from "react";
import useClickOutside from "../../helpers/hooks/useClickOutside";
import StatusDropdown from "../dropdown/StatusDropdown";

const SetStoreStatus = observer(() => {
  const {
    isStoreStatusFetching,
    isStoreInfoFetching,
    setStoreStatus,
    maintenanceScreensData,
    isStatusFetching,
  } = StoresStore;
  let { storeInfo } = StoresStore;
  const ref = useRef(null);
  const [isStatusSelectVisible, setIsStatusSelectVisible] = useState(false);

  useClickOutside({
    ref,
    onClickOutside: () => setIsStatusSelectVisible(false),
  });

  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <div className={styles.icon}>{<StatusIcon />}</div>
        <p className={styles.title}>Set store status</p>
        <div ref={ref}>
          <Button
            className={
              storeStatusMapper.find((item) => item.name === storeInfo.status)
                ?.class
            }
            text={
              storeStatusMapper.find((item) => item.name === storeInfo.status)
                ?.visibleName
            }
            fetching={
              isStoreStatusFetching || isStoreInfoFetching || isStatusFetching
            }
            Icon={ArrowDownIcon}
            iconProps={{ isOpen: isStatusSelectVisible, color: "#ffffff" }}
            onClick={() => setIsStatusSelectVisible((prevState) => !prevState)}
          />
          {isStatusSelectVisible ? (
            <div className={styles.dropdown}>
              {storeStatusMapper.slice(0, -1).map((status) => (
                <StatusDropdown
                  status={status}
                  storeStatus={storeInfo.status}
                  setStoreStatus={setStoreStatus}
                  maintenanceScreens={
                    maintenanceScreensData.find(
                      (item) => item.name === status.name
                    ).maintenance_screen
                  }
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export default SetStoreStatus;
