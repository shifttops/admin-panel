import { fileTypesMapper } from "./mappers";
import moment from "moment";

export const getFileName = (file, sep) =>
  file.split(sep)[file.split(sep).length - 1];

export const getFileFormat = (fileName) => {
  if (fileName) {
    return fileName.split(".")[fileName.split(".").length - 1];
  }
};

export const getIconForFile = (fileFormat) =>
  fileTypesMapper.find((type) => type.types.includes(fileFormat))?.icon;

export const getTypeIconForFile = (fileFormat) =>
  fileTypesMapper.find((type) => type.types.includes(fileFormat))?.type;

export const getImageForFile = (fileFormat) =>
  fileTypesMapper.find((type) => type.types.includes(fileFormat))?.image;

export const humanizeDate = (date, dateNow = new Date()) => {
  const newDate = moment(date);
  const now = moment(dateNow);

  if (newDate.year() === now.year()) {
    if (newDate.month() === now.month()) {
      if (newDate.day() === now.day()) return "Today";
      else if (newDate.day() === moment(now).subtract(1, "days").day())
        return "Yesterday";
      else if (newDate.day() === moment(now).add(1, "days").day())
        return "Tomorrow";
      else return newDate.format("DD MMMM");
    } else return newDate.format("DD MMMM");
  } else return newDate.format("DD MMMM YYYY");
};

export const humanizeTime = (date, dateNow = new Date()) => {
  const newTime = moment(date);
  const now = moment(dateNow);

  if (newTime.hour() === now.hour()) {
    if (newTime.minute() === now.minute()) {
      if (newTime.second() === now.second()) return "Now";
      else
        return moment
          .duration(newTime.second() - now.second(), "seconds")
          .humanize(true);
    } else
      return moment
        .duration(newTime.minute() - now.minute(), "minutes")
        .humanize(true);
  } else
    return moment.duration(newTime.hour() - now.hour(), "hours").humanize(true);
};

export const getDate = ({
  date,
  dateNow = new Date(),
  isDateOnly = false,
  isTimeOnly = false,
}) => {
  if (!isDateOnly && !isTimeOnly) {
    if (humanizeDate(date, dateNow) === "Today") {
      return humanizeTime(date, dateNow);
    } else
      return `${humanizeDate(date, dateNow)}, ${moment(date).format("HH:mm")}`;
  } else {
    if (isDateOnly) return humanizeDate(date, dateNow);
    else {
      if (humanizeDate(date, dateNow) === "Today")
        return humanizeTime(date, dateNow);
      else return moment(date).format("HH:mm");
    }
  }
};

export const createMapper = ({ titles = [], icons = [], functions = [] }) => {
  if (titles.length)
    return titles.map((title, index) => ({
      title,
      Icon: icons[index] ? icons[index] : null,
      func: functions[index] ? functions[index] : () => {},
    }));
};
