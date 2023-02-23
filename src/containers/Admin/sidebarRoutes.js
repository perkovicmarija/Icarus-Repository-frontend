import { SupportAgent, Group, Dashboard, MenuBook } from '@mui/icons-material';

import {
    dashboard,
    supportLogs,
    getUsersPath,
    auditChecklistOverview
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
        path: auditChecklistOverview,
        name: "Audit checklists",
        icon: MenuBook,
        key: "auditChecklistOverview",
        sidebar: true
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
