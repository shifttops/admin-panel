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
      name: "ID АЗС",
      key: "store_id",
      centered: false,
    },
    {
      name: "Локация",
      key: "address",
      centered: false,
    },
    {
      name: "Регион",
      key: "store_location__county",
      centered: false,
    },
    {
      name: "Тип АЗС",
      key: "store_type",
      centered: true,
    },
    {
      name: "Статус",
      key: "status",
      centered: true,
    },
    {
      name: "Дата установки",
      key: "date_created",
      centered: false,
    },
    {
      name: "Дата запуска",
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
