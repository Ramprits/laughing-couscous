var express = require("express");
var router = express.Router();
const Category = require("../models/category");

/* GET category  */
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* POST category  */
router.post("/", async (req, res) => {
  try {
    const category = new Category({ ...req.body });
    await category.save();
    res.status(201).json({ status: true, message: "created successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
