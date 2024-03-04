export const root = "/";
export const fourZeroFour = "/404";
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

export const softwareLogSubscriptions = supportCenter + "/subscriptions/";
export const getSoftwareLogSubscriptionsPath = (page: number, rowsPerPage?: number) => {
  return `${softwareLogSubscriptions}${page}/${rowsPerPage ?? ""}`;
};

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

// LOGGER
export const loggerModule = adminRoot + "/logger";

export const iOSClients = loggerModule + "/ios/";
export const getIOSClientsPath = (page: number, rowsPerPage?: number) => {
  return `${iOSClients}${page}/${rowsPerPage ?? ""}`;
};

export const androidClients = loggerModule + "/android/";
export const getAndroidClientsPath = (page: number, rowsPerPage?: number) => {
  return `${androidClients}${page}/${rowsPerPage ?? ""}`;
};

export const webClients = loggerModule + "/web/";
export const getWebClientsPath = (page: number, rowsPerPage?: number) => {
  return `${webClients}${page}/${rowsPerPage ?? ""}`;
};

export const mobileLogs = loggerModule + "/mobile-logs/:platform/:clientAbbreviation/";
export const getMobileLogsPath = (platform: string, clientAbbreviation: string) => {
  return mobileLogs.replace(":platform", platform).replace(":clientAbbreviation", clientAbbreviation);
};
export const getMobileLogsPaginationPath = (platform: string, clientAbbreviation: string, page: number, rowsPerPage?: number) => {
  return `${getMobileLogsPath(platform, clientAbbreviation)}${page}/${rowsPerPage ?? ""}`;
};
