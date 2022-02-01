import styles from "./image-card.module.scss";
import { useEffect, useState } from "react";
import Loader from "../../Loader";
import ButtonIcon from "../../buttons/ButtonIcon";
import { DeleteIcon, EditIcon, MoreIcon, SaveVideo } from "../../../icons";
import cn from "classnames";
import noImage from "../../../images/noImage.jpg";
import { saveAs } from "file-saver";
import { createMapper, getFileName } from "../../../helpers/functions";
import { ToastsContainer, ToastsStore } from "react-toasts";
import withMoreMenu from "../../../helpers/HOC/withMoreMenu";
import Popup from "reactjs-popup";
import ImagePopup from "../../popups/ImagePopup";

const imageCardTypes = {
  small: styles.small,
  big: styles.big,
};

const ImageCard = ({
  url,
  name = "Image",
  className,
  onClick,
  onDelete,
  onEdit,
  onDownload,
  onError,
  onLoad,
  type,
  withMenu,
}) => {
  const [isImageReady, setIsImageReady] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(
    url ? `${process.env.REACT_APP_URL}${url}` : noImage
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const handleLoad = (e) => {
    setIsImageReady(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setCurrentUrl(noImage);
    if (onError) onError(e);
  };

  const handleImageClick = (e) => {
    if (onClick) onClick();
  };

  const handleDownload = (e) => {
    if (currentUrl !== noImage) {
      saveAs(currentUrl, name);
    } else ToastsStore.error("No image to download", 3000, "toast");
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

  useEffect(() => {
    if (url) setCurrentUrl(`${process.env.REACT_APP_URL}${url}`);
    else {
      setCurrentUrl(noImage);
    }
  }, [url]);

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
    <div className={cn(styles.card, className, imageCardTypes[type])}>
      {isImageReady && currentUrl !== noImage ? (
        <Popup
          modal
          trigger={
            <div className={styles.card__imageBox}>
              <img
                onClick={(e) => handleImageClick(e)}
                onLoad={(e) => handleLoad(e)}
                onError={(e) => handleError(e)}
                src={currentUrl}
                alt=""
              />
            </div>
          }
        >
          {(close) => <ImagePopup url={currentUrl} onClose={close} />}
        </Popup>
      ) : (
        <div className={styles.card__imageBox}>
          <img
            onClick={(e) => handleImageClick(e)}
            onLoad={(e) => handleLoad(e)}
            onError={(e) => handleError(e)}
            src={currentUrl}
            alt=""
          />
          {!isImageReady && currentUrl !== noImage ? (
            <div className={styles.loader}>
              <Loader types={["medium", "grey"]} />
            </div>
          ) : null}
        </div>
      )}
      <div className={styles.card__info}>
        {withMenu ? (
          withMoreMenu({
            Component: Name,
            ...{
              componentProps: {
                name,
                isEditMode,
              },
              ...{
                moreMapper,
                name,
              },
            },
          })
        ) : (
          <>
            <Name name={name} />
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

export default ImageCard;
