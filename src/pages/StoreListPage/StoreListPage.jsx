import { Route, Switch, BrowserRouter } from "react-router-dom";
import styles from "./store-list-page.module.scss";
import routes from "constants/routes";
import TableHead from "components/tables/TableHead";
import TableRow from "components/tables/TableRow";
import DashboardHead from "components/header/DashboardHead";
import StoreInfo from "pages/StoreListPage/innerPages/StoreInfo/StoreInfo";
import { ConfigIcon } from "icons";
import statusButtonTypes from "types/statusButtonTypes";

export default function StoreListPage(params) {
  return (
    <BrowserRouter>
      <div className={styles.dashboard__wrapper}>
        <Switch>
          <Route path={routes.storeInfo} component={StoreInfo} />
          <Route path={routes.home}>
            <DashboardHead />
            <table className={styles.table}>
              <TableHead th="Region" />
              <tbody>
                <TableRow
                  status="Algorithm Configuration"
                  type={statusButtonTypes.configuration}
                  Icon={ConfigIcon}
                />
                <TableRow status="Deployed" type={statusButtonTypes.deployed} />
                <TableRow status="Test" type={statusButtonTypes.test} />
                <TableRow
                  status="Deployment"
                  type={statusButtonTypes.deployment}
                />
                <TableRow
                  status="Under Maintenance"
                  type={statusButtonTypes.maintenance}
                />
              </tbody>
            </table>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
