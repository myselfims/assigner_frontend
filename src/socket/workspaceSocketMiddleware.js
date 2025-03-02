import { io } from "socket.io-client";
import { addOnlineUser, incrementUnreadCount, removeOnlineUser } from "@/store/features/connectSlice";
import { addLog } from "@/store/features/activityLogsSlice";

const workspaceSocketMiddleware = (store) => {
  let socket = null;

  return (next) => (action) => {
    if (action.type === "workspace/socketConnect") {
      if (socket) socket.disconnect(); // Close previous connection if exists

      socket = io("http://localhost:3000", {
        query: { userId: action.payload.userId, workspaceId: action.payload.workspaceId },
      });
      // Listen for workspace-specific online users

      console.log('Join workspace')
      socket.on("user:online", (data) => {
        console.log(`User online in workspace ${data}:`, data);
        store.dispatch(addOnlineUser(data));
      });

      socket.on("user:offline", (data) => {
        console.log(`User offline in workspace ${data}:`, data);
        store.dispatch(removeOnlineUser(data));
      });

      socket.on("activityLog", (data) => {
        console.log(`User offline in workspace ${data}:`, data);
        store.dispatch(addLog(data))
      });

  
    } else if (action.type === "workspace/socketDisconnect") {
      if (socket) {
        console.log('Leaving workspace')
        socket.emit("leave:workspace", action.payload);
        socket.disconnect();
      }
      socket = null;
    }

    return next(action);
  };
};

export default workspaceSocketMiddleware;
