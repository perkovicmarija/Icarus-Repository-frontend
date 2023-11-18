export const root = "/";
export const fourZeroFour = "/404";
export const signIn = "/signin";
export const confirmationCode = "/confirmation-code";
export const adminRoot = "/admin";
export const dashboard = adminRoot + "/dashboard";

// USERS
export const userModule = adminRoot + "/user-module";

export const users = userModule + "/users/";
export const getUsersPath = (page: number, rowsPerPage?: number) => {
  return `${users}${page}/${rowsPerPage ?? ""}`;
};

export const roles = userModule + "/roles/";
export const getUserRolesPath = (page: number, rowsPerPage?: number) => {
  return `${roles}${page}/${rowsPerPage ?? ""}`;
};

// SUPPORT CENTER
export const supportCenter = adminRoot + "/support-center";

export const supportLogs = supportCenter + "/logs/";
export const getSupportLogsPath = (page: number, rowsPerPage?: number) => {
  return `${supportLogs}${page}/${rowsPerPage ?? ""}`;
};

export const supportRoadmap = supportCenter + "/roadmap";

// DOCS
export const icarusDocs = adminRoot + "/icarus-docs";

export const supportBug = adminRoot + "/request/:id";
export const getSupportBugPath = (id: string) => {
  return supportBug.replace(":id", id);
};
export const supportBugComments = supportBug + "/comments";
export const getSupportBugCommentsPath = (id: string) => {
  return supportBugComments.replace(":id", id);
};
export const supportBugAttachments = supportBug + "/attachments";
export const getSupportBugAttachmentsPath = (id: string) => {
  return supportBugAttachments.replace(":id", id);
};

// AUDIT CHECKLISTS
export const auditChecklistOverview = adminRoot + "/audit-checklists-pagination/";
export const getAuditChecklistOverviewPath = (page: number, rowsPerPage?: number) => {
  return `${auditChecklistOverview}${page}/${rowsPerPage ?? ""}`;
};

export const auditChecklist = adminRoot + "/audit-checklists/:id";

// SETTINGS
export const settingModule = adminRoot + "/settings";

export const clients = settingModule + "/clients/";
export const getClientsPath = (page: number, rowsPerPage?: number) => {
  return `${clients}${page}/${rowsPerPage ?? ""}`;
};

export const versionsMobile = settingModule + "/version-mobile/";
export const getVersionMobilePath = (page: number, rowsPerPage?: number) => {
  return `${versionsMobile}${page}/${rowsPerPage ?? ""}`;
};
