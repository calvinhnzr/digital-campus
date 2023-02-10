// redis
const redisPubSub = require("./redisPubSub");

// db
const { connect, getActiveUsers, addActiveUser, removeActiveUser } = require("./db");

// express
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("auth_service");
});

app.get("/activeusers/rooms/:room", async (req, res) => {
  const room = req.params.room;

  const result = await getActiveUsers(room);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  return res.status(200).json(result);
});

app.post("/activeusers/rooms/:room/", async (req, res) => {
  const room = req.params.room;
  const user = req.body.user;

  const result = await addActiveUser(room, user);

  if (result.error) {
    res.status(400).json({ error: result.error });
  }
  res.status(201).json(result);
});

app.delete("/activeusers/rooms/:room/", async (req, res) => {
  const room = req.params.room;
  const user = req.body.user;

  const result = await removeActiveUser(room, user);

  if (result.error) {
    res.status(400).json({ error: result.error });
  }
  res.status(201).json({ message: "user removed" });
});

// start express server
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// start db
connect().catch((err) => console.log(err));

// start redis
redisPubSub.startRedis();
