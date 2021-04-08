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
import { useState } from "react";
import viewTypes from "types/viewTypes";
import iconButtonTypes from "types/iconButtonTypes";
import minFiles from "images/min-files.jpg";
import playFile from "images/playFile.svg";

export default function InnerFiles() {
  const [viewType, setViewType] = useState(viewTypes.grid);

  const setGridView = () => {
    setViewType(viewTypes.grid);
  };

  const setListView = () => {
    setViewType(viewTypes.lines);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.headInfo}>
          <h2 className={styles.title}>Folders</h2>
          <SearchQuick />
          <ButtonIcon Icon={SortIcon} />
        </div>
        <div className={styles.buttons}>
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
          <ButtonIcon Icon={ExportIcon} />
          <ButtonIcon
            Icon={DeleteIcon}
            className={styles.deleteButton}
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
            <Checkbox label="Sat, 13  March" className={styles.checkbox} />
            <div className={styles.cards}>
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
            </div>
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
              <Checkbox
                label="Sat, 13  March"
                className={styles.checkboxTable}
              />
              <FilesRow img={minFiles} />
              <FilesRow img={minFiles} />
              <FilesRow img={minFiles} />
              <FilesRow img={minFiles} />
              <Checkbox
                label="Fri, 12  March"
                className={styles.checkboxTable}
              />
              <FilesRow img={minFiles} />
              <FilesRow img={minFiles} />
              <FilesRow img={minFiles} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
