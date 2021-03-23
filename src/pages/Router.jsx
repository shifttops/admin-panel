import { Route, Switch } from "react-router";
import Sidebar from "../components/sidebar/Sidebar";
import ActivityLogsPage from "./ActivityLogsPage";
import FilesPage from "./FilesPage";
import SettingsPage from "./SettingsPage/SettingsPage";
import StoreGroupsPage from "./StoreGroupsPage";
import StoreListPage from "./StoreListPage";
import UsersPage from "./UsersPage";

export default function CustomRouter(params) {
  return (
    <>
      <Sidebar />
      <Switch>
        <Route exact path="/" component={StoreListPage} />
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/setting" component={SettingsPage} />
        <Route exact path="/files" component={FilesPage} />
        <Route exact path="/logs" component={ActivityLogsPage} />
        <Route exact path="/groups" component={StoreGroupsPage} />
      </Switch>
    </>
  );
}
