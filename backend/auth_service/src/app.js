// jwt
const { generateToken, checkToken } = require("./helpers/token");

// redis
const redisPubSub = require("./helpers/redisPubSub");

// db
const { connect, addUser, removeUser, checkIfUserExists, getUserCount } = require("./helpers/db");

// express
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// pi initial setup
redisPubSub.onMessage("piStarted", (payload) => {
  newPiToken(payload.room);
});

const newPiToken = (room) => {
  const token = generateToken(room);
  redisPubSub.publishEvent("newToken", { token });
};

// index
app.get("/", (req, res) => {
  const token = generateToken("3216");
  return res.json({ token });
});

// auth check
app.get("/auth", async (req, res) => {
  const { token } = req.query;

  if (!token) return res.status(400).json({ message: "no token provided" });

  const result = checkToken(token);
  if (!result) return res.status(401).json({ message: "token invalid" });

  const exists = await checkIfUserExists(token);
  if (!exists) return res.status(200).json({ exists: false });

  return res.status(200).json({ exists: true });
});

// login
app.post("/auth", async (req, res) => {
  const { tokenOld, tokenNew } = req.body;

  if (!tokenNew) return res.status(400).json({ message: "no new token provided" });
  if (!tokenNew && tokenOld) return res.status(400).json({ message: "new token missing" });

  const resultNew = checkToken(tokenNew);
  if (!resultNew) return res.status(401).json({ message: "new token invalid" });

  const exists = await checkIfUserExists(tokenNew);
  if (exists) return res.status(409).json({ message: "new token already exists" });

  if (tokenOld) {
    const resultOld = checkToken(tokenOld);

    if (!resultOld) return res.status(401).json({ message: "old token invalid" });

    const exists = await checkIfUserExists(tokenOld);
    if (exists) await removeUser(tokenOld);
  }

  const user = await addUser(tokenNew);

  const { token, room } = user;

  newPiToken(room);

  return res.status(201).json({ room, token });
});

// logout
app.delete("/auth", async (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(400).json({ message: "no token provided" });

  const result = checkToken(token);

  if (!result) return res.status(401).json({ message: "token invalid" });

  const exists = await checkIfUserExists(token);
  if (!exists) return res.status(410).json({ message: "token not found" });

  await removeUser(token);

  return res.status(200).json({ message: "user logged out successfully" });
});

// count
app.get("/api/count", async (req, res) => {
  const { room } = req.query;

  if (!room) return res.status(400).json({ message: "no room provided" });

  const count = await getUserCount(room);

  return res.status(200).json({ count });
});

app.all("*", (req, res) => res.status(404).json({ message: "not found" }));

// start express server
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// start db
connect().catch((err) => console.log(err));

// start redis
redisPubSub.startRedis();
