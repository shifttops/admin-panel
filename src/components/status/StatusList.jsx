import styles from "./status-list.module.scss";

export default function StatusList() {
  return (
    <ul className={styles.statusChange}>
      <li className={styles.statusChange__item}>Deployed</li>
      <li className={styles.statusChange__item}>Deployment</li>
      <li className={styles.statusChange__item}>Ready for deployment</li>
      <li className={styles.statusChange__item}>Algorithm Configuration</li>
      <li className={styles.statusChange__item}>Test</li>
      <li className={styles.statusChange__item}>Under Maintenance</li>
    </ul>
  );
}
