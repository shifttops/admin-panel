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
import FolderCard from "components/cards/FolderCard";
import Checkbox from "components/Checkbox";
import ImageCard from "components/cards/ImageCard";
import VideoCard from "components/cards/VideoCard";
import FilesFolderRow from "components/tables/FilesFolderRow";
import FilesTableHead from "components/tables/FilesTableHead";
import FilesRow from "components/tables/FilesRow";
import cn from "classnames";
import React, { useEffect, useState } from "react";
import viewTypes from "types/viewTypes";
import iconButtonTypes from "types/iconButtonTypes";
import StoresStore from "../../../../store/StoresStore";
import { refreshToken } from "../../../../helpers/AuthHelper";

export default function InnerFiles() {
  const [viewType, setViewType] = useState(viewTypes.grid);
  const { storeInfo } = StoresStore;
  const [files, setFiles] = useState([]);

  const setGridView = () => {
    setViewType(viewTypes.grid);
  };

  const setListView = () => {
    setViewType(viewTypes.lines);
  };

  useEffect(() => {
    const getFiles = async () => {
      try {
        await refreshToken();

        const resp = await fetch(
          `${process.env.REACT_APP_URL}/api/display_store_minio_files/${storeInfo.store_id}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("access")}`,
            },
          }
        );
        if (resp.status === 200) {
          const res = await resp.json();
          const files = Object.keys(res)
            .sort((a, b) => new Date(b) - new Date(a))
            .map((key) => ({ files: res[key], date: key }));
          setFiles(files);
          // this.metrics.set({ ...res });
          // setError("");
        }
      } catch (e) {
        // setError(e.message);
        console.log(e.message);
      }
    };

    getFiles();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.headInfo}>
          <h2 className={styles.title}>Folders</h2>
          <SearchQuick />
          <ButtonIcon Icon={SortIcon} />
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
          <Button text="Create folder" Icon={AddFolderIcon} />
        </div>
      </div>

      {viewType === viewTypes.grid && (
        <>
          <div className={styles.cards}>
            <FolderCard />
            <FolderCard />
          </div>
          <div className={styles.hr}></div>
          <div className={styles.inner}>
            <div className={styles.head}>
              <h2 className={styles.title}>Files</h2>
              <div className={styles.filesButtons}>
                <ButtonIcon Icon={PhotoIcon} type={iconButtonTypes.grey} />
                <ButtonIcon Icon={VideoIcon} />
              </div>
            </div>
            {files.map((file) => (
              <React.Fragment key={file.date}>
                <Checkbox label={file.date} className={styles.checkbox} />
                <div className={styles.cards}>
                  {/*                  {file.files.map((file) => (
                    <ImageCard key={file} file={file} />
                  ))}*/}
                  {/* <ImageCard />
                  <ImageCard />
                  <ImageCard /> */}
                </div>
              </React.Fragment>
            ))}
            {/* : ""} */}
          </div>
          <div className={styles.inner}>
            <Checkbox label="Fri, 12  March" className={styles.checkbox} />
            <div className={styles.cards}>
              <VideoCard />
            </div>
          </div>
        </>
      )}
      {viewType === viewTypes.lines && (
        <div className={styles.lines}>
          <table className={styles.table}>
            <FilesTableHead thText="files" />
            <tbody>
              <FilesFolderRow label="Video" />
              <FilesFolderRow label="Photo" />
              <FilesFolderRow label="Screensavers" />
            </tbody>
          </table>
          <div className={styles.hrLines}></div>
          <table className={cn(styles.table, styles.tableFiles)}>
            <FilesTableHead thText="File size" />
            <tbody>
              {files.map((file) => (
                <React.Fragment key={file.date}>
                  <Checkbox
                    label={file.date}
                    className={styles.checkboxTable}
                  />
                  {file.files.map((file) => (
                    <FilesRow file={file} key={file} />
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
