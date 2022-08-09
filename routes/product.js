/** @format */

const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ message: err });
  }
});
router.post("/", async (req, res) => {
  const newProduct = new Product({
    reference: req.body.reference,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    variants: req.body.variants,
  });
  try {
    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ message: err });
  }
});

router.get("/:product_id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.product_id);
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Not Found" });
  }
});

router.delete("/:product_id", async (req, res) => {
  try {
    const removedProduct = await Product.deleteOne({
      _id: req.params.product_id,
    });
    res.json(removedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Not Found" });
  }
});
router.get("/:product_id/variants", async (req, res) => {
  try {
    const product = await Product.findById(req.params.product_id);
    console.log(req.params.product_id);
    res.json(product.variants);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Not Found" });
  }
});
router.get("/:product_id/variants/:variant_id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.product_id);
    console.log(req.params.product_id);

    const variant = product.variants.find(v => v._id == req.params.variant_id);
    if (variant) {
      res.json(variant);
    } else {
      res.status(400).json({ message: "Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Not Found" });
  }
});

router.patch("/:product_id", async (req, res) => {
  try {
    const updatedProduct = await Product.updateOne(
      { _id: req.params.product_id },
      {
        $set: {
          reference: req.body.reference,
          name: req.body.name,
          description: req.body.description,
          image: req.body.image,
          variants: req.body.variants,
        },
      }
    );
    res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(err.status || 400).json({ message: "Not Found" });
  }
});

module.exports = router;
