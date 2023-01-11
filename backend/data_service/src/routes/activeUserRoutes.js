const express = require("express");
const router = express.Router();
const activeUserController = require("../controller/activeUserController");

router.get("/", activeUserController.getActiveUsers);

module.exports = router;
