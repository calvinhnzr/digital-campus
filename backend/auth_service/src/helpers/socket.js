require("dotenv").config();

const { createServer } = require("http");
const { Server } = require("socket.io");

const initSocketIO = (app) => {
  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3000"],
    },
  });

  startSocketIO(io);

  return { io, httpServer };
};

const startSocketIO = (io) => {
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
  });
};

module.exports = { initSocketIO, startSocketIO };
