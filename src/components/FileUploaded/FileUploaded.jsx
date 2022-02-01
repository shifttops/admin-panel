import styles from "./file-uploaded.module.scss";
import ButtonIcon from "../buttons/ButtonIcon";
import {
  getFileFormat,
  getIconForFile,
  getTypeIconForFile,
} from "../../helpers/functions";
import { CloseIcon } from "../../icons";
import React from "react";

const FileUploaded = ({ fileName, onRemove }) => (
  <div className={styles.file}>
    <span className={styles.file__icon}>
      <ButtonIcon
        disabled
        Icon={getIconForFile(getFileFormat(fileName))}
        type={getTypeIconForFile(getFileFormat(fileName))}
      />
    </span>
    <span className={styles.file__name}>{fileName}</span>
    <div
      className={styles.file__icon__close}
      color={"rgba(38, 38, 38, 0.72)"}
      onClick={onRemove}
    >
      <CloseIcon />
    </div>
  </div>
);

export default FileUploaded;
