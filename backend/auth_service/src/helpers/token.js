require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (room) => {
  const currentDate = new Date();
  const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);
  const expiresIn = (endOfDay.getTime() - currentDate.getTime()) / 1000;

  const token = jwt.sign({ room }, JWT_SECRET, { expiresIn: Math.ceil(expiresIn) });
  return token;
};

const checkToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return false;
  }
};

const getTokenRoom = (token) => {
  const decoded = checkToken(token);
  if (decoded) {
    return decoded.room;
  }
  return false;
};

module.exports = { generateToken, checkToken, getTokenRoom };
