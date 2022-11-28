const jwt = require("jsonwebtoken");
const key = require("../config/config")
const config = key.jwt;

// const verifyToken = (req, res, next) => {
//   try {
//     const token = req.cookies.myToken;
//     // req.headers["x-access-token"];

//     if (!token) {
//       return res.status(403).send("A token is required for authentication");
//     }
//     jwt.verify(token, config);

//     // const decoded = jwt.verify(token, config);
//     // req.user = decoded;
//     // next();
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();
// };

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  // let token = req.cookies['x-access-token'];

  // console.log(`token `, token);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken