import styles from "./inner-history.module.scss";
import { ArrowDownIcon, MoreIcon, SortIcon } from "icons";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";
import routes from "constants/routes";
import { observer } from "mobx-react";
import { useEffect } from "react";
import StoresStore from "../../../../store/StoresStore";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";


const InnerHistory = observer((props) => {
  const { storeInfo, storeErrors, getStoreErrorLogs } = StoresStore;
  const [error, setError] = useState(false);
  const location = useLocation();

  const store_id = +props.match.params.id;

  useEffect(() => {
    if (storeInfo.store_id === store_id) {
      storeErrors.set(null);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.search}>
          <h2 className={styles.title}>History</h2>
          <SearchQuick />
          <ButtonIcon Icon={SortIcon} />
        </div>
        <div className={styles.buttons}>
          <Button text="Choose period" className={styles.border} />
          <Button text="Create Report" />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>
              <Checkbox label="event type" />
            </th>
            <th className={styles.iconPadding}>Message</th>
            <th>DATE</th>
            <th>Time</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {storeErrors.get() && storeErrors.get().map(item => (
          <tr key={`${item.store}-${item.id}`}>
            <td>
              <Checkbox label="Error" className={styles.checkbox} />
            </td>
            <td className={styles.error}>
              {item.description}
              {/* <span>
                <ArrowDownIcon />
              </span> */}
            </td>
            <td>{moment(item.error_time).format('DD.MM.YYYY')}</td>
            <td>{moment(item.error_time).format('HH:mm')}</td>
            <td>
              <NavLink to={routes.storeInfo}>
                <ButtonIcon Icon={MoreIcon} />
              </NavLink>
            </td>
          </tr>
          ))}
       </tbody>
      </table>
    </div>
  );
});

export default InnerHistory;
