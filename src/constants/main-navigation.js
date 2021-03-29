import routes from './routes';
import ActivityLogsPage from './../pages/ActivityLogsPage';
import FilesPage from './../pages/FilesPage';
import SettingsPage from './../pages/SettingsPage/SettingsPage';
import StoreGroupsPage from './../pages/StoreGroupsPage';
import StoreListPage from './../pages/StoreListPage';
import UsersPage from './../pages/UsersPage';
import { HomeIcon, UserIcon, SettingsIcon, FilesIcon, ActivityIcon, GroupIcon } from '../icons/icons';

const mainNavigation = [
	{ to: routes.home, name: 'Store list', component: StoreListPage, icon: <HomeIcon /> },
	{ to: routes.users, name: 'Users', component: UsersPage, icon: <UserIcon /> },
	{ to: routes.setting, name: 'Settings', component: SettingsPage, icon: <SettingsIcon /> },
	{ to: routes.files, name: 'Files', component: FilesPage, icon: <FilesIcon /> },
	{ to: routes.logs, name: 'Activity logs', component: ActivityLogsPage, icon: <ActivityIcon /> },
	{ to: routes.groups, name: 'Store groups', component: StoreGroupsPage, icon: <GroupIcon /> }
];

export default mainNavigation;
