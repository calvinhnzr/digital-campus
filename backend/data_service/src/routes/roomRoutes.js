const express = require('express')
const router = express.Router()
const roomController = require('../controller/roomController')

router.get('/', roomController.getAllRooms)

module.exports =  router