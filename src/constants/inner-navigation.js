import routes from "./routes";
import InnerInfo from "pages/StoreListPage/innerPages/InnerInfo";
import InnerStatistic from "pages/StoreListPage/innerPages/InnerStatistic";
import InnerHistory from "pages/StoreListPage/innerPages/InnerHistory";
import InnerChat from "pages/StoreListPage/innerPages/InnerChat";
import InnerCameras from "pages/StoreListPage/innerPages/InnerCameras";
import InnerConfiguration from "pages/StoreListPage/innerPages/InnerConfiguration";
import InnerPlanner from "pages/StoreListPage/innerPages/InnerPlanner";
import InnerFiles from "pages/StoreListPage/innerPages/InnerFiles";
import InnerManage from "pages/StoreListPage/innerPages/InnerManage";
import InnerEdit from "../pages/ScriptsPage/InnerEdit/InnerEdit";
import InnerLaunch from "../pages/ScriptsPage/InnerLaunch/InnerLaunch";
import InnerTickets from "../pages/StoreListPage/innerPages/InnerTickets";
import InnerSchedule from "../pages/StoreListPage/innerPages/InnerSchedule";
import InnerGraphics from "../pages/StoreListPage/innerPages/InnerGraphics";

export const innerNavigation = [
  { to: routes.storeInfo, name: "АЗС Инфо", Component: InnerInfo },
  { to: routes.innerSchedule, name: "Расписание АЗС", Component: InnerSchedule },
  {
    to: routes.manageStore,
    name: "Управление АЗС",
    Component: InnerManage,
  },
  {
    to: routes.innerStatistic,
    name: "Статистика",
    Component: InnerStatistic,
  },
  {
    to: routes.innerHistory,
    name: "История",
    Component: InnerHistory,
  },
  { to: routes.innerChat, name: "Чат", Component: InnerChat },
  { to: routes.innerFiles, name: "Файлы", Component: InnerFiles },
  {
    to: routes.innerCameras,
    name: "Камеры",
    Component: InnerCameras,
  },
  // {
  //   to: routes.innerTickets,
  //   name: "Tickets",
  //   Component: InnerTickets,
  // },
  {
    to: routes.innerConfiguration,
    name: "Конфигурация",
    Component: InnerConfiguration,
  },
  {
    to: routes.innerPlanner,
    name: "Планировщик",
    Component: InnerPlanner,
  },
  {
    to: routes.innerBusiness,
    name: "Бизнес данные",
    Component: InnerGraphics,
  },
];

export const innerNavigationScripts = [
  {
    to: `${routes.scriptsEdit}`,
    name: "Edit",
    Component: InnerEdit,
  },
  {
    to: `${routes.scriptsLaunch}`,
    name: "Launch",
    Component: InnerLaunch,
  },
];

export const presetNavigation = [
  {
    to: `${routes.scriptsLaunch}/:preset_id`,
    name: "Preset",
    Component: InnerLaunch,
  },
];

// export default innerNavigation;
