const express = require('express');
const router = express.Router();
const campusController = require('../controller/campusController');

router.get('/', campusController.getCampus);


module.exports =  router;