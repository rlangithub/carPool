const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;
const driverScema = new Schema({
    id: { type: 'ObjectId', auto: true },
    name: String,
    phone: String,
    email: String,
    password: String
});
module.exports = model("Drivers", driverScema);
