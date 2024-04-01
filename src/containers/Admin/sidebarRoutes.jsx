import {Group, LibraryBooks, MenuBook, Settings, SupportAgent} from "@mui/icons-material";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import {
  androidClients,
  auditChecklistOverview,
  clients,
  forumUsers,
  forumTopics,
  forumTags,
  icarusDocs,
  iOSClients,
  supportLogs,
  users,
  webClients,
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
    path: users,
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
        path: clients,
        name: "Clients",
        key: "clients",
        sidebar: true,
        permissions: [
          "PERM_SUPPORT_BASIC",
          "PERM_SUPPORT_CRUD",
          "PERM_SUPPORT_ADMIN",
        ],
      },
    ],
  },
  {
    name: "Logger",
    icon: TextSnippetIcon,
    key: "logger-module",
    sidebar: true,
    children: [
      {
        path: iOSClients,
        name: "IOS",
        key: "iOSLogs",
        sidebar: true,
      },
      {
        path: androidClients,
        name: "Android",
        key: "androidLogs",
        sidebar: true,
      },
      {
        path: webClients,
        name: "Web",
        key: "webLogs",
        sidebar: true,
      },
    ],
  },
  {
    name: "Forum",
    icon: Diversity3Icon,
    key: "forum-module",
    sidebar: true,
    children: [
      {
        path: forumUsers,
        name: "Forum Users",
        key: "forumUsers",
        sidebar: true,
      },
      {
        path: forumTopics,
        name: "Topics",
        key: "forumTopics",
        sidebar: true,
      },
      {
        path: forumTags,
        name: "Tags",
        key: "forumTags",
        sidebar: true,
      },
    ],
  },
];

export default sidebarRoutes;
