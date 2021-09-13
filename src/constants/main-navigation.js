import routes from "./routes";
import {
  HomeIcon,
  UserIcon,
  SettingsIcon,
  FilesIcon,
  ActivityIcon,
  GroupIcon,
  PlannerIcon,
  PlannerStrokeIcon,
  ChatMenuIcon,
} from "icons";
import StoreListPage from "pages/StoreListPage";
import UsersPage from "pages/UsersPage";
import SettingsPage from "pages/SettingsPage";
import FilesPage from "pages/FilesPage";
import ActivityLogsPage from "pages/ActivityLogsPage";
import StoreGroupsPage from "pages/StoreGroupsPage";
import PlannerPage from "pages/PlannerPage";
import GroupPage from "pages/GroupPage";
import ChatPage from "pages/ChatPage";

const mainNavigation = [
  {
    to: routes.home,
    name: "Store list",
    component: <StoreListPage />,
    icon: <HomeIcon />,
  },
  { to: routes.users, name: "Users", component: <UsersPage />, icon: <UserIcon /> },
  {
    to: routes.setting,
    name: "Settings",
    component: <SettingsPage />,
    icon: <SettingsIcon />,
  },
  {
    to: routes.scripts,
    name: "Files",
    component: <FilesPage />,
    icon: <FilesIcon />,
  },
  {
    to: routes.logs,
    name: "Activity logs",
    component: <ActivityLogsPage />,
    icon: <ActivityIcon />,
  },
  // {
  //   to: routes.storeInfo,
  //   name: "Store Info",
  //   component: StoreInfo,
  //   icon: <StoreInfo />,
  // },
  {
    to: routes.groups,
    name: "Store groups",
    component: <StoreGroupsPage />,
    icon: <GroupIcon />,
  },
  {
    to: routes.planner,
    name: "Planner",
    component: <PlannerPage />,
    icon: <PlannerStrokeIcon />,
  },
  {
    to: routes.mcdStores,
    name: "Group",
    component: <GroupPage />,
    icon: <GroupIcon />,
  },
  {
    to: routes.chat,
    name: "Chat",
    component: <ChatPage />,
    icon: <ChatMenuIcon />,
  },
];

export default mainNavigation;
