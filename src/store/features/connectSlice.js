import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unreadCounts: {},
  recentMessages: {},
  selectedUser: null,
  onlineUsers: {},
};

export const connectSlice = createSlice({
  name: "connectSlice",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setUnreadCounts: (state, action) => {
      state.unreadCounts = action.payload;
    },
    setRecentMessages: (state, action) => {
      state.recentMessages = action.payload;
    },
    incrementUnreadCount: (state, action) => {
      const { senderId } = action.payload;
      if (senderId != state.selectedUser?.id) {
        state.recentMessages[senderId] = action.payload || {};
        state.unreadCounts[senderId] = (state.unreadCounts[senderId] || 0) + 1;
      }
    },
    addOnlineUser: (state, action) => {
      const {userId} = action.payload;
      state.onlineUsers[userId] = action.payload || {};
    },
    removeOnlineUser: (state, action) => {
      const { userId } = action.payload;
      if (state.onlineUsers[userId]) {
        const { [userId]: _, ...newOnlineUsers } = state.onlineUsers; // Create a new object without the userId
        state.onlineUsers = newOnlineUsers;
      }
    },    
    resetUnreadCount: (state, action) => {
      const senderId = action.payload;
      state.unreadCounts[senderId] = 0;
    },
  },
});

export const {
  setUnreadCounts,
  setSelectedUser,
  setRecentMessages,
  incrementUnreadCount,
  resetUnreadCount,
  addOnlineUser,
  removeOnlineUser
} = connectSlice.actions;
export default connectSlice.reducer;
