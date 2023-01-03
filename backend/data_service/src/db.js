const mongoose = require("mongoose");
const path = require('path');

require('dotenv').config({ path:__dirname + '../../../../.env'})

const uri = `mongodb+srv://webclub:${process.env.MONGO_PW}@cluster0.uipp4bn.mongodb.net/digitalCampusDB?retryWrites=true&w=majority`;

const roomSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  type: String,
  description: String,
  seats: Number,
  location: Array,
  availability: {
    scheduleStatus: Boolean,
    loginCount: Number,
  },
  assets: [{ id: Number, count: Number }],
});

async function connect() {
  await mongoose.connect(uri);
  console.log("connected to MongoDB");
}

async function returnAllRooms() {
  const Room = mongoose.model("rooms", roomSchema);

  const rooms = await Room.find({});
  console.log(rooms)
  return rooms
}

connect().catch((err) => console.log(err));

module.exports = { connect, returnAllRooms }