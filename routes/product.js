/** @format */

const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

//GET
router.get("/", ProductController.products_get_all);
router.get("/:product_id", ProductController.products_get_by_id);
router.get(
  "/:product_id/variants",
  ProductController.product_variants_get_by_id
);
router.get(
  "/:product_id/variants/:variant_id",
  ProductController.product_variants_id_get_by_id
);

//POST
router.post("/", ProductController.post_new_Product);
//DELETE
router.delete("/:product_id", ProductController.delete_product);
//UPDATE
router.patch("/:product_id", ProductController.update_Product);

module.exports = router;
