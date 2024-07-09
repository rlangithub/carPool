const mongoose = require('mongoose');

const driveScema = new mongoose.Schema({
    id:{ type: 'ObjectId', auto: true },
    driver: {
        type: 'ObjectId', 
        ref: 'Drivers'
    },
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