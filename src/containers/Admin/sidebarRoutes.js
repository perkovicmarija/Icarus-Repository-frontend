import { SupportAgent, Group, MenuBook } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';

import {
    supportLogs,
    getUsersPath,
    auditChecklistOverview,
    settingModule, clients, getClientsPath, supportCenter, getSupportLogsPath
} from '../../consts/routePaths';

const sidebarRoutes = [
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
        path: getSupportLogsPath(0, 25),
        name: "Support center",
        icon: SupportAgent,
        key: "support-center",
        sidebar: true,
        permissions: ['PERM_SUPPORT_BASIC', 'PERM_SUPPORT_CRUD', 'PERM_SUPPORT_ADMIN'],
    },
    {
        name: "Settings",
        icon: SettingsIcon,
        key: "setting-module",
        sidebar: true,
        permissions: ['PERM_SUPPORT_BASIC', 'PERM_SUPPORT_CRUD', 'PERM_SUPPORT_ADMIN'],
        children: [{
            path: getClientsPath(0, 25),
            name: "Clients",
            key: "clients-list",
            sidebar: true,
            permissions: ['PERM_SUPPORT_BASIC', 'PERM_SUPPORT_CRUD', 'PERM_SUPPORT_ADMIN'],
        }]
    },
];

export default sidebarRoutes;
