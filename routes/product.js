var express = require("express");
var router = express.Router();
const upload = require("../middleware/upload-photo");
const Product = require("../models/product");

/* GET all products  */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("category", "type");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* GET single product  */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate(
      "category",
      "type"
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* GET update product  */
router.put("/:id", upload.single("photo"), async (req, res) => {
  try {
    const photo = req.file?.location || "";
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { ...req.body, photo },
      },
      { upsert: true }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* POST product  */
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const photo = req.file?.location || "";
    const product = new Product({ ...req.body, photo });
    await product.save();
    res.status(201).json({ status: true, message: "created successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
