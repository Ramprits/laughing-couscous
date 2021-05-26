var express = require("express");
var router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verify-token");

/* POST  register user  */
router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User(req.body);
    await user.save();
    user.password = undefined;
    let token = generateToken(user);
    res.status(200).json({
      status: true,
      token,
      user,
      message: "Successfully created user",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/me", verifyToken, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user._id });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/login", async (req, res) => {
  try {
    let user = await await User.findOne({ email: req.body.email });
    let matchPassword = await user.comparePassword(req.body.password);
    if (!user || !matchPassword) {
      res
        .status(400)
        .json({ status: false, message: "email or password is incorrect" });
    }
    let token = generateToken(user);
    user.password = undefined;
    res.status(200).send({ token, user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

function generateToken(user) {
  let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
}
module.exports = router;
