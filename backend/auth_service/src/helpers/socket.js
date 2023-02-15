require("dotenv").config();

const { createServer } = require("http");
const { Server } = require("socket.io");
const socketioJwt = require("socketio-jwt");

const initSocketIO = (app) => {
  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: ["https://www.piesocket.com", "http://localhost:3000"],
    },
  });

  const roomNamespace = io.of("/room");
  roomNamespace.on("connection", (socket) => {
    console.log(`Client connected to room namespace: ${socket.id}`);
  });

  const authNamespace = io.of("/auth");
  authNamespace.use(
    socketioJwt.authorize({
      secret: process.env.JWT_SECRET,
      handshake: true,
    })
  );
  authNamespace.on("connection", (socket) => {
    console.log(`Client connected to auth namespace: ${socket.id}`);
  });

  return httpServer;
};

module.exports = { initSocketIO };
