import moment from "moment";

export const datesSort = (leftDate, rightDate) => {
  if (moment(leftDate).isBefore(rightDate)) return 1;
  else if (moment(leftDate).isAfter(rightDate)) return -1;
  else return 0;
};
