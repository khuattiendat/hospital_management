const {Schema} = require('mongoose');
const mongoose = require("mongoose");
// Định nghĩa schema cho thuốc
const medicine = new Schema({
    name: {type: String, required: true},
    quality: {type: Number, required: true},
    price: {type: Number, required: true},
    expiry_date: {type: Date, required: true},
}, {
    timestamps: true
})
module.exports = mongoose.model('medicines', medicine);