import styles from "./store-list-page.module.scss";
import routes from "constants/routes";
import TableHead from "components/tables/TableHead";
import TableRow from "components/tables/TableRow";
import DashboardHead from "components/header/DashboardHead";
import { useEffect, useRef, useState } from "react";
import StoresStore from "../../store/StoresStore";
import { observer } from "mobx-react";
import moment from "moment";
import { useInView } from "react-intersection-observer";
import Loader from "../../components/Loader";
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
  const [isSearchOrSort, setIsSearchOrSort] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [checkedStores, setCheckedStores] = useState([]);

  const {
    getStores,
    stores,
    searchStores,
    getFilters,
    tempStores,
    getStoresPart,
  } = StoresStore;

  let { isLoading, enabledFilters } = StoresStore;

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });


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
      return [...stores].sort((a, b) => {
        if (type === "desc") {
          return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
        } else {
          return b[field] > a[field] ? 1 : b[field] < a[field] ? -1 : 0;
        }
      });
    } else return stores;
  };

  const refStores = useRef(false);
  const abortRef = useRef(false);

  useEffect(() => {
    if (!stores.length) {
      getStores(setError);
      // getErrors(setError);
    }
  }, [stores.length, enabledFilters]);

  useEffect(() => {
    if (abortRef.current && isLoading){
      abortRef.current.abort()
    }
      abortRef.current = new AbortController()

    const { type, field } = sort;

    if (refStores.current) {
      setIsSearchOrSort(true);

      getStoresPart({ search, setError, field, type, limit: 30, offset: 0, signal: abortRef.current.signal });
    }
  }, [search, sort]);

  useEffect(() => {
    if (!tempStores.length && refStores.current) {
      getStoresPart({ search, setError, limit: 30 });
    }
  }, [tempStores.length]);

  useEffect(() => {
    refStores.current = true;
  }, []);

  useEffect(() => {
    const { type, field } = sort;

    if (inView) {
      setIsSearchOrSort(false);
      getStoresPart({ search, setError, field, type, limit: 30 });
    }
  }, [inView]);

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
        { 
        // tempStores.map((restaurant) => (
          sortFunc(searchStores(search), sort).map((restaurant) => (
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
          ))
        }
        </tbody>
        {
          (isLoading && isSearchOrSort) ? <div className={styles.storesLoader + ' ' + styles.storesLoader__search}>
            <Loader/>
          </div> : ''
              }
      </table>
      {
        (isLoading && !isSearchOrSort) ? <div className={styles.storesLoader}>
          <Loader/>
        </div> : ''
      }
      {
        !isLoading ? <div ref={ ref }/> : ''
      }
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_RIGHT}
      />
    </div>
  );
});

export default StoreListPage;
