const { returnAllTimetables } = require("../helpers/db");

const getTimetables = async (req, res) => {
  const timetables = await returnAllTimetables();
  res.send(timetables);
};

module.exports = { getTimetables };
