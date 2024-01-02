const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

// Định nghĩa schema cho lịch hẹn
const appointment = new Schema({
    patient_id: {type: String, required: true},
    doctor_id: {type: String, required: true},
    date: {type: Date, required: true},
    status: {type: String},
    note: {type: String},
}, {
    timestamps: true
});

// Tạo models cho lịch hẹn
module.exports = mongoose.model('appointments', appointment);
