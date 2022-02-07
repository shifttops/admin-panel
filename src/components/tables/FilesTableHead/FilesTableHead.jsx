import styles from "./files-table-head.module.scss";
import Checkbox from "components/Checkbox";

export default function FilesTableHead({ thText }) {
  return (
    <thead className={styles.head}>
      <tr>
        <th>
          <Checkbox label="Title" />
        </th>
        {/*<th>{thText}</th>*/}
        <th>Created</th>
        {/*<th>Last Edited</th>*/}
        <th> </th>
      </tr>
    </thead>
  );
}
