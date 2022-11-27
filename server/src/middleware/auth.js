const jwt = require("jsonwebtoken");
const key = require("../config/config")
const config = key.jwt;

const verifyToken = (req, res, next) => {
  try {
    const token =
      req.body.token || req.cookies.myToken || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    // jwt.verify(token, config);

    const decoded = jwt.verify(token, config);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

// function checkToken(req, res, next) {
//   try {
//     const token = req.cookies.macOutletTOKEN;
//     if (!token) {
//       return res.status(403).send("A token is required for authentication");
//     }
//     jwt.verify(token, config);
//     next()
//   } catch (err) {
//     console.log(err);
//     return res.status(401).send("Invalid Token");
//   }
// }

module.exports =
  verifyToken
// checkToken
;