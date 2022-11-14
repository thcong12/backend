import mongoose from "mongoose";

const datasetRecommendSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Product",
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    rate: {
        type: Number,
        default: 0,
    },
    buy: {
        type: Number,
        default: 0,
    },
    click: {
        type: Number,
        default: 0,
    },
    //
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    featureId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    developerId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
});

module.exports = mongoose.model('datasetRecommends', datasetRecommendSchema);