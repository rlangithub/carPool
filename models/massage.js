const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const massageScema = new Schema({
    massageID: { type: 'ObjectId', auto: true },
    value: String,
    email: String
});
module.exports = model("Massage", massageScema);