/** @format */

const Product = require("../models/Product");

exports.products_get_all = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ message: err });
  }
};

exports.products_get_by_id = async (req, res) => {
  try {
    const product = await Product.findById(req.params.product_id);
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Not Found" });
  }
};

exports.product_variants_get_by_id = async (req, res) => {
  try {
    const product = await Product.findById(req.params.product_id);
    console.log(req.params.product_id);
    res.json(product.variants);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Not Found" });
  }
};
exports.product_variants_id_get_by_id = async (req, res) => {
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
};

exports.delete_product = async (req, res) => {
  try {
    const removedProduct = await Product.deleteOne({
      _id: req.params.product_id,
    });
    res.json(removedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Not Found" });
  }
};
exports.post_new_Product = async (req, res) => {
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
};
exports.update_Product = async (req, res) => {
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
};
