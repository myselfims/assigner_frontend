import { configureStore } from "@reduxjs/toolkit";
import actionItemsSlice from "./features/actionItemsSlice";
import taskDetailsSlice from "./features/taskDetailsSlice";
import appGlobalSlice from "./features/appGlobalSlice";
import usersSlice from "./features/usersSlice";
import userDetailsSlice from "./features/userDetailsSlice";
import workspaceSlice from "./features/workspaceSlice";
import socketMiddleware from "@/socket/socketMiddleware";
import workspaceSocketMiddleware from "@/socket/workspaceSocketMiddleware";
import connectSlice  from "./features/connectSlice";
import activityLogsSlice from "./features/activityLogsSlice";

export const store = configureStore({
  reducer: {
    actionItems: actionItemsSlice,
    taskDetails: taskDetailsSlice,
    globalState: appGlobalSlice,
    users: usersSlice,
    currentUser: userDetailsSlice,
    workspaceState: workspaceSlice,
    connectState : connectSlice,
    activityLogsState : activityLogsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware,workspaceSocketMiddleware),
});
