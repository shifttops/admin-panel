import styles from "./table-head.module.scss";
import { SortIcon } from "icons";
import Checkbox from "components/Checkbox";

export default function TableHead({
  setSort,
  sort,
  selectAllStores,
  allStoresCount,
  selectedStoresCount,
}) {
  const items = [
    {
      name: "Store ID",
      key: "store_id",
      centered: false,
    },
    {
      name: "Location",
      key: "address",
      centered: false,
    },
    {
      name: "Region",
      key: "store_location__county",
      centered: false,
    },
    {
      name: "Store type",
      key: "store_type",
      centered: true,
    },
    {
      name: "Status",
      key: "status",
      centered: true,
    },
    {
      name: "RFDD",
      key: "date_created",
      centered: false,
    },
    {
      name: "DOD",
      key: "date_deployment",
      centered: false,
    },
  ];

  const sortTypes = ["none", "desc", "inc"];

  const handleSort = (field) => {
    if (sort.field === field) {
      setSort({
        field,
        type: sortTypes[(sortTypes.indexOf(sort.type) + 1) % sortTypes.length],
      });
    } else {
      setSort({ field, type: sortTypes[1] });
    }
  };

  return (
    <thead className={styles.tableHead}>
      <tr>
        <th className={styles.table__sort}>
          <Checkbox
            checked={allStoresCount === selectedStoresCount}
            onChange={selectAllStores}
          />
        </th>
        {items.map((item) => (
          <th
            key={item.name}
            className={`${styles.table__sort} ${
              item.centered ? styles.table__center : ""
            } ${
              item.key === sort.field && sort.type !== "none"
                ? styles.selectedSort
                : ""
            }`}
            onClick={() => handleSort(item.key)}
          >
            {item.name}
            <SortIcon
              className={
                item.key === sort.field && sort.type === "inc"
                  ? styles.invertedSvg
                  : ""
              }
            />
          </th>
        ))}
        <th className={styles.table__sort}/>
      </tr>
    </thead>
  );
}
