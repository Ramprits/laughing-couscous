const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  let checkBearer = "Bearer ";

  if (token) {
    if (token.startsWith(checkBearer)) {
      token = token.slice(checkBearer.length, token.length);
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(500).send({
          status: false,
          message: "unable to authenticate",
        });
      } else {
        req.decoded = decoded;
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(400).send({ message: "unable to authenticate" });
  }
};
