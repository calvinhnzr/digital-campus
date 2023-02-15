require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const path = require("path");

const { getTokenRoom } = require("./token");

const uri = `mongodb+srv://webclub:${process.env.MONGO_PW}@cluster0.uipp4bn.mongodb.net/digitalCampusAuthDB?retryWrites=true&w=majority`;

const activeUserSchema = new mongoose.Schema(
  {
    room: String,
    token: String,
  },
  { versionKey: false }
);

const ActiveUsers = mongoose.model("activeusers", activeUserSchema);

const checkIfUserExists = async (token) => {
  const user = await ActiveUsers.find({ token });

  if (user.length) {
    return true;
  } else {
    return false;
  }
};

const getUserCount = async (room) => {
  const count = await ActiveUsers.countDocuments({ room });
  return count;
};

const addUser = async (token) => {
  const room = getTokenRoom(token);
  const user = new ActiveUsers({ room, token });
  return await user.save();
};

const removeUser = async (token) => {
  const room = getTokenRoom(token);
  return await ActiveUsers.deleteOne({ room, token });
};

const connect = async () => {
  await mongoose.connect(uri);
  console.log("connected to MongoDB");
};

module.exports = { connect, addUser, removeUser, checkIfUserExists, getUserCount };
