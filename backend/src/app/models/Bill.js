const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

// Định nghĩa schema cho hóa đơn
const bill = new Schema({
    patient_id: {type: String, required: true},
    date: {type: Date, required: true},
    total_amount: {type: Number},
    payment_status: {type: Number}, // enum: ["Chưa thanh toán", "Đã thanh toán"],
    note: {type: String},
    item: [
        {
            service: {type: String}, amount: {type: Number},
        },
        {
            medicine: {type: String}, amount: {type: Number},
        }
    ]
}, {
    timestamps: true
});

// Tạo models cho hoá đơn
module.exports = mongoose.model('Bills', bill);