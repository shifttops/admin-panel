import styles from "./store-list-page.module.scss";
import TableHead from "components/tables/TableHead";
import TableRow from "components/tables/TableRow";
import DashboardHead from "components/header/DashboardHead";
import StoresMap from "../../components/StoresMap";
import {useEffect, useRef, useState} from "react";
import StoresStore from "../../store/StoresStore";
import queryString from "query-string";
import {observer} from "mobx-react";
import moment from "moment";
import {useInView} from "react-intersection-observer";
import Loader from "../../components/Loader";
import {useHistory, useLocation} from "react-router";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";

const StoreListPage = observer(() => {
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({type: "none"});
  const [isSearchOrSort, setIsSearchOrSort] = useState(false);
  const [limit, setLimit] = useState(30);
  const [resCount, setResCount] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const [checkedStores, setCheckedStores] = useState([]);

  const {stores, getStores} = StoresStore;
  let {isLoading, enabledFilters} = StoresStore;

  const {ref, inView, entry} = useInView({
    threshold: 0,
  });

  const selectAllStores = (e) => {
    if (checkedStores.length < stores.length) {
      setCheckedStores(stores.map((store) => store.store_id));
    } else {
      setCheckedStores([]);
    }
  };

  const refStores = useRef(false);
  const abortRef = useRef(false);

  useEffect(() => {
    Object.entries(
      queryString.parse(window.location.search, {arrayFormat: "comma"})
    ).forEach((entry) => {
      if (!entry[1]) {
        delete enabledFilters[entry[0]];
      } else {
        enabledFilters[entry[0]] = entry[1];
      }
    });
    return () => {
      Object.keys(enabledFilters).forEach((key) => {
        delete enabledFilters[key];
      });
    };
  }, []);

  useEffect(() => {
    if (abortRef.current && isLoading) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    const {type, field} = sort;

    if (refStores.current) {
      setIsSearchOrSort(true);
      getStores({
        search,
        setError,
        field,
        type,
        limit,
        offset: 0,
        signal: abortRef.current.signal,
        setResCount,
      });
    }

    return () => StoresStore.stores.clear();
  }, [search, sort]);

  useEffect(() => {
    if (abortRef.current && isLoading) {
      abortRef.current.abort();
    }

    abortRef.current = new AbortController();

    if (Object.keys(enabledFilters).some((key) => key && key.length)) {
      setIsSearchOrSort(true);
      getStores({
        setError,
        limit,
        offset: 0,
        signal: abortRef.current.signal,
        setResCount,
      });
    }
  }, [enabledFilters]);

  useEffect(() => {
    if (
      !stores.length &&
      !search.length &&
      !Object.keys(enabledFilters).length &&
      !sort.field &&
      !refStores.current
    ) {
      getStores({setError, limit, setResCount});
    }
  }, [stores.length]);

  useEffect(() => {
    refStores.current = true;
  }, []);

  useEffect(() => {
    const {type, field} = sort;
    if (inView) {
      setIsSearchOrSort(false);
      getStores({search, setError, field, type, limit, setResCount});
    }
  }, [inView]);

  return (
    <div className={styles.dashboard__wrapper}>
      <DashboardHead setSearch={setSearch} checkedStores={checkedStores}/>
      {/*<StoresMap/>*/}
      <table className={styles.table}>
        <TableHead
          setSort={setSort}
          sort={sort}
          selectAllStores={selectAllStores}
          allStoresCount={stores.length}
          selectedStoresCount={checkedStores.length}
        />
        <tbody>
        {stores.map((restaurant) => (
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
        {isLoading && isSearchOrSort ? (
          <div
            className={styles.storesLoader + " " + styles.storesLoader__search}
          >
            <Loader/>
          </div>
        ) : null}
      </table>
      {isLoading && !isSearchOrSort ? (
        <div className={styles.storesLoader}>
          <Loader/>
        </div>
      ) : null}
      {stores.length && stores.length !== resCount && !isLoading ? (
        <div className={styles.emptyBlock} ref={ref}/>
      ) : null}
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_RIGHT}
      />
    </div>
  );
});

export default StoreListPage;
