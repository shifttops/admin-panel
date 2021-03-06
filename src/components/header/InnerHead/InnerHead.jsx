import styles from "./inner-head.module.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import Button from "../../../components/buttons/Button";
import { CheckIcon, PrintIcon, ReportIcon, RestartIcon } from "icons";
import ButtonIcon from "components/buttons/ButtonIcon";
import Popup from "reactjs-popup";
import ReportPopup from "components/popups/ReportPopup";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import routes from "../../../constants/routes";
import StoresStore from "../../../store/StoresStore";
import { storeStatusMapper } from "../../../helpers/mappers";
import BackLink from "../../BackLink";
import cn from "classnames";
import PopupComponent from "../../popups/PopupComponent/PopupComponent";
import { ArrowDownIcon } from "../../../icons";

const InnerHead = observer((props) => {
  const location = useLocation();
  const [error, setError] = useState(false);
  const {
    storeInfo,
    manageStore,
    isRefreshing,
    isStoreInfoFetching,
    setStoreStatus,
    isStoreStatusFetching,
  } = StoresStore;

  const handleClick = async () => {
    manageStore("/refresh");
  };

  useEffect(() => {
    const id = +props.match.params.id;
    if (storeInfo.store_id !== id) {
      storeInfo.store_id = id;
    }
  }, []);

  return (
    <div className={styles.innerStore}>
      <div className={styles.innerStore__head}>
        <BackLink path={routes.home} text={"Назад к списку АЗС"} />
        <div className={styles.innerStore__status}>
          <div className={styles.innerStore__wrap}>
            <p className={styles.innerStore__number}>
              АЗС ID: {storeInfo.store_id}
            </p>
            <div className={styles.innerStore__buttons}>
              <Button
                className={
                  storeStatusMapper.find(
                    (item) => item.name === storeInfo.status
                  )?.class
                }
                text={
                  storeStatusMapper.find(
                    (item) => item.name === storeInfo.status
                  )?.visibleName
                }
                fetching={isStoreInfoFetching || isStoreStatusFetching}
              />
              <Button
                text="Обновить"
                fetching={isRefreshing}
                Icon={RestartIcon}
                className={styles.yellowBorder}
                onClick={handleClick}
              />
            </div>
          </div>
          <div className={styles.dashboard__buttons}>
            <div className={styles.dashboard__icon}>
              <ButtonIcon Icon={PrintIcon} className={styles.buttonIcon} />
            </div>
            <Popup nested trigger={<Button text="Отчёт" Icon={ReportIcon} />}>
              {(close) => (
                <ReportPopup
                  onClose={close}
                  checkedStores={[storeInfo.store_id]}
                />
              )}
            </Popup>
          </div>
        </div>
        <div className={styles.innerStore__info}>
          {[
            { label: "Регион", field: "county" },
            { label: "Локация", field: "address" },
            {
              label: "Тип АЗС",
              field: "store_type",
            },
          ].map((regionItem) => (
            <p
              key={`${regionItem.label}${storeInfo.store_id}`}
              className={styles.innerStore__region}
            >
              {regionItem.label}:
              <span>
                {storeInfo[regionItem.field]
                  ? storeInfo[regionItem.field]
                  : "N/A"}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
});

export default InnerHead;
