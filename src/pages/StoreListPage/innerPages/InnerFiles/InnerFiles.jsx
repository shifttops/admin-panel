import styles from "./inner-files.module.scss";
import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import Button from "components/buttons/Button";
import {
  AddFolderIcon,
  DeleteIcon,
  ExportIcon,
  FileGridIcons,
  FileLinesIcon,
  PhotoIcon,
  SortIcon,
  VideoIcon,
} from "icons";
import Checkbox from "components/Checkbox";
import FilesFolderRow from "components/tables/FilesFolderRow";
import FilesTableHead from "../../../../components/tables/FilesTableHead";
import FilesRow from "../../../../components/tables/FilesRow";
import cn from "classnames";
import React, { useEffect, useState } from "react";
import viewTypes from "../../../../types/viewTypes";
import iconButtonTypes from "types/iconButtonTypes";
import StoresStore from "../../../../store/StoresStore";
import moment from "moment";
import File from "../../../../components/File";
import { observer } from "mobx-react";
import Loader from "../../../../components/Loader";
import FolderCard from "../../../../components/cards/FolderCard";

const InnerFiles = observer((props) => {
  const { storeInfo, isFilesFetching, storeFiles: files } = StoresStore;

  const [viewType, setViewType] = useState(viewTypes.grid);
  const [dates, setDates] = useState([]);

  const setGridView = () => {
    setViewType(viewTypes.grid);
  };

  const setListView = () => {
    setViewType(viewTypes.lines);
  };

  const store_id = +props.match.params.id;

  useEffect(() => {
    if (storeInfo.store_id === store_id) {
      files.set(null);
    }
  }, []);

  useEffect(() => {
    if (files.get() && files.get().length) {
      setDates([
        ...new Set(
          files.get().map(({ created }) => created.format("DD MMMM YYYY"))
        ),
      ]);
    }
  }, [files.get()]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.headInfo}>
          <h2 className={styles.title}>Папки</h2>
          <SearchQuick />
        </div>
        <div className={styles.buttons}>
          <div className={styles.viewButton}>
            <ButtonIcon
              Icon={FileGridIcons}
              onClick={setGridView}
              type={
                viewType === viewTypes.grid ? iconButtonTypes.grey : undefined
              }
            />
            <ButtonIcon
              Icon={FileLinesIcon}
              onClick={setListView}
              type={
                viewType === viewTypes.lines ? iconButtonTypes.grey : undefined
              }
            />
          </div>
          <ButtonIcon Icon={ExportIcon} />
          <ButtonIcon
            Icon={DeleteIcon}
            className={styles.deleteButton + " " + styles.headBtn}
            disabled
          />
          <Button text="Создать папку" Icon={AddFolderIcon} />
        </div>
      </div>
      {files.get() && files.get().length && !isFilesFetching ? (
        viewType === viewTypes.grid ? (
          <div className={styles.inner}>
            <div className={styles.head}>
              <h2 className={styles.title}>Files</h2>
              <div className={styles.filesButtons}>
                <ButtonIcon Icon={PhotoIcon} type={iconButtonTypes.grey} />
                <ButtonIcon Icon={VideoIcon} />
              </div>
            </div>
            {dates.length
              ? dates.map((date) => (
                  <React.Fragment key={date}>
                    <Checkbox
                      label={`${moment.weekdays(
                        moment(date).isoWeekday()
                      )}, ${date}`}
                      className={styles.checkbox}
                    />
                    <div className={styles.cards}>
                      {files
                        .get()
                        .filter(({ created }) =>
                          moment(date).isSame(created, "days")
                        )
                        .sort((fileA, fileB) => {
                          if (fileA.created.isAfter(fileB.created)) return -1;
                          else if (fileA.created.isBefore(fileB.created))
                            return 1;
                          else return 0;
                        })
                        .map(({ created, filename }) => (
                          <div>
                            <File
                              file={{
                                file: filename,
                                file_url: filename,
                                created,
                              }}
                              cardFile
                            />
                          </div>
                        ))}
                    </div>
                  </React.Fragment>
                ))
              : null}
          </div>
        ) : viewType === viewTypes.lines ? (
          <div className={styles.lines}>
            {/*            <table className={styles.table}>
              <FilesTableHead thText="files" />
              <tbody>
                <FilesFolderRow label="Video" />
                <FilesFolderRow label="Photo" />
                <FilesFolderRow label="Screensavers" />
              </tbody>
            </table>*/}
            {/*<div className={styles.hrLines}></div>*/}
            <table className={cn(styles.table, styles.tableFiles)}>
              <FilesTableHead thText="File size" />
              <tbody>
                {files.get().map(({ created, filename }) => (
                  <React.Fragment key={created}>
                    <FilesRow
                      file={{
                        file: filename,
                        file_url: filename,
                        created,
                      }}
                      key={created}
                    />
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : null
      ) : (
        <div className={styles.loader}>
          {isFilesFetching ? (
            <Loader types={["medium"]} />
          ) : (
            "Нет файлов для этой АЗС"
          )}
        </div>
      )}
    </div>
  );
});

export default InnerFiles;
