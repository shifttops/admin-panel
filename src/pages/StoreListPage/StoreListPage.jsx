import { Route, Switch, BrowserRouter } from "react-router-dom";
import styles from "./store-list-page.module.scss";
import routes from "constants/routes";
import TableHead from "components/tables/TableHead";
import TableRow from "components/tables/TableRow";
import DashboardHead from "components/header/DashboardHead";
import { ConfigIcon } from "icons";
import statusButtonTypes from "types/statusButtonTypes";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { refreshToken } from "../../helpers/AuthHelper";
import StoresStore from "../../store/StoresStore";
import { observer } from "mobx-react";
import moment from "moment";
import { toJS } from "mobx";
import queryString from 'query-string';


const StoreListPage = observer(() => {
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ type: 'none' });
  const { getStores, stores, searchStores, getFilters, enabledFilters } = StoresStore;

  const sortFunc = (stores, sort) => {
    const { type, field } = sort;
    if (type !== 'none' && field) {
      const newStores = [...stores].sort((a, b) => {
        console.log(a[field], '  --- ', b[field]);
        if (type === 'desc') {
          return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0
        } else {
          return b[field] > a[field] ? 1 : b[field] < a[field] ? -1 : 0
        }
      });
      return newStores;
    }
    else return stores;
  }

  useEffect(() => {
    // enabledFilters = 
    console.log(enabledFilters);
  }, [])

  useEffect(() => {
    if (!stores.length) {
      getStores(setError);
      // getErrors(setError);
    }
  }, [stores.length])

  return (
    <div className={styles.dashboard__wrapper}>
      <DashboardHead setSearch={setSearch} />
      <table className={styles.table}>
        <TableHead setSort={setSort} sort={sort} />
        <tbody>
          {
            sortFunc(searchStores(search), sort).map(restaurant => (
              <TableRow
                key={restaurant.store_id}
                id={restaurant.store_id}
                address={restaurant.address}
                region={restaurant.store_county}
                type={restaurant.type}
                date_deployed={restaurant.date_deployed ? moment(restaurant.date_deployed).format('DD.MM.YYYY') : 'N/A'}
                date_ready_deployed={restaurant.date_created ? moment(restaurant.date_created).format('DD.MM.YYYY') : 'N/A'}
                status={restaurant.status} />
            ))
          }
        </tbody>
      </table>
    </div>
  );
})

export default StoreListPage;
