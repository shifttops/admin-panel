import styles from "./dashboard-head.module.scss";
import SearchQuick from "components/search/SearchQuick";
import { ReportIcon } from "icons";
import Popup from "reactjs-popup";
import ReportPopup from "components/popups/ReportPopup";
import FilterPopup from "../../popups/FilterPopup";
import Button from "../../buttons/Button/Button";
import MapPopup from "../../popups/MapPopup";

export default function DashboardHead({ setSearch, checkedStores }) {
  return (
    <div className={styles.dashboardHead}>
      <div className={styles.dashboardHead__searchWrapper}>
        <p className={styles.dashboardHead__title}>Список АЗС</p>
        <SearchQuick setSearch={setSearch} />
        {/*<div className={styles.dashboardHead__favorite}>
          <ButtonIcon Icon={SortIcon} className={styles.sortBtn} />
        </div>*/}
      </div>
      <div className={styles.dashboardHead__buttons}>
        {/*<Popup*/}
        {/*  modal*/}
        {/*  trigger={*/}
        {/*    <Button className={styles.dashboardHead__report} text={"Map"} />*/}
        {/*  }*/}
        {/*>*/}
        {/*  {(close) => <MapPopup onClose={close} titleText={"Map"}/>}*/}
        {/*</Popup>*/}
        {/*<Popup*/}
        {/*  modal*/}
        {/*  trigger={*/}
        {/*    <Button className={styles.dashboardHead__report} text={"Filter"} />*/}
        {/*  }*/}
        {/*>*/}
        {/*  {(close) => <FilterPopup onClose={close} />}*/}
        {/*</Popup>*/}
        <Popup
          modal
          trigger={
            <Button
              className={styles.dashboardHead__report}
              text="Отчёт"
              Icon={ReportIcon}
            />
          }
        >
          {(close) => (
            <ReportPopup onClose={close} checkedStores={checkedStores} />
          )}
        </Popup>
      </div>
    </div>
  );
}
