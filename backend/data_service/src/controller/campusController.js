const { returnAllCampus } = require('../db');


const getCampus = async (req, res) => {
  const campuses = await returnAllCampus();
  res.send(campuses);
}

module.exports = { getCampus };