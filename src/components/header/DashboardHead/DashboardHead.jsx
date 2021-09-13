import styles from "./dashboard-head.module.scss";
import ButtonIcon from "components/buttons/ButtonIcon";
import SearchQuick from "components/search/SearchQuick";
import { FavoriteIcon, PrintIcon, ReportIcon, SortIcon } from "icons";
import Popup from "reactjs-popup";
import ReportPopup from "components/popups/ReportPopup";
import Button from "components/buttons/Button";
import FilterPopup from "../../popups/FilterPopup";

export default function DashboardHead({setSearch, checkedStores}) {
  return (
    <div className={styles.dashboardHead}>
      <div className={styles.dashboardHead__searchWrapper}>
        <p className={styles.dashboardHead__title}>Store list</p>
        <SearchQuick setSearch={setSearch}/>
        <div className={styles.dashboardHead__favorite}>
          <ButtonIcon Icon={SortIcon} className={styles.sortBtn} />
        </div>
      </div>
      <div className={styles.dashboardHead__buttons}>
      <Popup
          modal
          trigger={
            <Button
              className={styles.dashboardHead__report}
              // Icon={ReportIcon}
              text="Filter"
            ></Button>
          }
        >
          {(close) => <FilterPopup onClose={close} />}
        </Popup>
        <Popup
          modal
          trigger={
            <Button
              className={styles.dashboardHead__report}
              Icon={ReportIcon}
              text="Report"
            ></Button>
          }
        >
          {(close) => <ReportPopup onClose={close} checkedStores={checkedStores}/>}
        </Popup>
      </div>
    </div>
  );
}
