const mongoose = require("mongoose");

const driverScema = new mongoose.Schema({
    name: String,
    phone: String,
    email: email,
    password: String
});
module.exports = mongoose.model("Drivers", driverScema);
