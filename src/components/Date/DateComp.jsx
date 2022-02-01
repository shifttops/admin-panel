import { useEffect, useState } from "react";
import { getDate } from "../../helpers/functions";

const DateComp = ({ date, dateOnly = false, timeOnly = false }) => {
  const [now, setNow] = useState(new Date());

  const [result, setResult] = useState(
    getDate({ date, dateNow: now, isDateOnly: dateOnly, isTimeOnly: timeOnly })
  );

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()));

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setResult(
      getDate({
        date,
        dateNow: now,
        isDateOnly: dateOnly,
        isTimeOnly: timeOnly,
      })
    );
  }, [now]);

  return result;
};

export default DateComp;
