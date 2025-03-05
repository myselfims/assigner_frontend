import io from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // Temporary

class SocketService {
  socket = null;

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);
      console.log("Socket connected");
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log("Socket disconnected");
      this.socket = null;
    }
  }
}

const socketService = new SocketService();
export default socketService;
