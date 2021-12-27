import styles from "./inner-info.module.scss";
import AdditionalInfo from "components/AdditionalInfo";
import StoresStore from "../../../../store/StoresStore";
import { observer } from "mobx-react";
import { categoryMapper } from "../../../../helpers/mappers";
import Loader from "../../../../components/Loader";

const InnerInfo = observer((props) => {
  const { storeInfo, isStoreInfoFetching } = StoresStore;

  return (
    <div className={styles.wrapper}>
      <div className={styles.info__store}>
        <div className={styles.info__header}>Main info</div>
        {!isStoreInfoFetching ? (
          <div className={styles.info__items}>
            {categoryMapper.map((item) => (
              <div className={styles.info__item} key={item.name}>
                <p className={styles.info__category}>{item.visibleName}</p>
                <span className={styles.info__result}>
                  {storeInfo[item.name] ? storeInfo[item.name] : "N/A"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.loader}>
            <Loader types={["medium"]} />
          </div>
        )}
      </div>
      <AdditionalInfo leftTitle="Additional info" />
    </div>
  );
});

export default InnerInfo;
