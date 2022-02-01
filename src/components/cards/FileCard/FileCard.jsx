import styles from "./file-card.module.scss";
import ButtonIcon from "components/buttons/ButtonIcon";
import { useState } from "react";
import {
  createMapper,
  getFileFormat,
  getFileName,
  getImageForFile,
} from "../../../helpers/functions";
import { DeleteIcon, SaveVideo } from "../../../icons";
import cn from "classnames";
import withMoreMenu from "../../../helpers/HOC/withMoreMenu";
import { saveAs } from "file-saver";

const FileCard = ({
  file,
  className,
  onClick,
  onDelete,
  onEdit,
  onDownload,
  withMenu,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleImageClick = (e) => {
    if (onClick) onClick();
  };

  const handleDownload = (e) => {
    saveAs(file.file_url, getFileName(file.file, "/"));
    if (onDownload) onDownload();
  };

  const handleEdit = (e) => {
    setIsEditMode(true);
  };

  const handleEditSave = () => {
    setIsEditMode(false);
    if (onEdit) onEdit();
  };

  const handleDelete = (e) => {
    if (onDelete) onDelete();
  };

  const Name = ({ name, isEditMode }) => (
    <p className={styles.card__name}>{name}</p>
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
      handleDownload,
      // handleEdit,
      handleDelete,
    ],
  });

  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.card__imageBox}>
        <img
          onClick={(e) => handleImageClick(e)}
          src={getImageForFile(getFileFormat(getFileName(file.file, "/")))}
          alt=""
        />
      </div>
      <div className={styles.card__info}>
        {withMenu ? (
          withMoreMenu({
            Component: Name,
            ...{
              componentProps: {
                name: getFileName(file.file, "/"),
                isEditMode,
              },
              ...{
                moreMapper,
                name: getFileName(file.file, "/"),
              },
            },
          })
        ) : (
          <>
            <Name name={getFileName(file.file, "/")} />
            <ButtonIcon
              className={styles.cardMore}
              Icon={SaveVideo}
              onClick={handleDownload}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FileCard;
