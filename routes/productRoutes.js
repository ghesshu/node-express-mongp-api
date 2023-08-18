const express = require("express");
const Product = require("../models/productModels");
const { verifyToken } = require("../middleware/auth");


const router = express.Router();

// Apply verifyToken middleware to all product routes
router.use(verifyToken);

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find product with ID ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find product with id of ${id}` });
    } else {
      return res.status(200).json({ message: "Product successfully deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
