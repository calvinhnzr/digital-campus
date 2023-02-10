const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  const token = jwt.sign({}, JWT_SECRET);
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
