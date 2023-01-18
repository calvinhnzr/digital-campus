// redis
const redisPubSub = require("./redisPubSub");

// express
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("auth_service");
});

// start express server
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// start redis
redisPubSub.startRedis();
