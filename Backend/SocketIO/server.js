import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4001",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = {};

export const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID ${socket.id}. Total online: ${Object.keys(users).length}`);
    io.emit("getOnlineUsers", Object.keys(users));
  } else {
    console.log("User connected without a userId in query.", socket.id);
  }

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    const disconnectedUserId = Object.keys(users).find(key => users[key] === socket.id);
    if (disconnectedUserId) {
      delete users[disconnectedUserId];
      io.emit("getOnlineUsers", Object.keys(users));
      console.log(`User ${disconnectedUserId} disconnected. Remaining online: ${Object.keys(users).length}`);
    }
  });
});

export { app, io, server };