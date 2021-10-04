import styles from "./report-popup.module.scss";
import DatePicker from "react-datepicker";
import { CloseIcon, DateIcon } from "icons";
import Checkbox from "components/Checkbox";
import global from "scss/global.scss";
import ButtonChoice from "components/buttons/ButtonChoice";
import Button from "components/buttons/Button";
import { useState } from "react";
import { ToastsStore } from "react-toasts";
import { refreshToken } from "../../../helpers/AuthHelper";

export default function ReportPopup({ onClose, checkedStores }) {
  const [error, setError] = useState("");
  const reportTypes = [
    {
      name: "store_report",
      visibleName: "Store Info",
    },
    {
      name: "event_report",
      visibleName: "Events",
    },
    {
      name: "error_report",
      visibleName: "Errors",
    },
  ];
  const [selectedType, setSelectedType] = useState(reportTypes[0].name);
  const [selectedPeriod, setSelectedPeriod] = useState([
    new Date(),
    new Date(),
  ]);

  const handleDateChange = (isFrom, value) => {
    const newDates = [...selectedPeriod];
    newDates[isFrom ? 0 : 1] = value.toISOString();
    if (!selectedPeriod[1]) {
      newDates[1] = new Date().toISOString();
    }
    setSelectedPeriod(newDates);
  };

  const handleCreateReport = async () => {
    if (!checkedStores.length) {
      ToastsStore.error("Select at least 1 store", 3000, "toast");
    } else {
      try {
        await refreshToken();

        const resp = await fetch(`${process.env.REACT_APP_URL}/api/reports/`, {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            store_ids: checkedStores,
            report_type: selectedType,
            period: selectedPeriod,
          }),
        });
        if (resp.status === 200) {
          const res = await resp.blob();
          let link = document.createElement("a");
          document.body.appendChild(link);

          var url = window.URL.createObjectURL(res);
          link.href = url;
          link.download = `download.xlsx`;
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
          setError("");
        } else {
          const res = await resp.json();
          ToastsStore.error(res.error, 3000, "toast");
        }
      } catch (e) {
        setError(e.message);
      }
    }
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupHead}>
        <span className={styles.title}>Report options</span>
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <form>
        <div className={styles.block}>
          <p className={styles.category}>Information in the report</p>
          {reportTypes.map((type) => (
            <Checkbox
              key={type.name}
              className={styles.checkbox}
              label={type.visibleName}
              checked={selectedType === type.name}
              onChange={() => setSelectedType(type.name)}
            />
          ))}
        </div>
        <div
          className={styles.block}
          // ${
          //   selectedType === "store_report" ? styles.hidden : ""
          // }`}
        >
          <p className={styles.category}>Period</p>
          <div className={styles.date}>
            <DatePicker
              selected={new Date(selectedPeriod[0])}
              onChange={(date) => handleDateChange(true, date)}
              showTimeSelect
              className={styles.calendar}
              maxDate={new Date()}
            />
            <DatePicker
              selected={new Date(selectedPeriod[1])}
              onChange={(date) => handleDateChange(false, date)}
              showTimeSelect
              className={styles.calendar}
              maxDate={new Date()}
            />
            {/* <button className={styles.dateButton}>
              <DateIcon />
            </button> */}
          </div>
        </div>
        <div className={styles.block}>
          <p className={styles.category}>Format</p>
          <ButtonChoice text="Excel" />
          {/* <ButtonChoice text="PDF" />
          <ButtonChoice text="Web" /> */}
          <div className={styles.popupButton}>
            <Button text="Create report" onClick={handleCreateReport} />
          </div>
        </div>
      </form>
    </div>
  );
}
