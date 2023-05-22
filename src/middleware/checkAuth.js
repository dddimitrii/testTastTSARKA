const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || "";

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.verifiedUser = verified.user;
    next();
  } catch (err) {
    next();
  }
};

module.exports = { authenticate };
