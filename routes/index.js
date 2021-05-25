var express = require("express");
var router = express.Router();
const users = require("../public/users.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json(users);
});

module.exports = router;
