import styles from "./file.module.scss";
import { fileTypesMapper } from "../../helpers/mappers";
import {
  createMapper,
  getFileFormat,
  getFileName,
  getIconForFile,
  getTypeIconForFile,
} from "../../helpers/functions";
import ImageCard from "../cards/ImageCard";
import FileCard from "../cards/FileCard";
import { saveAs } from "file-saver";
import ButtonIcon from "../buttons/ButtonIcon";
import { DeleteIcon, EditIcon, SaveVideo } from "../../icons";
import withMoreMenu from "../../helpers/HOC/withMoreMenu";
import { useState } from "react";
import VideoCard from "../cards/VideoCard";

const File = ({
  file,
  onEdit,
  onDelete,
  onDownload,
  withMore = false,
  cardFile = false,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleFileDownload = (file) => {
    saveAs(
      `${process.env.REACT_APP_URL}${file.file_url}`,
      getFileName(file.file, "/")
    );

    if (onDownload) onDownload();
  };

  const handleFileEdit = () => {
    setIsEditMode(true);
  };

  const handleEditSave = () => {
    if (onEdit) onEdit();
    setIsEditMode(false);
  };

  const handleFileDelete = () => {
    if (onDelete) onDelete();
  };

  const FileItem = ({ file, isEditMode }) => (
    <div className={styles.file__info}>
      <span className={styles.file__icon}>
        <ButtonIcon
          onClick={!withMore ? () => handleFileDownload(file) : null}
          Icon={getIconForFile(getFileFormat(getFileName(file.file, "/")))}
          type={getTypeIconForFile(getFileFormat(getFileName(file.file, "/")))}
        />
      </span>
      <span className={styles.file__name}>
        {getFileName(file.file, "/")}
        {/*{!isEditMode ? (
            ) : (
              <div className={styles.file__edit}>
                <input
                  className={styles.file__edit__input}
                  onChange={(e) => setNewFileName(e.target.value.trim())}
                  defaultValue={getFileName(file.file, "/")
                    .split(".")
                    .slice(0, -1)
                    .join(".")}
                  type="text"
                />
                <span>.{getFileFormat(getFileName(file.file, "/"))}</span>
              </div>
            )}*/}
      </span>
    </div>
  );

  const moreMapper = createMapper({
    titles: [
      "Download", //"Edit",
      "Delete",
    ],
    icons: [
      SaveVideo, //EditIcon,
      DeleteIcon,
    ],
    functions: [
      () => handleFileDownload(file),
      // handleFileEdit,
      handleFileDelete,
    ],
  });

  return (
    <div className={styles.file}>
      {fileTypesMapper[0].types.includes(
        getFileFormat(getFileName(file.file, "/"))
      ) ? (
        <ImageCard
          url={file.file_url}
          name={getFileName(file.file, "/")}
          withMenu={withMore}
          onDelete={handleFileDelete}
          // onEdit={onEdit ? onEdit : () => {}}
        />
      ) : fileTypesMapper[1].types.includes(
          getFileFormat(getFileName(file.file, "/"))
        ) ? (
        <VideoCard file={file} />
      ) : cardFile ? (
        <FileCard file={file} onDelete={handleFileDelete} withMenu={withMore} />
      ) : (
        <div className={styles.file__body}>
          {!withMore ? (
            <FileItem file={file} />
          ) : (
            withMoreMenu({
              Component: FileItem,
              ...{
                componentProps: {
                  file,
                  isEditMode,
                },
                ...{
                  name: getFileName(file.file, "/"),
                  moreMapper,
                },
              },
            })
          )}
        </div>
      )}
    </div>
  );
};

export default File;
