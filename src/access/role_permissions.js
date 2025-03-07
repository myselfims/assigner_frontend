const ROLE_PERMISSIONS = {
    owner: [
      "view:dashboard",
      "edit:workspace", "delete:workspace", "view:workspace",
      "create:projects", "edit:projects", "delete:projects", "view:projects",
      "view:connect",
      "create:teamMembers", "edit:teamMembers", "delete:teamMembers", "view:teamMembers",
      "create:subscription", "edit:subscription", "delete:subscription", "view:subscription",
      "view:activityLogs",
      "view:overview",
      "create:sprints", "edit:sprints", "delete:sprints", "view:sprints",
      "view:settings",
      "send:message",
      "create:actionItems", "edit:actionItems", "delete:actionItems", "view:actionItems",
      "create:comments", "edit:comments", "delete:comments", "view:comments",
    ],
    admin: [
      "view:dashboard",
      "create:projects", "edit:projects", "delete:projects", "view:projects",
      "create:teamMembers", "edit:teamMembers", "delete:teamMembers", "view:teamMembers",
      "view:activityLogs",
      "view:overview",
      "create:sprints", "edit:sprints", "delete:sprints", "view:sprints",
      "create:actionItems", "edit:actionItems", "delete:actionItems", "view:actionItems",
      "view:connect", "send:message",
      "view:settings",
      "create:comments", "edit:comments", "delete:comments", "view:comments",
    ],
    manager: [
        "view:dashboard",
        "create:projects", "edit:projects", "view:projects",
        "create:sprints", "edit:sprints", "view:sprints",
        "create:actionItems", "edit:actionItems", "view:actionItems",
        "view:connect","send:message",
        "view:settings",
        "create:comments", "edit:comments", "delete:comments", "view:comments",
    ],
    contributor: [
      "view:dashboard",
      "view:projects",
      "view:sprints", 
      "create:actionItems", "edit:actionItems", "view:actionItems",
      "view:connect","send:message",
      "create:comments", "edit:comments", "delete:comments", "view:comments",
    ],
    viewer: [
      "view:dashboard",
      "view:projects",
      "view:sprints",
      "view:teamMembers",
      "view:overview",
      "view:connect",
      "view:settings",
      "view:actionItems",
      "view:comments",
    ],
};


export const hasPermission = (role, action) => {
  console.log(role)
    return ROLE_PERMISSIONS[role]?.includes(action);
};
