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
  ScriptLogIcon,
  TicketIcon,
} from "icons";
import StoreListPage from "pages/StoreListPage";
import UsersPage from "pages/UsersPage";
import SettingsPage from "pages/SettingsPage";
import ScriptsPage from "pages/ScriptsPage";
import ActivityLogsPage from "pages/ActivityLogsPage";
import StoreGroupsPage from "pages/StoreGroupsPage";
import PlannerPage from "pages/PlannerPage";
import GroupPage from "pages/GroupPage";
import ChatPage from "pages/ChatPage";
import ScriptsLogsPage from "pages/ScriptsLogsPage";
import TicketsPage from "../pages/TicketsPage";

const mainNavigation = [
  {
    to: routes.home,
    name: "Список АЗС",
    Component: StoreListPage,
    icon: <HomeIcon />,
  },
  // {
  //   to: routes.tickets,
  //   name: "Tickets list",
  //   Component: TicketsPage,
  //   icon: <TicketIcon />,
  // },
  {
    to: routes.users,
    name: "Пользователи",
    Component: UsersPage,
    icon: <UserIcon />,
  },
  {
    to: routes.setting,
    name: "Настройки",
    Component: SettingsPage,
    icon: <SettingsIcon />,
  },
  {
    to: routes.scripts,
    name: "Файлы",
    Component: ScriptsPage,
    icon: <FilesIcon />,
  },
  {
    to: routes.logs,
    name: "Активити логи",
    Component: ActivityLogsPage,
    icon: <ActivityIcon />,
  },
  // {
  //   to: routes.scripts_logs,
  //   name: "Scripts logs",
  //   Component: ScriptsLogsPage,
  //   icon: <ScriptLogIcon />,
  // },
  // {
  //   to: routes.storeInfo,
  //   name: "Store Info",
  //   component: StoreInfo,
  //   icon: <StoreInfo />,
  // },
  {
    to: routes.groups,
    name: "Группы АЗС",
    Component: StoreGroupsPage,
    icon: <GroupIcon />,
  },
  // {
  //   to: routes.planner,
  //   name: "Planner",
  //   Component: PlannerPage,
  //   icon: <PlannerStrokeIcon />,
  // },
  /*  {
    to: routes.mcdStores,
    name: "Group",
    Component: GroupPage,
    icon: <GroupIcon />,
  },*/
  // {
  //   to: routes.chat,
  //   name: "Chat",
  //   Component: ChatPage,
  //   icon: <ChatMenuIcon />,
  // },
];

export default mainNavigation;
