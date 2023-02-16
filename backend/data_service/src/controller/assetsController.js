const { returnAllAssets } = require("../helpers/db");

const getAssets = async (req, res) => {
  const assets = await returnAllAssets();
  res.send(assets);
};

module.exports = { getAssets };
