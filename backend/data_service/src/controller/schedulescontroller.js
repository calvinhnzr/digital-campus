const { returnAllSchedules } = require('../db');


const getSchedules = async (req, res) => {
  const schedules = await returnAllSchedules();
  res.send(schedules);
}

module.exports = { getSchedules };