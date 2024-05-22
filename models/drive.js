const mongoose = require('mongoose');
// const Driver = require('./driver');

const driveScema = new mongoose.Schema({
    driveID:String,
    driver: {
        type: [mongoose.Schema.Types.ObjectId], 
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