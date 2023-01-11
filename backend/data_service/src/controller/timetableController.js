const { returnAllTimetables } = require("../db");

const getTimetables = async (req, res) => {
  const timetables = await returnAllTimetables();
  res.send(timetables);
};

module.exports = { getTimetables };
