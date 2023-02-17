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
  const campusName = req.params.name;
  const rooms = await returnAllRooms(campusName);
  res.send(rooms);
};

const getRoomByQuery = async (req, res) => {
  const campusName = req.params.name;
  // const rooms = returnRoomsByQuery(campusName);
  const query = {
    day: req.query.day,
    time: decodeURIComponent(req.query.time),
    building: decodeURIComponent(req.query.building),
    level: req.query.level && Number(req.query.level),
    type: req.query.type,
    status: req.query.status,
    assets: req.query.asset,
  };

  if (typeof query.assets === "string") {
    query.assets = [query.assets];
  }

  if (query.day && query.time && query.building) {
    console.log("query has necessary fields");

    const queryRequest = await returnRoomsByQuery(campusName, query);
    if (!queryRequest) return res.status(404).json({ message: "wrong query" });

    return res.json(queryRequest);
  }

  return res.status(400).json({ message: "required query parameters missing" });
};

module.exports = { getCampus, getCampusByName, getAllRooms, getRoomByQuery };
