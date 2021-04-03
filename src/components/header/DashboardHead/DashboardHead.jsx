import styles from "./dashboard-head.module.scss";
import ButtonIcon from "components/buttons/ButtonIcon";
import SearchQuick from "components/search/SearchQuick";
import { FavoriteIcon, PrintIcon, ReportIcon } from "icons";

export default function DashboardHead(params) {
  return (
    <div className={styles.dashboardHead}>
      <div className={styles.dashboardHead__searchWrapper}>
        <p className={styles.dashboardHead__title}>Store list</p>
        <SearchQuick />
        <div className={styles.dashboardHead__favorite}>
          <ButtonIcon Icon={FavoriteIcon} />
        </div>
      </div>
      <div className={styles.dashboardHead__buttons}>
        <div className={styles.dashboardHead__print}>
          <ButtonIcon Icon={PrintIcon} />
        </div>
        <button className={styles.dashboardHead__report}>
          {ReportIcon}
          Report
        </button>
      </div>
    </div>
  );
}
