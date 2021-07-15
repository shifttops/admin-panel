import styles from "./slider-checkbox.module.scss";

export default function SliderCheckbox({ label, className }) {
  return (
    <div className={styles.wrapperCheckbox + " " + className}>
      <div className={styles.switcher}>
        {/* <label> */}
          <small className={styles.label}>{label}</small>
          {/* <input type="checkbox" defaultChecked /> */}
          {/* <span>
            <small></small>
          </span> */}
        {/* </label> */}
      </div>
    </div>
  );
}
