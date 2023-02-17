import { Settings, SupportAgent, Group, Dashboard } from '@mui/icons-material';

import {
    dashboard,
    supportLogs,
    getUsersPath,
    submenu1,
    submenu2,
} from '../../consts/routePaths';

const sidebarRoutes = [
    {
        path: dashboard,
        name: "Dashboard",
        icon: Dashboard,
        key: "dashboard",
        sidebar: true
    },
    {
        name: "Submenu",
        rtlName: "Submenu",
        icon: Settings,
        key: "submenu",
        sidebar: true,
        children: [
            {
                path: submenu1,
                name: "Submenu 1",
                key: "submenu-1",
                sidebar: true
            },
            {
                path: submenu2,
                name: "Submenu 2",
                key: "submenu-1",
                sidebar: true
            },
            ]
    },
    {
        path: getUsersPath(0, 25),
        name: "Users",
        icon: Group,
        key: "user-module",
        sidebar: true,
        permissions: ['PERM_USER_CRUD'],
    },
    {
        path: supportLogs,
        name: "Support center",
        icon: SupportAgent,
        key: "support-center",
        sidebar: true,
        permissions: ['PERM_SUPPORT_BASIC', 'PERM_SUPPORT_CRUD', 'PERM_SUPPORT_ADMIN'],
    },
];

export default sidebarRoutes;
