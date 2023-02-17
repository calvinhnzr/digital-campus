require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const calculateDayExpiration = () => {
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  return Math.ceil((endOfDay.getTime() - Date.now()) / 1000);
};

const generateToken = (room) => {
  const expiresIn = calculateDayExpiration();
  const token = jwt.sign({ room }, JWT_SECRET, { expiresIn });
  return token;
};

const checkToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getTokenRoom = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded.room;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = { generateToken, checkToken, getTokenRoom };
