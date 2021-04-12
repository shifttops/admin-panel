import styles from "./table-head.module.scss";
import { SortIcon } from "icons";
import Checkbox from "components/Checkbox";

export default function TableHead({ th }) {
  return (
    <thead className={styles.tableHead}>
      <tr>
        <th>
          <Checkbox label={"Store ID"} />
        </th>
        <th className={styles.table__sort}>
          Location
          <SortIcon />
        </th>
        <th className={styles.table__sort}>
          {th}
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
        </th>
        <th />
      </tr>
    </thead>
  );
}
