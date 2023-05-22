const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJwtToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = { createJwtToken };
