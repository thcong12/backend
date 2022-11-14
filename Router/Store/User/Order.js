import express from "express";
import asyncHandler from "express-async-handler";
import userAuth from "../../../middleware/UserAuth.js";
import Order from "../../../model/Store/Order.js";
import OrderDetail from "../../../model/Store/OrderDeatil.js";
import Cart from "../../../model/User/Cart.js";
import User from "../../../model/User/User.js";
const orderRouter = express.Router();

orderRouter.use(userAuth)
orderRouter.post(
    "/neworder",
    asyncHandler(async(req, res) => {
        const userId = req.user_id;
        const user = await User.findById(userId);
        const { totalPrice, disCountCode, paymentMethod, address,orderItem } =
        req.body;
        console.log(userId)
        if (orderItem.length <= 0) {
            res.status(400).send("Cart empty");
        }
        const newOrder = new Order({
            user: userId,
            totalPrice,
            disCountCode,
            paymentMethod,
            address,
        });
        const newOrderDetail = new OrderDetail({
            orderItem,
            orderId: newOrder._id,
        });
        await newOrder.save();
        await newOrderDetail.save();
        res.status(201).send( newOrder);
    })
);
orderRouter.put(
    "/pay/:cart/:order",
    asyncHandler(async(req, res) => {
        const today = Date.now();
        const orderId = req.params.order;
        const userCart = await Cart.findOne({userId:req.user_id});
        console.log(userCart)
        const order = await Order.findByIdAndUpdate(
            orderId, {
                $set: {
                    isPaid: true,
                    paidAt: today,
                },
            }, {
                new: true,
            }
        );
        if (order) {
            userCart.cartDetail = []
            await userCart.save();
            res.status(201).json(order);
        } else {
            res.status(404).send("Order not found")
        }
    })
);

export default orderRouter;