const redisPubSub = require('./redisPubSub')

const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const { fetchData } = require("./helpers/fetchData");

app.get("/display/campus/:campus/rooms/:room", (req, res) => {
  const campusParam = req.params.campus;
  const roomParam = req.params.room;

  console.log(campusParam);
  console.log(roomParam);

  // fetch room information data from data_service for room
  fetchData("http://data_service:8000/api/campus").then((data) => {
    const campus = data.find((campus) => campus.name === "Gummersbach");
    let roomInfo;
    campus.buildings.forEach((building) => {
      building.rooms.forEach((room) => {
        if (room.roomNo === roomParam) {
          roomInfo = room;
        }
      });
    });
  });

  console.log(roomInfo);

  // return res.render("pages/index", { timetable: data3216 });
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

redisPubSub.startRedis()