import styles from "./SearchQuick.module.scss";

export default function SearchQuick() {
  return (
    <div className={styles.dashboardSearch}>
      <input className={styles.search} type="text" placeholder="Quick search" />
    </div>
  );
}
