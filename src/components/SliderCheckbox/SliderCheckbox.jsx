import styles from "./slider-checkbox.module.scss";

export default function SliderCheckbox() {
  return (
    <div className={styles.wrapperCheckbox}>
      <div className={styles.switcher}>
        <label>
          <small className={styles.label}>Cameras #53</small>
          <input type="checkbox" value="" />
          <span>
            <small></small>
          </span>
        </label>
      </div>
    </div>
  );
}
