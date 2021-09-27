import styles from './inner-head.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import Button from 'components/buttons/Button';
import { CheckIcon, PrintIcon, ReportIcon, RestartIcon } from 'icons';
import ButtonIcon from 'components/buttons/ButtonIcon';
import Popup from 'reactjs-popup';
import ReportPopup from 'components/popups/ReportPopup';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import routes from '../../../constants/routes';
import StoresStore from '../../../store/StoresStore';
import { statusMapper } from '../../../helpers/mappers';
import { useRef } from 'react';

const InnerHead = observer(() => {
  const location = useLocation();
  const [error, setError] = useState(false);
  const { storeInfo, getStoreInfo } = StoresStore;
  
  useEffect(() => {
    const id =
    +location.pathname.split('/')[location.pathname.split('/').length - 1];
    if (storeInfo.store_id !== id) {
      storeInfo.store_id = id;
      console.table('123123asdasd')
      getStoreInfo(id, setError);
    }
  }, []);

  return (
    <div className={styles.innerStore}>
      <div className={styles.innerStore__head}>
        <Link className={styles.innerStore__back} to={routes.home}>
          Back to Store list
        </Link>
        <div className={styles.innerStore__status}>
          <div className={styles.innerStore__wrap}>
            <p className={styles.innerStore__number}>
              Store ID: {storeInfo.store_id}
            </p>
            <div className={styles.innerStore__buttons}>
              <Button
                className={
                  statusMapper.find((item) => item.name === storeInfo.status)
                    ?.class
                }
                text={
                  statusMapper.find((item) => item.name === storeInfo.status)
                    ?.visibleName
                }
                // Icon={CheckIcon}
              />
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
              {(close) => <ReportPopup onClose={close} checkedStores={[storeInfo.store_id]}/>}
            </Popup>
          </div>
        </div>
        <div className={styles.innerStore__info}>
          <p className={styles.innerStore__region}>
            Region:<span>{storeInfo.county ? storeInfo.county : ''}</span>
          </p>
          <p className={styles.innerStore__region}>
            Location:<span>{storeInfo.address ? storeInfo.address : ''}</span>
          </p>
          <p className={styles.innerStore__region}>
            Store type:
            <span>{storeInfo.store_type ? storeInfo.store_type : ''}</span>
          </p>
        </div>
      </div>
    </div>
  );
});
export default InnerHead;
