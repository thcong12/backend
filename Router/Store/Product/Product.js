import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../../../model/Product/Product.js";
import ProductDetail from "../../../model/Product/ProductDetail.js";
import userAuth from "../../../middleware/UserAuth.js";
const storeProductRouter = express.Router();

//get all products
storeProductRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products)
  })
);
//get single product
storeProductRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);
storeProductRouter.get(
  "/detail/:id",
  asyncHandler(async (req, res) => {
    const product = await ProductDetail.findOne({ productId: req.params.id });
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);

storeProductRouter.use(userAuth)
storeProductRouter.put(
  "/newcomment/:id",
  asyncHandler(async (req, res) => {
    const { title, rating, comment } = req.body;
    const productId = req.params.id;
    const product = await ProductDetail.findOne({ productId: productId });
    if (product) {
      product.reviews.push({
        title: title,
        rating: rating,
        comment: comment,
        user: req.user_id,
      });
      await product.save();
      res.json(product);
      console.log(req.user_id)
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);

export default storeProductRouter;
