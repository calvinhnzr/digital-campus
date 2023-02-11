const express = require("express");
const router = express.Router();
const campusController = require("../controller/campusController");

router.get("/", campusController.getCampus);
router.get("/:name", campusController.getCampusByName);
router.get("/:name/rooms", campusController.getAllRooms);

module.exports = router;
