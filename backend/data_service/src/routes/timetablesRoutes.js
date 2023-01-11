const express = require("express");
const router = express.Router();
const timetablesController = require("../controller/timetableController");

router.get("/", timetablesController.getTimetables);

module.exports = router;
