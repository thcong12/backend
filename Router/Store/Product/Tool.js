import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../../../model/Product/Product.js";
import ProductDetail from "../../../model/Product/ProductDetail.js";
import Slider from "../../../model/Store/Slide.js";

const toolRouter = express.Router();

toolRouter.get(
  "/getProductSale",
  asyncHandler(async (req, res) => {
    const today = new Date();
    const produtSale = await Product.find({}).exec();
    const result = produtSale.filter((product) => product.sale.salePersent > 0);
    if (result) {
      const checkExprieDay = result.filter(
        (product) =>
          new Date(product.sale.startDay).getTime() < today.getTime() &&
          new Date(product.sale.endDay).getTime() >= today.getTime()
      );
      res.json(checkExprieDay);
    } else {
      res.statusCode(404);
    }
  })
);
toolRouter.get(
  "/getProductSlide",
  asyncHandler(async (req, res) => {
    const slider = await Slider.find({});
    res.json(slider);
  })
);
toolRouter.get(
  "/search/:name",
  asyncHandler(async (req, res) => {
    const productName = req.params.name;
    const result = await Product.find({
      productName: { $regex: productName, $options: "$i" },
    });
    if (result) {
      res.json(result);
    } else {
      res.send("not found");
    }
  })
);
toolRouter.get(
  "/sameproduct/:cate",
  asyncHandler(async (req, res) => {
    const listCate = req.params.cate.split("+");
    const searchCate = await ProductDetail.find({
      categlory: {$all: listCate},
    });
    res.json(searchCate);
  })
);


export default toolRouter;
