const { returnAllRooms, returnFilteredRooms } = require('../db');


const getRooms = async (req, res) => {
  let rooms;

  if(Object.keys(req.query).length > 0){
    rooms = await returnFilteredRooms(req.query);
  }else{
    rooms = await returnAllRooms();
  }
  
  res.send(rooms);
}

const getRoomById = async (req, res) => {
  const rooms = await returnFilteredRooms(req.params);
  res.send(rooms);
}

module.exports = { getRooms, getRoomById };