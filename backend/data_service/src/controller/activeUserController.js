const { returnAllActiveUsers } = require("../db");

const getActiveUsers = async (req, res) => {
  const activeUsers = await returnAllActiveUsers();
  res.send(activeUsers);
};

module.exports = { getActiveUsers };
