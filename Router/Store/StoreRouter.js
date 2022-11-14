import express from "express";
import storecCategloryRouter from "./Product/Categlory.js";
import storeDeveloperRouter from "./Product/Developer.js";
import storeFeatureRouter from "./Product/Feature.js";
import storeProductRouter from "./Product/Product.js";
import toolRouter from './Product/Tool.js';
import userRouter from './User/Auth.js';
import cartRouter from './User/Cart.js';
import orderRouter from './User/Order.js';

const storeRouter = express.Router()
storeRouter.use("/user",userRouter)
storeRouter.use("/products",storeProductRouter)
storeRouter.use("/categlorys",storecCategloryRouter)
storeRouter.use("/features",storeFeatureRouter)
storeRouter.use("/developers",storeDeveloperRouter)


storeRouter.use("/tool",toolRouter)
storeRouter.use("/cart",cartRouter)
storeRouter.use("/order",orderRouter)

export default storeRouter;
