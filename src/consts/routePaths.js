export const root = "/";
export const fourZeroFour = "/404";
export const signIn = "/signin";
export const confirmationCode = "/confirmation-code";
export const adminRoot = "/admin";
export const dashboard = adminRoot + "/dashboard";

export const submenu1 = adminRoot + "/submenu1";
export const submenu2 = adminRoot + "/submenu2";

export const userModule = adminRoot + "/user-module";
export const users = userModule + "/users/:page?/:rowsPerPage?";
export const getUsersPath = (page, rowsPerPage) => {
    return users.replace(":page?", page).replace(":rowsPerPage?", rowsPerPage);
}

export const user = adminRoot + "/user/details/:id";
export const getUserDetailsPath = (id) => {
    return user.replace(":id", id);
}

export const userGroups = userModule + "/user-groups/:page?/:rowsPerPage?";
export const getUserGroupsPath = (page, rowsPerPage) => {
    return userGroups.replace(":page?", page).replace(":rowsPerPage?", rowsPerPage);
}

export const roles = userModule + "/roles/:page?/:rowsPerPage?";
export const getUserRolesPath = (page, rowsPerPage) => {
    return roles.replace(":page?", page).replace(":rowsPerPage?", rowsPerPage);
}

export const supportCenter = adminRoot + "/support-center";
export const supportBugs = supportCenter + "/bugs/:page?/:rowsPerPage?";
export const getSupportBugsPath = (page, rowsPerPage) => {
    return supportBugs.replace(":page?", page).replace(":rowsPerPage?", rowsPerPage);
}
export const supportBug = adminRoot + "/request/:id";
export const getSupportBugPath = (id) => {
    return supportBug.replace(":id", id);
}
export const supportBugComments = supportBug + "/comments";
export const getSupportBugCommentsPath = (id) => {
    return supportBugComments.replace(":id", id);
}
export const supportBugAttachments = supportBug + "/attachments";
export const getSupportBugAttachmentsPath = (id) => {
    return supportBugAttachments.replace(":id", id);
}
export const supportLogs = supportCenter + "/logs";