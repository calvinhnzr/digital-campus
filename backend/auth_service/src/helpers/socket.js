require("dotenv").config();

const { createServer } = require("http");
const { Server } = require("socket.io");

const initSocketIO = (app) => {
  const httpServer = createServer(app);

  const frontendURL = process.env.FRONTEND_URL;

  const io = new Server(httpServer, {
    cors: {
      origin: frontendURL,
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
