import styles from "../TicketInfo/ticket-info.module.scss";
import cn from "classnames";
import { TimeIcon } from "../../../icons";
import DateComp from "../../Date";

const TicketsSLA = ({ frTime }) => {
  const slasMapper = [
    {
      title: "First response time",
      date: frTime,
    },
  ];

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
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketsSLA;
