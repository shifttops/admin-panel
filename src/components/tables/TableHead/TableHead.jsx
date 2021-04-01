import Checkbox from "../../Checkbox/Checkbox";
import styles from "./tableHead.module.scss";
import { SortIcon } from "../../../icons/icons";

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
