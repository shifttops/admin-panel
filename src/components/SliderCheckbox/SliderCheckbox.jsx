import styles from "./slider-checkbox.module.scss";

export default function SliderCheckbox({ label, className, passed }) {
  console.log(passed)
  return (
    <div className={styles.wrapperCheckbox + " " + className}>
      <div className={styles.switcher}>
        {/* <label> */}
        <small className={styles.label}>{label}</small>
        <small className={`${styles.check} ${passed ? "" : styles.error}`}>
         {passed === null || passed === undefined ? "N/A" : `${passed}`}
        </small>
        {/* <input type="checkbox" defaultChecked /> */}
        {/* <span>
            <small></small>
          </span> */}
        {/* </label> */}
      </div>
    </div>
  );
}
