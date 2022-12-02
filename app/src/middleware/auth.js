const jwt = require("jsonwebtoken");
const key = require("../config/config")
const config = key.jwt;

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.myToken;

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    const decoded = jwt.verify(token, config);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};


module.exports = verifyToken