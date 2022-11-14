import express from "express";
import adminCategloryRouter from "./Product/Categlory.js";
import adminDeveloperRouter from "./Product/Developer.js";
import adminFeatureRouter from "./Product/Feature.js";
import adminProductRouter from "./Product/Product.js";
import adminAccountRouter from './Admin/Account.js';
import adminRouter from './Admin/Auth.js';


const dashboardRouter = express.Router();
dashboardRouter.use("/auth",adminRouter)
dashboardRouter.use("/account",adminAccountRouter)

dashboardRouter.use("/categlory",adminCategloryRouter)
dashboardRouter.use("/developer",adminDeveloperRouter)
dashboardRouter.use("/feature",adminFeatureRouter)
dashboardRouter.use("/product",adminProductRouter)

export default dashboardRouter;