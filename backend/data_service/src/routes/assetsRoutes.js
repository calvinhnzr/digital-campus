const express = require("express");
const router = express.Router();
const assetsController = require("../controller/assetsController");

router.get("/", assetsController.getAssets);

module.exports = router;
