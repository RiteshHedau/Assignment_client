import io from "socket.io-client";
import { url } from "../ApiCalls";

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Set();
    this.connect();
  }

  connect() {
    if (this.socket?.connected) return;

    //console.log("Connecting to socket server...");
    this.socket = io(url, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      autoConnect: true,
      withCredentials: true,
    });

    this.socket.on("connect", () => {
    //  console.log("Socket connected with ID:", this.socket.id);
      this.notifyListeners("connected");
    });

    this.socket.on("disconnect", (reason) => {
    //  console.log("Socket disconnected:", reason);
      this.notifyListeners("disconnected");
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  }

  onNewCourse(callback) {
    if (!this.socket) this.connect();

    this.socket.on("newCourse", (data) => {
    //  console.log("Received course notification:", data);
      callback(data);
    });
  }

  addListener(listener) {
    this.listeners.add(listener);
  }

  removeListener(listener) {
    this.listeners.delete(listener);
  }

  notifyListeners(status) {
    this.listeners.forEach((listener) => listener(status));
  }

  getSocket() {
    if (!this.socket || !this.socket.connected) {
      this.connect();
    }
    return this.socket;
  }
}

const socketService = new SocketService();
export default socketService;
