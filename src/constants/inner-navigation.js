import routes from "./routes";
import InnerPlanner from "../pages/StoreListPage/innerPages/InnerPlanner/InnerPlanner";
import InnerCameras from "../pages/StoreListPage/innerPages/InnerCameras/InnerCameras";
import InnerConfiguration from "../pages/StoreListPage/innerPages/InnerConfiguration";
import InnerHistory from "../pages/StoreListPage/innerPages/InnerHistory/InnerHistory";
import InnerStatistic from "../pages/StoreListPage/innerPages/InnerStatistic";
import InnerInfo from "../pages/StoreListPage/innerPages/InnerInfo";
import InnerChat from "../pages/StoreListPage/innerPages/InnerChat";

const innerNavigation = [
  { to: routes.storeInfo, name: "Store Info", component: () => <InnerInfo /> },
  {
    to: routes.manageStore,
    name: "Manage Store",
    component: () => "Manage Store",
  },
  {
    to: routes.innerStatistic,
    name: "Statistic",
    component: () => <InnerStatistic />,
  },
  {
    to: routes.innerHistory,
    name: "History",
    component: () => <InnerHistory />,
  },
  { to: routes.innerChat, name: "Chat", component: () => <InnerChat /> },
  { to: routes.innerFiles, name: "Files", component: () => "Files" },
  {
    to: routes.innerCameras,
    name: "Cameras",
    component: () => <InnerCameras />,
  },
  {
    to: routes.innerConfiguration,
    name: "Configuration",
    component: () => <InnerConfiguration />,
  },
  {
    to: routes.innerPlanner,
    name: "Planner",
    component: () => <InnerPlanner />,
  },
];

export default innerNavigation;
