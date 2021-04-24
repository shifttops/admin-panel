import styles from "./inner-info.module.scss";
import AdditionalInfo from "components/AdditionalInfo";

export default function InnerInfo() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info__store}>
        <div className={styles.info__header}>Main info</div>
        <div className={styles.info__items}>
          <div className={styles.info__item}>
            <p className={styles.info__category}>fourDigitRestaurantID</p>
            <span className={styles.info__result}>0209</span>
          </div>
          <div className={styles.info__item}>
            <p className={styles.info__category}>threeDigitRestaurantID</p>
            <span className={styles.info__result}>020</span>
          </div>
          <div className={styles.info__item}>
            <p className={styles.info__category}>Region</p>
            <span className={styles.info__result}>München</span>
          </div>
          <div className={styles.info__item}>
            <p className={styles.info__category}>Location</p>
            <span className={styles.info__result}>Maria-Probst-Straße 1</span>
          </div>
          <div className={styles.info__item}>
            <p className={styles.info__category}>Country</p>
            <span className={styles.info__result}>Deutschland</span>
          </div>
          <div className={styles.info__item}>
            <p className={styles.info__category}>State</p>
            <span className={styles.info__result}>Freistaat Bayern</span>
          </div>
          <div className={styles.info__item}>
            <p className={styles.info__category}>State</p>
            <span className={styles.info__result}>Freistaat Bayern</span>
          </div>
          <div className={styles.info__item}>
            <p className={styles.info__category}>Store type</p>
            <span className={styles.info__result}>Franchise</span>
          </div>
          <div className={styles.info__item}>
            <p className={styles.info__category}>ZipCode</p>
            <span className={styles.info__result}>80939</span>
          </div>
          <div className={styles.info__item}>
            <p className={styles.info__category}>Building type</p>
            <span className={styles.info__result}>Business Buildings</span>
          </div>
          <div className={styles.info__item}>
            <p className={styles.info__category}>Number of drive zone</p>
            <span className={styles.info__result}>4</span>
          </div>
          <div className={styles.info__item + " " + styles.info__itemChange}>
            <p className={styles.info__category}>Date of deployment</p>
            <input
              className={styles.info__change}
              type="text"
              placeholder="21.03.21"
            />
          </div>
          <div className={styles.info__item}>
            <p className={styles.info__category}>Ready for deployment date</p>
            <span className={styles.info__result}>21.03.21</span>
          </div>
        </div>
      </div>
      <AdditionalInfo leftTitle="Additional info" />
    </div>
  );
}
