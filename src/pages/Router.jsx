import { Route, Switch } from "react-router";
import Sidebar from "../components/sidebar/Sidebar";
import ActivityLogsPage from "./ActivityLogsPage";
import FilesPage from "./FilesPage";
import SettingsPage from "./SettingsPage/SettingsPage";
import StoreGroupsPage from "./StoreGroupsPage";
import StoreListPage from "./StoreListPage";
import UsersPage from "./UsersPage";
import routes from "../constants/routes";

export default function CustomRouter(params) {
  return (
    <>
      <Sidebar />
      <Switch>
        <Route exact path={routes.home} component={StoreListPage} />
        <Route exact path={routes.users} component={UsersPage} />
        <Route exact path={routes.setting} component={SettingsPage} />
        <Route exact path={routes.files} component={FilesPage} />
        <Route exact path={routes.logs} component={ActivityLogsPage} />
        <Route exact path={routes.groups} component={StoreGroupsPage} />
      </Switch>
    </>
  );
}
