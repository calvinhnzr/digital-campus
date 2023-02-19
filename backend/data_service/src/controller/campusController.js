const { returnAllCampus, returnCampusByName, returnAllRooms, returnRoomsByQuery } = require("../helpers/db");

const getCampus = async (req, res) => {
  const campuses = await returnAllCampus();
  res.send(campuses);
};

const getCampusByName = async (req, res) => {
  const campusName = req.params.name;
  const campuses = await returnCampusByName(campusName);
  res.send(campuses);
};

const getAllRooms = async (req, res) => {
  const { name: campusName } = req.params;
  if (!campusName) return res.status(400).json({ message: "no campus specified" });

  // get all rooms
  const rooms = await returnAllRooms(campusName);
  if (!rooms) return res.status(404).json({ message: "no rooms found" });

  // check if query is empty
  if (Object.keys(req.query).length === 0) return res.json(rooms);

  // get query parameters
  const query = {
    day: req.query.day && req.query.day,
    time: req.query.time && decodeURIComponent(req.query.time),
    building: req.query.building && decodeURIComponent(req.query.building),
    level: req.query.level && Number(req.query.level),
    type: req.query.type && req.query.type,
    status: req.query.status && req.query.status === "true",
    assets: typeof req.query.asset === "string" ? [req.query.asset] : req.query.asset,
  };

  const queryRooms = await returnRoomsByQuery(rooms, campusName, query);
  if (!queryRooms) {
    return res.status(404).json({ message: "something went wrong searching for the rooms specified by the query" });
  }

  return res.json(queryRooms);
};

module.exports = { getCampus, getCampusByName, getAllRooms };
