import styles from "./table-head.module.scss";
import { SortIcon } from "icons";
import Checkbox from "components/Checkbox";

export default function TableHead({ setSort, sort }) {
  const items = [
    {
      name: 'Store ID',
      key: 'store_id',
      centered: false,
    },
    {
      name: 'Location',
      key: 'address',
      centered: false,
    },
    {
      name: 'Region',
      key: 'region',
      centered: false,
    },
    {
      name: 'Store type',
      key: 'type',
      centered: true,
    },
    {
      name: 'Status',
      key: 'status',
      centered: true,
    },
    {
      name: 'RFDD',
      key: 'date_created',
      centered: false,
    },
    {
      name: 'DOD',
      key: 'date_deployment',
      centered: false,
    }];

  const sortTypes = ['none', 'desc', 'inc'];


  const handleSort = (field) => {
    if (sort.field === field) {
      setSort({ field, type: sortTypes[(sortTypes.indexOf(sort.type) + 1) % sortTypes.length] });
    }
    else {
      setSort({ field, type: sortTypes[1] });
    }
  }
  return (
    <thead className={styles.tableHead}>
      <tr>
        <th>
          <Checkbox/>
        </th>
        {items.map(item => (
          <th key={item.name} className={`${styles.table__sort} ${item.centered ? styles.table__center : ''}`}
            onClick={() => handleSort(item.key)}
          >
            {item.name}
            <SortIcon />
          </th>
        ))}
        {/* <th className={styles.table__sort}
        // onClick={}
        >
          Location
          <SortIcon />
        </th>
        <th className={styles.table__sort}>
          Region
          <SortIcon />
        </th>
        <th className={styles.table__center + " " + styles.table__sort}>
          Store type <SortIcon />
        </th>
        <th className={styles.table__center + " " + styles.table__sort}>
          Status <SortIcon />
        </th>
        <th className={styles.table__sort}>
          RFDD <SortIcon />
        </th>
        <th className={styles.table__sort}>
          DOD <SortIcon />
        </th> */}
        <th />
      </tr>
    </thead>
  );
}
