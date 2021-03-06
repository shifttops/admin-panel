import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "../../icons";
import styles from "./comment.module.scss";
import UserAccount from "../UserAccount";
import DateComp from "../Date";
import withMoreMenu from "../../helpers/HOC/withMoreMenu";
import Button from "../buttons/Button";
import { createMapper } from "../../helpers/functions";
import File from "../File";
import { ToastsStore } from "react-toasts";

const Comment = ({
  comment: {
    owner_first_name,
    owner_last_name,
    user,
    created: date,
    message: text,
    files,
    id,
  },
  onDelete,
  onEdit,
  onFileDelete,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentFiles, setCommentFiles] = useState([]);

  useEffect(() => {
    if (text && text.length) setCommentText(text);
    else setCommentText("");
  }, [text]);

  useEffect(() => {
    if (!isEditMode) setCommentText(text);
  }, [isEditMode]);

  const handleDelete = (e) => {
    onDelete({ comment_id: id });
    setIsEditMode(false);
  };

  const handleEdit = () => setIsEditMode(true);

  const handleEditSave = () => {
    if (text !== commentText || commentFiles.length) {
      if (commentText.trim().length) {
        onEdit({
          comment_id: id,
          message: commentText,
          files: [...files, ...commentFiles],
        });
        setIsEditMode(true);
      } else ToastsStore.error("Comment text can`t be empty", 3000, "toast");
    } else ToastsStore.error("No changes in comment to save", 3000, "toast");
  };

  const HeaderInfo = ({ owner_first_name, owner_last_name, user, date }) => (
    <div className={styles.comment__header__info}>
      <UserAccount
        accountName={
          (owner_first_name && owner_last_name) || user
            ? owner_first_name.length
              ? `${owner_first_name} ${owner_last_name}`
              : `User ${user}`
            : ""
        }
        className={styles.comment__sender}
      />
      <div className={styles.comment__date}>
        <DateComp date={date} />
      </div>
    </div>
  );

  return (
    <div className={styles.comment}>
      <div className={styles.comment__header}>
        {!isEditMode ? (
          withMoreMenu({
            Component: HeaderInfo,
            ...{
              componentProps: { owner_first_name, owner_last_name, user, date },
              ...{
                moreMapper: createMapper({
                  titles: ["Edit", "Delete"],
                  icons: [EditIcon, DeleteIcon],
                  functions: [handleEdit, handleDelete],
                }),
                name: text,
              },
            },
          })
        ) : (
          <>
            <HeaderInfo
              owner_first_name={owner_first_name}
              owner_last_name={owner_last_name}
              user={user}
              date={date}
            />
            {isEditMode ? (
              <div className={styles.comment__buttons}>
                <Button text={"Save"} onClick={() => handleEditSave()} />
                <Button
                  className={"maintenance"}
                  text={"Cancel editing"}
                  onClick={() => setIsEditMode(false)}
                />
              </div>
            ) : null}
          </>
        )}
      </div>
      <div className={styles.comment__body}>
        {!isEditMode ? (
          <div className={styles.comment__text}>{text}</div>
        ) : (
          <textarea
            onChange={(e) => setCommentText(e.target.value)}
            defaultValue={text}
          />
        )}
        {files && files.length ? (
          <div className={styles.comment__files}>
            <div className={styles.comment__files__body}>
              {files.map((file) => (
                <File
                  file={file}
                  withMore={isEditMode}
                  cardFile
                  onDelete={() => onFileDelete({ id: file.pk })}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
