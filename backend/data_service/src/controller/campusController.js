const { returnAllCampus, returnCampusByName, returnAllRooms, returnRoomsByQuery } = require("../db");

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
    time: req.query.time,
    building: req.query.building,
    level: req.query.level,
    type: req.query.type,
    status: req.query.status,
    assets: req.query.asset,
  };

  if (typeof query.assets === "string") {
    query.assets = [query.assets];
  }

  // OLD:
  // if (query.assets) {
  //   const assets = [];
  //   query.assets.forEach((asset) => {
  //     const a = asset.split(",");
  //     assets.push({ asset: a[0], count: a[1] }); //maybe try catch this later
  //   });
  //   query.assets = assets;
  // }

  if (query.day && query.time && query.building) {
    console.log("query has necessary fields");

    // unecessary? let client figure out why query is invalid / comes back with 0 results
    // const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    // if (days.includes(query.day)) {
    //   console.log("day is valid");
    // }

    const queryRequest = await returnRoomsByQuery(campusName, query);
    if (!queryRequest) return res.status(404).json({ message: "wrong query" });

    return res.json(queryRequest);
  }

  return res.status(400).json({ message: "required query parameters missing" });

  // console.log(`><><><><>${JSON.stringify(query)}<><><><><`);

  // res.send("getRoomByQuery");
};

module.exports = { getCampus, getCampusByName, getAllRooms, getRoomByQuery };
