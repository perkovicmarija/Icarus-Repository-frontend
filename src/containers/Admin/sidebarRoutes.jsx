import {
  Group,
  MenuBook,
  SupportAgent,
  Settings,
  LibraryBooks,
} from "@mui/icons-material";
import {
  auditChecklistOverview,
  getClientsPath,
  getSupportLogsPath,
  getUsersPath,
  icarusDocs,
  supportLogs,
} from "../../consts/routePaths";

const sidebarRoutes = [
  {
    path: auditChecklistOverview,
    name: "Audit checklists",
    icon: MenuBook,
    key: "auditChecklistOverview",
    sidebar: true,
  },
  {
    path: getUsersPath(0, 25),
    name: "Users",
    icon: Group,
    key: "user-module",
    sidebar: true,
    permissions: ["PERM_USER_CRUD"],
  },
  {
    path: supportLogs,
    name: "Support center",
    icon: SupportAgent,
    key: "support-center",
    sidebar: true,
    permissions: [
      "PERM_SUPPORT_BASIC",
      "PERM_SUPPORT_CRUD",
      "PERM_SUPPORT_ADMIN",
    ],
  },
  {
    path: icarusDocs,
    name: "Icarus Docs",
    icon: LibraryBooks,
    key: "icarus-docs",
    sidebar: true,
    permissions: [
      "PERM_SUPPORT_BASIC",
      "PERM_SUPPORT_CRUD",
      "PERM_SUPPORT_ADMIN",
    ],
  },
  {
    name: "Settings",
    icon: Settings,
    key: "setting-module",
    sidebar: true,
    permissions: [
      "PERM_SUPPORT_BASIC",
      "PERM_SUPPORT_CRUD",
      "PERM_SUPPORT_ADMIN",
    ],
    children: [
      {
        path: getClientsPath(0, 25),
        name: "Clients",
        key: "clients-list",
        sidebar: true,
        permissions: [
          "PERM_SUPPORT_BASIC",
          "PERM_SUPPORT_CRUD",
          "PERM_SUPPORT_ADMIN",
        ],
      },
    ],
  },
];

export default sidebarRoutes;
