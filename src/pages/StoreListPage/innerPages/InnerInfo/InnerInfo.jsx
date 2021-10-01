import styles from "./inner-info.module.scss";
import AdditionalInfo from "components/AdditionalInfo";
import StoresStore from "../../../../store/StoresStore";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import { useLocation } from "react-router";
import { categoryMapper } from "../../../../helpers/mappers";

const InnerInfo = observer((props) => {
  const { storeInfo, getStoreInfo, getStoreHardware, getHardwareSetup, getStoreCameraImages } = StoresStore;
  const [error, setError] = useState(false);
  const location = useLocation();

  // useEffect(() => {
  //   const id = +props.match.params.id
  //   if (storeInfo.store_id === id) {
  //     // getStoreHardware(id, setError);
  //     // getHardwareSetup(id, setError);
  //   }
  // }, [storeInfo.store_id])

  return (
    <div className={styles.wrapper}>
      <div className={styles.info__store}>
        <div className={styles.info__header}>Main info</div>
        <div className={styles.info__items}>
          {categoryMapper.map(item => (
            <div className={styles.info__item} key={item.name}>
              <p className={styles.info__category}>{item.visibleName}</p>
              <span className={styles.info__result}>{storeInfo[item.name]}</span>
            </div>
          ))}
        </div>
      </div>
      <AdditionalInfo leftTitle="Additional info" />
    </div>
  );
});

export default InnerInfo;
