const express = require("express");
const router = express.Router();
const campusController = require("../controller/campusController");

router.get("/", campusController.getCampus);
router.get("/:name", campusController.getCampusByName);
router.get("/:name/rooms", campusController.getAllRooms);
// router.get("/:name/rooms/:room", campusController.getRoomByNumber);
router.get("/:name/rooms/query", campusController.getRoomByQuery);

module.exports = router;
