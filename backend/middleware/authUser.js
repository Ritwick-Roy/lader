const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Unauthorised access" });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
      // if(err) 
        // res.status(401).json({ msg: "Token expired" });
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
