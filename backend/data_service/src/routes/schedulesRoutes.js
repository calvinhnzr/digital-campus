const express = require('express');
const router = express.Router();
const schedulesController = require('../controller/schedulesController');

router.get('/', schedulesController.getSchedules);


module.exports =  router;