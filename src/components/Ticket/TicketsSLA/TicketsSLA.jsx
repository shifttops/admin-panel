import styles from "../../../pages/TicketPage/ticket-page.module.scss";
import cn from "classnames";
import { TimeIcon } from "../../../icons";
import DateComp from "../../Date";
import DatePicker from "react-datepicker";
import moment from "moment";

const TicketsSLA = ({ isEditMode, frTime, setFRTime }) => {
  const slasMapper = [
    {
      title: "First response time",
      date: frTime,
    },
  ];

  const handleDateChange = ({ newDate }) => {
    setFRTime(moment(newDate));
  };

  return (
    <div className={styles.details}>
      {slasMapper.map(({ title, date }) => (
        <div className={cn(styles.details__body, styles.details__body__time)}>
          <div className={styles.details__body__title}>{title} </div>
          <div className={styles.details__body__field}>
            <span className={styles.timeIcon}>
              <TimeIcon color={`rgba(51, 51, 51, 0.5)`} />
            </span>
            <DateComp date={date} />
            {/*{!isEditMode ? (
              <DateComp date={date} />
            ) : (
              <DatePicker
                selected={date.toDate()}
                className={styles.date}
                dateFormat={"dd MMMM yyyy, HH:mm"}
                onChange={(newDate) => handleDateChange({ newDate })}
                showTimeSelect
              />
            )}*/}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketsSLA;
