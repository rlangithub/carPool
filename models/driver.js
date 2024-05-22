const mongoose = require("mongoose");

const driverScema = new mongoose.Schema({
    driverID:String,
    name: String,
    phone: String,
    email: String,
    password: String
},{ autoCreate: false, autoIndex: false });
module.exports = mongoose.model("Drivers", driverScema);
