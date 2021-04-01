import { Route, Switch, BrowserRouter } from "react-router-dom";
import routes from "../../constants/routes";
import DashboardHead from "../../components/header/dashboardHead/DashboardHead";
import TableHead from "../../components/tables/TableHead";
import TableRow from "../../components/tables/TableRow";
import StoreInfo from "./innerPages/StoreInfo/StoreInfo";
import styles from "./storeListPageStyles.module.scss";
import { CheckIcon } from "../../icons/icons";

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
                <TableRow status="Algorithm Configuration" />
                <TableRow status="Deployed" />
                <TableRow status="Test" />
                <TableRow status="Deployment" />
              </tbody>
            </table>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
