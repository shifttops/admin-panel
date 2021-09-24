import { Route, Switch, BrowserRouter } from "react-router-dom";
import styles from "./store-list-page.module.scss";
import routes from "constants/routes";
import TableHead from "components/tables/TableHead";
import TableRow from "components/tables/TableRow";
import DashboardHead from "components/header/DashboardHead";
import { ConfigIcon } from "icons";
import statusButtonTypes from "types/statusButtonTypes";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { refreshToken } from "../../helpers/AuthHelper";
import StoresStore from "../../store/StoresStore";
import { observer } from "mobx-react";
import moment from "moment";
import { observe, reaction, toJS } from "mobx";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";

const StoreListPage = observer(() => {
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ type: "none" });
  const history = useHistory();
  const location = useLocation();
  const [checkedStores, setCheckedStores] = useState([]);
  const { getStores, stores, searchStores, getFilters, enabledFilters } =
    StoresStore;

  const selectAllStores = (e) => {
    if (checkedStores.length < stores.length) {
      setCheckedStores(stores.map((store) => store.store_id));
    } else {
      setCheckedStores([]);
    }
  };

  const sortFunc = (stores, sort) => {
    const { type, field } = sort;
    if (type !== "none" && field) {
      const newStores = [...stores].sort((a, b) => {
        console.log(a[field], "  --- ", b[field]);
        if (type === "desc") {
          return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
        } else {
          return b[field] > a[field] ? 1 : b[field] < a[field] ? -1 : 0;
        }
      });
      return newStores;
    } else return stores;
  };

  useEffect(() => {
    console.log(toJS(enabledFilters));
    if (!stores.length) {
      getStores(setError);
      // getErrors(setError);
    }
  }, [stores.length, enabledFilters]);

  useEffect(() => {
    if (
      Object.values(enabledFilters).some((value) => value.length) &&
      location.search === ""
    ) {
      history.replace({
        pathname: location.pathname,
        search: queryString.stringify(enabledFilters, {
          arrayFormat: "comma",
        }),
      });
    }
  }, []);

  return (
    <div className={styles.dashboard__wrapper}>
      <DashboardHead setSearch={setSearch} checkedStores={checkedStores} />
      <table className={styles.table}>
        <TableHead
          setSort={setSort}
          sort={sort}
          selectAllStores={selectAllStores}
          allStoresCount={stores.length}
          selectedStoresCount={checkedStores.length}
        />
        <tbody>
          {sortFunc(searchStores(search), sort).map((restaurant) => (
            <TableRow
              key={restaurant.store_id}
              id={restaurant.store_id}
              address={restaurant.address}
              region={restaurant.store_county}
              type={restaurant.store_type}
              date_deployed={
                restaurant.date_deployment
                  ? moment(restaurant.date_deployment).format("DD.MM.YYYY")
                  : "N/A"
              }
              date_ready_deployed={
                restaurant.date_created
                  ? moment(restaurant.date_created).format("DD.MM.YYYY")
                  : "N/A"
              }
              status={restaurant.status}
              setCheckedStores={setCheckedStores}
              checkedStores={checkedStores}
            />
          ))}
        </tbody>
      </table>
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_RIGHT}
      />
    </div>
  );
});

export default StoreListPage;
