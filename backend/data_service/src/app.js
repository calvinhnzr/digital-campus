require("dotenv").config();

const { connect } = require("./helpers/db");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// ROUTES IMPORT
const assetsRoutes = require("./routes/assetsRoutes.js");
const timetableRoutes = require("./routes/timetablesRoutes");
const campusRoutes = require("./routes/campusRoutes");

// ROUTES
app.get("/", (req, res) => {
  res.send("data_service!");
});

app.use("/api/assets", assetsRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/campus", campusRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

connect().catch((err) => console.log(err));
