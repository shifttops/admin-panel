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

const innerNavigation = [
  { to: routes.storeInfo, name: "Store Info", component: () => <InnerInfo /> },
  {
    to: routes.manageStore,
    name: "Manage Store",
    component: () => <InnerManage />,
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
  { to: routes.innerFiles, name: "Files", component: () => <InnerFiles /> },
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
