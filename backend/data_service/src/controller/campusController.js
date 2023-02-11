const { returnAllCampus, returnCampusByName, returnAllRooms } = require("../db");

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

module.exports = { getCampus, getCampusByName, getAllRooms };
