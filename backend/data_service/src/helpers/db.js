const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

require("dotenv").config();

const uri = `mongodb+srv://webclub:${process.env.MONGO_PW}@cluster0.uipp4bn.mongodb.net/digitalCampusDB?retryWrites=true&w=majority`;

const assetSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  type: { type: String },
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
              type: { type: String },
              number: String,
              name: String,
              assets: [String],
              seats: {
                count: Number,
                fixed: Boolean,
              },
              link: String,
              members: [
                {
                  name: String,
                  link: String,
                  email: String,
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

async function returnAllCampus() {
  const campuses = await Campus.find({});
  console.log(campuses);
  return campuses;
}

async function returnCampusByName(name) {
  const campus = await Campus.find({ name: name });
  console.log(campus);
  return campus;
}

// for a specific campus
async function returnAllRooms(name) {
  const campus = await Campus.find({ name: name });
  const rooms = [];
  for (let i = 0; i < campus[0].buildings.length; i++) {
    for (let j = 0; j < campus[0].buildings[i].floors.length; j++) {
      for (let k = 0; k < campus[0].buildings[i].floors[j].rooms.length; k++) {
        rooms.push(campus[0].buildings[i].floors[j].rooms[k]);
      }
    }
  }
  return rooms;
}

async function returnRoomsByQuery(name, query) {
  const day = query.day;
  const time = query.time;
  const building = query.building;
  const level = query.level;
  const type = query.type;
  const status = query.status;
  const assets = query.assets;

  // const campus = await Campus.find({ buildings: { $elemMatch: { name: query.building } } });
  // fetch campus data from db
  const campus = await Campus.findOne({
    $and: [{ buildings: { $elemMatch: { name: query.building } } }, { name: name }],
  });
  if (!campus) return false;

  // fetch timetables from db
  const timetablesFetch = await Timetable.findOne({ campus: name });
  const timetables = timetablesFetch && timetablesFetch.rooms;

  //filter building
  const buildingFiltered = campus.buildings.find((element) => element.name === building);
  const floors = buildingFiltered.floors;

  // filter level
  const rooms = level
    ? floors.find((element) => element.level === Number(level)).rooms
    : [...floors.flatMap((element) => element.rooms)];

  // filter type
  const typeFiltered = type ? rooms.filter((element) => element.type === type) : rooms;

  // filter assets
  const assetsFiltered = assets
    ? typeFiltered.filter((room) => {
        return assets.every((asset) => room.assets.includes(asset));
      })
    : typeFiltered;

  // filter timetables
  const timetablesFiltered = assetsFiltered.filter((room) => {
    const tableForRoom = timetables.find((timetable) => timetable.roomNo === room.number);
    const tableForDay = tableForRoom && tableForRoom.timetable[day];

    // fetch count from auth service and decide if room is free or not

    return !(tableForDay && tableForDay.find((slot) => slot.time.slice(0, 2) === time.slice(0, 2)));
  });

  return timetablesFiltered;
}

async function connect() {
  await mongoose.connect(uri);
  console.log("connected to MongoDB");
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

module.exports = {
  connect,
  returnAllAssets,
  returnAllTimetables,
  returnAllCampus,
  returnAllRooms,
  returnRoomsByQuery,
  returnCampusByName,
};
