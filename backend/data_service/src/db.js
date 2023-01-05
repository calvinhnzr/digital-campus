const mongoose = require("mongoose");
const path = require('path');

// require('dotenv').config({ path:__dirname + '../../../../.env'})
require('dotenv').config()


const uri = `mongodb+srv://webclub:${process.env.MONGO_PW}@cluster0.uipp4bn.mongodb.net/digitalCampusDB?retryWrites=true&w=majority`;

const roomSchema = new mongoose.Schema({
  _id: Number,
  name: String, //fehlt hiervor "roomNo" als key?
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

const Room = mongoose.model("rooms", roomSchema);


const assetSchema = new mongoose.Schema({
  _id: Number,
  assetNo: Number,
  name: String,
  description: String
})

const Asset = mongoose.model("assets", assetSchema);


const scheduleSchema = new mongoose.Schema({
  _id: Number,
  roomNo: String,
  timeslots: Array
})

const Schedule = mongoose.model("schedules", scheduleSchema);

async function connect() {
  await mongoose.connect(uri);
  console.log("connected to MongoDB");
}

async function returnAllRooms() {
  const rooms = await Room.find({});
  console.log(rooms);
  return rooms;
}

// TODO:
// [BUG] funktioniert nicht da, die k/v pairs als [object Object] empfangen werden
// hier die k/v pairs = [object Object]
async function returnFilteredRooms(keyValuePairs) {
  console.log(`hier die k/v pairs = ${keyValuePairs}`);
  const rooms = await Room.find(keyValuePairs);
  console.log(`hier sind die gefilterten:>>> ${rooms} <<<`);
  return rooms;
}

async function returnAllAssets() {
  const assets = await Asset.find({});
  console.log(assets);
  return assets;
}

async function returnAllSchedules() {
  const schedules = await Schedule.find({});
  console.log(schedules);
  return schedules;
}

connect().catch((err) => console.log(err));

module.exports = { connect, returnAllRooms, returnFilteredRooms, returnAllAssets, returnAllSchedules };