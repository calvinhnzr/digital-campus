require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

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
  return await Campus.find({});
}

async function returnCampusByName(name) {
  return await Campus.find({ name: name });
}

async function returnAllRooms(name) {
  const campus = await Campus.findOne({ name: name });
  if (!campus) return false;

  const rooms = [];
  campus.buildings.forEach((building) => {
    building.floors.forEach((floor) => {
      floor.rooms.forEach((room) => {
        rooms.push({
          ...room._doc,
          building: building.name,
          level: floor.level,
        });
      });
    });
  });

  const assets = await Asset.find({});

  // for each room replace the asset id with the asset object, containing the id, name, description and type
  rooms.forEach((room) => {
    room.assets = room.assets.map((assetId) => {
      const newAsset = { ...assets.find((asset) => asset._id == assetId)._doc, id: assetId };
      delete newAsset._id;
      return newAsset;
    });
  });

  return rooms;
}

async function returnRoomsByQuery(roomsParam, campusName, query) {
  const { day, time, building, level, type, status, assets } = query;

  let rooms = roomsParam.filter((room) => room.type === "lab" || room.type === "lecture" || room.type === "project");

  // building filter
  if (building) {
    rooms = rooms.filter((room) => room.building === building);
  }

  // floor filter
  if (level) {
    rooms = rooms.filter((room) => room.level === level);
  }

  // type filter
  if (type) {
    rooms = rooms.filter((room) => room.type === type);
  }

  // assets filter
  if (assets) {
    rooms = rooms.filter((room) => {
      return assets.every((asset) => room.assets.find((roomAsset) => roomAsset.id === asset));
    });
  }

  // status filter
  if (status && day && time) {
    // fetch timetables from db
    const timetablesFetch = await Timetable.findOne({ campus: campusName });
    const timetables = timetablesFetch && timetablesFetch.rooms;

    // filter rooms by timetable
    rooms = rooms.filter((room) => {
      const tableForRoom = timetables.find((timetable) => timetable.roomNo === room.number);
      const tableForDay = tableForRoom && tableForRoom.timetable[day];
      if (!tableForDay) {
        return true;
      }
      return !(
        tableForDay &&
        tableForRoom &&
        tableForDay.find((slot) => slot.time && slot.time.slice(0, 2) === time.slice(0, 2))
      );
    });

    // filter rooms by current status
    for (const room of rooms) {
      const currentStatus = await fetchCurrentStatus(room.number);
      // if room is occupied by more than 1 person
      if (currentStatus.count) {
        // remove room from list
        rooms = rooms.filter((r) => r.number !== room.number);
      }
    }
  }

  return rooms;
}

const fetchCurrentStatus = async (number) => {
  const response = await fetch(`${process.env.AUTH_SERVICE_URL}/api/count?room=${number}`);
  const data = await response.json();
  return data;
};

async function connect() {
  await mongoose.connect(uri);
  console.log("connected to MongoDB");
}

async function returnAllAssets() {
  return await Asset.find({});
}

async function returnAllTimetables() {
  return await Timetable.find({});
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
