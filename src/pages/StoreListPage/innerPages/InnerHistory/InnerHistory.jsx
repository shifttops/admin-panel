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
import Loader from "../../../../components/Loader";
import Description from "../../../../components/Description";

const InnerHistory = observer((props) => {
  const { storeInfo, storeErrors, isHistoryFetching } = StoresStore;
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
          <h2 className={styles.title}>История</h2>
          <SearchQuick />
        </div>
        <div className={styles.buttons}>
          <Button text="Выберите период" className={styles.border} />
        </div>
      </div>
      {!isHistoryFetching && storeErrors.get() && storeErrors.get().length ? (
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th>
                <Checkbox label="Тип события" />
              </th>
              <th className={styles.iconPadding}>Сообщение</th>
              <th>Дата</th>
              <th>Время</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {storeErrors.get().map((item) => (
              <tr key={`${item.store}-${item.id}`}>
                <td>
                  <Checkbox label="Error" className={styles.checkbox} />
                </td>
                <Description
                  className={styles.error}
                  message={item.description}
                />
                <td>{moment(item.error_time).format("DD.MM.YYYY")}</td>
                <td>{moment(item.error_time).format("HH:mm")}</td>
                <td>
                  {/*  <NavLink to={routes.storeInfo}>*/}
                  {/*    <ButtonIcon Icon={MoreIcon} />*/}
                  {/*  </NavLink>*/}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.loader}>
          {isHistoryFetching ? (
            <Loader types={["medium"]} />
          ) : (
            "Нет истории для этой АЗС"
          )}
        </div>
      )}
    </div>
  );
});

export default InnerHistory;
