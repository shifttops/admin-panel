import styles from "./table-head.module.scss";
import { SortIcon } from "icons";
import Checkbox from "components/Checkbox";

export default function TableHead({ th }) {
  return (
    <thead className={styles.tableHead}>
      <tr>
        <th>
          <Checkbox label="Store ID" />
        </th>
        <th>Location</th>
        <th className={styles.table__sort}>
          {th}
          <SortIcon />
        </th>
        <th className={styles.table__center}>Store type</th>
        <th className={styles.table__center}>Status</th>
        <th>RFDD</th>
        <th>DOD</th>
        <th />
      </tr>
    </thead>
  );
}
