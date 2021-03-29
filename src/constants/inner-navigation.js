import routes from './routes';
import StoreInfo from '../pages/StoreListPage/innerPages/StoreInfo/StoreInfo';
import InnerPlanner from "../pages/StoreListPage/innerPages/innerPlanner/InnerPlanner";

const innerNavigation = [
  { to: routes.storeInfo, name: 'Store Info', component: () => 'Store Info' },
  { to: routes.manageStore, name: 'Manage Store', component: () => 'Manage Store' },
  { to: routes.innerStatistic, name: 'Statistic', component: () => 'Statistic' },
  { to: routes.innerHistory, name: 'History', component: () => 'History' },
  { to: routes.innerChat, name: 'Chat', component: () => 'Chat' },
  { to: routes.innerFiles, name: 'Files', component: () => 'Files' },
  { to: routes.innerCameras, name: 'Cameras', component: () => 'Cameras' },
  { to: routes.innerConfiguration, name: 'Configuration', component: () => 'Configuration' },
  { to: routes.innerPlanner, name: 'Planner', component: () => <InnerPlanner/>},
  ];

export default innerNavigation;
