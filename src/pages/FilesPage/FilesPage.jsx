import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import { MoreIcon, SortIcon } from "icons";
import styles from "./files-page.module.scss";
import Button from "components/buttons/Button";
import FilesTableHead from "components/tables/FilesTableHead";
import FilesFolderRow from "components/tables/FilesFolderRow";
import Checkbox from "components/Checkbox";

export default function FilesPage(params) {
  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Files</h2>
          <SearchQuick />
          <ButtonIcon Icon={SortIcon} className={styles.btnIcon} />
        </div>
        <div className={styles.button}>
          <Button text="Upload file" />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>
              <Checkbox label="Store name" className={styles.checkboxHead} />
            </th>
            <th>Region</th>
            <th className={styles.location}>Location</th>
            <th>files</th>
            <th>Last Edited</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.name}>
              <Checkbox className={styles.checkbox} label="20209" />
            </td>
            <td className={styles.text}>München</td>
            <td className={styles.text + " " + styles.location}>
              Maria-Probst-Straße 1
            </td>
            <td className={styles.text}>64 files</td>
            <td className={styles.text}>17 March 2021</td>
            <td>
              <ButtonIcon Icon={MoreIcon} />
            </td>
          </tr>
          <tr>
            <td className={styles.name}>
              <Checkbox className={styles.checkbox} label="20209" />
            </td>
            <td className={styles.text}>München</td>
            <td className={styles.text + " " + styles.location}>
              Maria-Probst-Straße 1
            </td>
            <td className={styles.text}>64 files</td>
            <td className={styles.text}>17 March 2021</td>
            <td>
              <ButtonIcon Icon={MoreIcon} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
