const { returnAllRooms } = require('../db')


const getAllRooms = async (req, res) => {
  rooms = await returnAllRooms()
  res.send(rooms)
}

module.exports = { getAllRooms }