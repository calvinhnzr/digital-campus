const { connect } = require("./helpers/db");
const redisPubSub = require("./helpers/redisPubSub");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://my-app.com"],
  })
);

// ROUTES IMPORT
const assetsRoutes = require("./routes/assetsRoutes.js");
const timetableRoutes = require("./routes/timetablesRoutes");
const campusRoutes = require("./routes/campusRoutes");

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/assets", assetsRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/campus", campusRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

connect().catch((err) => console.log(err));
redisPubSub.startRedis();
