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

// DEDALUS
export const dedalusModule = adminRoot + "/dedalus";

export const reportHazardIdentification = dedalusModule + "/report-hazard-identification-pagination/";
export const getReportHazardIdentificationPath = (page: number, rowsPerPage?: number) => {
  return `${reportHazardIdentification}${page}/${rowsPerPage ?? ""}`;
};

export const reportHazardIdentificationDetails = dedalusModule + "/report-hazard-identification/:id";

export const reportHazardClassification = dedalusModule + "/report-hazard-classification/hazards";
export const getReportHazardClassificationPath = (page: number, rowsPerPage?: number) => {
  return `${reportHazardIdentification}${page}/${rowsPerPage ?? ""}`;
};

// REPORTS
export const reportsModule = adminRoot + "/reports";

export const reports = reportsModule + "/pagination/";

export const getReportPath = (page: number, rowsPerPage?: number) => {
  return `${reportsModule}${page}/${rowsPerPage ?? ""}`;
}

export const report = reportsModule + "/:id";

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

// FORUM
export const forumModule = adminRoot + "/forum";

export const forumUsers = forumModule + "/registrations/";
export const getForumRegistrationsPath = (page: number, rowsPerPage?: number) => {
  return `${forumUsers}${page}/${rowsPerPage ?? ""}`;
};

export const forumTopics = forumModule + "/topics/";
export const getForumTopicsPaginationPath = (page: number, rowsPerPage?: number) => {
  return `${forumTopics}${page}/${rowsPerPage ?? ""}`;
};

export const forumTopic = forumModule + "/topic/details/:forumTopicId";
export const getForumTopicFormPath = (id: string | null) => {
  if (id) {
    return forumTopic.replace(":forumTopicId", id);
  } else {
    return forumTopic.replace(":forumTopicId", "-1");
  }
};

export const forumTopicSubscribers = forumModule + "/topic/:forumTopicId/subscribers/";
export const getForumTopicSubscribersPaginationPath = (forumTopicId: string, page: number, rowsPerPage?: number) => {
  const pathWithTopicId = forumTopicSubscribers.replace(":forumTopicId", forumTopicId);
  return `${pathWithTopicId}${page}/${rowsPerPage ?? ""}`;
};

export const forumTopicComments = forumModule + "/topic/:forumTopicId/comments/";
export const getForumTopicCommentsPaginationPath = (forumTopicId: string, page: number, rowsPerPage?: number) => {
  const pathWithTopicId = forumTopicComments.replace(":forumTopicId", forumTopicId);
  return `${pathWithTopicId}${page}/${rowsPerPage ?? ""}`;
};

export const forumTopicLikes = forumModule + "/topic/:forumTopicId/likes/";
export const getForumTopicLikesPaginationPath = (forumTopicId: string, page: number, rowsPerPage?: number) => {
  const pathWithTopicId = forumTopicLikes.replace(":forumTopicId", forumTopicId);
  return `${pathWithTopicId}${page}/${rowsPerPage ?? ""}`;
};

export const forumCommentLikes = forumModule + "/topic/:forumTopicId/comment/:forumCommentId/likes/";
export const getForumCommentLikesPaginationPath = (forumTopicId: string, forumCommentId: string, page: number, rowsPerPage?: number) => {
  const pathWithTopicId = forumCommentLikes.replace(":forumTopicId", forumTopicId);
  const pathWithCommentId = pathWithTopicId.replace(":forumCommentId", forumCommentId);
  return `${pathWithCommentId}${page}/${rowsPerPage ?? ""}`;
};


export const forumTags = forumModule + "/tags/";


