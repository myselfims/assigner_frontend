import { io } from "socket.io-client";
// import { addNotification } from "./notificationSlice";
import { incrementUnreadCount } from "@/store/features/connectSlice";

const socketMiddleware = (store) => {
  let socket = null;

  return (next) => (action) => {
    if (action.type === "socket/connect") {
      if (socket) socket.disconnect(); // Close previous connection if exists

      socket = io("http://localhost:3000", {
        query: { userId: action.payload.userId },
      });

      // Listen for notifications
      socket.on("notification", (data) => {
        // store.dispatch(addNotification(data)); // Update Redux store
      });
      socket.on("user:online", (data) => {
        console.log(data)
        // store.dispatch(addNotification(data)); // Update Redux store
      });

      // Listen for chat messages
      socket.on("message", (data) => {
        console.log(data)
        // store.dispatch(addMessage(data)); // Add message to chat
        store.dispatch(incrementUnreadCount(data)); // Update unread count
      });

    } else if (action.type === "socket/disconnect") {
      if (socket) socket.disconnect();
      socket = null;
    }

    return next(action);
  };
};

export default socketMiddleware;
