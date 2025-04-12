import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("Connected to socket server");
});

socket.on("newCourse", (data) => {
  // Handle the notification (e.g., show a toast message)
//  console.log("New course notification:", data);
});

export default socket;
