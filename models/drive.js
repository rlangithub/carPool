const mongoose = require("mongoose");
const driver = require("./driver");

const driveScema = new mongoose.Schema({
    driver:driver,
    leavingTime:Date,
    startingPoint: {
        city:String,
        street:String,
        numBuild:Number
    },
    target: {
        city:String,
        street:String,
        numBuild:Number
    },
    price: Number,
    availablePlaces: Number,
    passengers:[]
});
module.exports = mongoose.model("Drives", driveScema);