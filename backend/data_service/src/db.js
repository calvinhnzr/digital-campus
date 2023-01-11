const mongoose = require("mongoose");
const path = require("path");

// require('dotenv').config({ path:__dirname + '../../../../.env'})
require("dotenv").config();

const uri = `mongodb+srv://webclub:${process.env.MONGO_PW}@cluster0.uipp4bn.mongodb.net/digitalCampusDB?retryWrites=true&w=majority`;

// OLD:
// const roomSchema = new mongoose.Schema({
//   _id: String,
//   name: String, //fehlt hiervor "roomNo" als key?
//   type: String,
//   description: String,
//   seats: Number,
//   location: Array,
//   availability: {
//     scheduleStatus: Boolean,
//     loginCount: Number,
//   },
//   assets: [{ assetId: String, count: Number }],
// });
// const Room = mongoose.model("rooms", roomSchema);

const assetSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
});

const Asset = mongoose.model("assets", assetSchema);

const timetableSchema = new mongoose.Schema({
  campus: String,
  campusId: String,
  rooms: [
    {
      roomNo: String,
      timetable: {
        monday: [
          {
            name: String,
            type: { type: String },
            time: String,
          },
        ],
        tuesday: [
          {
            name: String,
            type: { type: String },
            time: String,
          },
        ],
        wednesday: [
          {
            name: String,
            type: { type: String },
            time: String,
          },
        ],
        thursday: [
          {
            name: String,
            type: { type: String },
            time: String,
          },
        ],
        friday: [
          {
            name: String,
            type: { type: String },
            time: String,
          },
        ],
      },
    },
  ],
});

const Timetable = mongoose.model("timetable", timetableSchema);

const campusSchema = new mongoose.Schema({
  _id: String,
  name: String,
  buildings: [
    {
      buildingId: String,
      name: String,
      coords: {
        x: Number,
        y: Number,
        width: Number,
        depth: Number,
        direction: String,
      },
      floors: [
        {
          floorId: String,
          name: String,
          level: Number,
          coords: {
            x: Number,
            y: Number,
            width: Number,
            depth: Number,
            direction: String,
          },
          rooms: [
            {
              roomId: String,
              number: String,
              name: String,
              type: { type: String },
              description: String,
              assets: [
                {
                  assetId: String,
                  count: Number,
                },
              ],
              coords: {
                x: Number,
                y: Number,
                width: Number,
                depth: Number,
                direction: String,
              },
            },
          ],
          halls: [
            {
              hallId: String,
              number: String,
              coords: {
                x: Number,
                y: Number,
                width: Number,
                depth: Number,
                direction: String,
              },
            },
          ],
          stairs: [
            {
              stairId: String,
              number: String,
              name: String,
              coords: {
                x: Number,
                y: Number,
                width: Number,
                depth: Number,
                direction: String,
              },
            },
          ],
          lifts: [
            {
              liftId: String,
              name: String,
              maxWeight: Number,
              maxPeople: Number,
              coords: {
                x: Number,
                y: Number,
                width: Number,
                depth: Number,
                direction: String,
              },
            },
          ],
          outdoors: [
            {
              outdoorId: String,
              number: String,
              name: String,
              coords: {
                x: Number,
                y: Number,
                width: Number,
                depth: Number,
                direction: String,
              },
            },
          ],
        },
      ],
    },
  ],
});

const Campus = mongoose.model("campus", campusSchema);

const activeUsersSchema = new mongoose.Schema({
  campus: String,
  rooms: [
    {
      roomNo: String,
      activeUsers: [],
    },
  ],
});

const ActiveUsers = mongoose.model("activeUsers", activeUsersSchema);

async function returnAllActiveUsers() {
  const users = await ActiveUsers.find({});
  console.log(users);
  return users;
}

async function returnAllCampus() {
  const campuses = await Campus.find({});
  console.log(campuses);
  return campuses;
}

async function connect() {
  await mongoose.connect(uri);
  console.log("connected to MongoDB");
}

// OLD:
// async function returnAllRooms() {
//   const rooms = await Room.find({});
//   console.log(rooms);
//   return rooms;
// }

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

async function returnAllTimetables() {
  const timetable = await Timetable.find({});
  console.log(timetable);
  return timetable;
}

connect().catch((err) => console.log(err));

module.exports = {
  connect,
  // OLD:
  // returnAllRooms,
  returnFilteredRooms,
  returnAllAssets,
  returnAllTimetables,
  returnAllCampus,
  returnAllActiveUsers,
};
