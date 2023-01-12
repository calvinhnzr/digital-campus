// redis
const redisPubSub = require("./redisPubSub");

// express
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// example: http://localhost:8001/display/campus/gummersbach/rooms/3216
// room display endpoint
app.get("/display/campus/:campus/rooms/:room", async (req, res) => {
  const campusParam = req.params.campus;
  const roomParam = req.params.room;

  // get room information
  // -------------------------
  const roomResponse = await fetch("http://data_service:8000/api/campus");
  const roomData = await roomResponse.json();

  let roomInfo;
  const rCampus = roomData.find((campus) => campus.name.toLowerCase() === campusParam.toLowerCase());
  rCampus.buildings.forEach((building) => {
    building.floors.forEach((floor) => {
      floor.rooms.forEach((room) => {
        if (room.number.toLowerCase() === roomParam.toLowerCase()) {
          roomInfo = room;
        }
      });
    });
  });

  if (!roomInfo) {
    return res.status(404).send("Room not found");
  }
  // -------------------------

  // get timetable information
  // -------------------------
  const timetableResponse = await fetch("http://data_service:8000/api/timetables");
  const timetableData = await timetableResponse.json();

  const tCampus = timetableData.find((campus) => campus.campus.toLowerCase() === campusParam.toLowerCase());
  const timetable = tCampus.rooms.find((room) => room.roomNo.toLowerCase() === roomParam.toLowerCase());

  if (!timetable) {
    return res.status(404).send("Timetable not found");
  }
  // -------------------------

  return res.render("pages/index", { timetable, roomInfo });
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

redisPubSub.startRedis();
