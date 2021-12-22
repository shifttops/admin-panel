import { DocIcon, ImagesIcon, PptIcon, XlsIcon } from "../icons";
import React from "react";
import iconButtonTypes from "../types/iconButtonTypes";

export const getFileName = (file, sep) =>
  file.split(sep)[file.split(sep).length - 1];

export const getFileFormat = (fileName) => {
  if (fileName) {
    return fileName.split(".")[fileName.split(".").length - 1];
  }
};

export const getIconForFile = (fileFormat) => {
  if (["jpg", "jpeg", "png", "webp"].includes(fileFormat)) {
    return ImagesIcon;
  } else if (["docx", "doc", "txt", "rtf"].includes(fileFormat)) {
    return DocIcon;
  } else if (["xls, xlsx"].includes(fileFormat)) {
    return XlsIcon;
  } else if (["ppt", "pptx"].includes(fileFormat)) {
    return PptIcon;
  }
};

export const getTypeIconForFile = (fileFormat) => {
  if (["jpg", "jpeg", "png", "webp"].includes(fileFormat)) {
    return iconButtonTypes.grey;
  } else if (["docx", "doc", "txt", "rtf"].includes(fileFormat)) {
    return iconButtonTypes.blue;
  } else if (["xls, xlsx"].includes(fileFormat)) {
    return iconButtonTypes.green;
  } else if (["ppt", "pptx"].includes(fileFormat)) {
    return iconButtonTypes.yellow;
  }
};
