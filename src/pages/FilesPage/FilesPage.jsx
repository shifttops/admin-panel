import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import { SortIcon } from "icons";
import styles from "./files-page.module.scss";
import Button from "components/buttons/Button";
import FilesTableHead from "components/tables/FilesTableHead";
import FilesFolderRow from "components/tables/FilesFolderRow";

export default function FilesPage(params) {
  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Files</h2>
          <SearchQuick />
          <ButtonIcon Icon={SortIcon} />
        </div>
        <div className={styles.button}>
          <Button text="Upload file" />
        </div>
      </div>
      <table className={styles.table}>
        <FilesTableHead thText="files" />
        <tbody>
          <FilesFolderRow label="20209" />
          <FilesFolderRow label="20209" />
          <FilesFolderRow label="20209" />
        </tbody>
      </table>
    </div>
  );
}
