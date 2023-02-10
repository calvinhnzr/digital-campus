const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const uri = `mongodb+srv://webclub:${process.env.MONGO_PW}@cluster0.uipp4bn.mongodb.net/digitalCampusAuthDB?retryWrites=true&w=majority`;

const activeUsersSchema = new mongoose.Schema(
  {
    room: String,
    users: [String],
  },
  { versionKey: false }
);

const ActiveUsers = mongoose.model("activeusers", activeUsersSchema);

const getActiveUsers = async (room) => {
  const users = await ActiveUsers.findOne({ room });
  if (users) {
    return users;
  } else {
    return { error: "room not found" };
  }
};

const addActiveUser = async (room, user) => {
  const users = await getActiveUsers(room);
  // check if room exists
  if (users) {
    // user not yet in list
    if (!users.users.includes(user)) {
      users.users.push(user);
      return await users.save();
    } else {
      // user already in list
      return { error: "user already in list" };
    }
    // room does not exist
  } else {
    const newUsers = new ActiveUsers({
      room: room,
      users: [user],
    });
    return await newUsers.save();
  }
};

const removeActiveUser = async (room, user) => {
  const users = await getActiveUsers(room);
  if (users) {
    // check if user in list
    if (users.users.includes(user)) {
      users.users = users.users.filter((u) => u !== user);

      // if no users left, delete room/collection
      if (users.users.length === 0) {
        return await ActiveUsers.deleteOne({ room });
      } else {
        return await users.save();
      }
    } else {
      return { error: "user not in list" };
    }
  } else {
    return { error: "room not found" };
  }
};

const connect = async () => {
  await mongoose.connect(uri);
  console.log("connected to MongoDB");
};

module.exports = { connect, getActiveUsers, addActiveUser, removeActiveUser };
