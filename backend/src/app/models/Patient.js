const {Schema} = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoose = require("mongoose");
mongoose.plugin(slug);

// Định nghĩa schema cho Bệnh nhân
const patient = new Schema({
    name: {type: String, required: true},
    age: {type: Number},
    gender: {type: Number},// enum: ["Nữ", "Nam", "Khác"],
    contact_info: {
        phone: {type: String},
        address: {type: String},
    },
    slug: {type: String, slug: "name", unique: true},
    medical_history: [{date: {type: Date}, issue: {type: String}}]
}, {
    timestamps: true
});

// Tạo models cho Bệnh nhân
module.exports = mongoose.model('patients', patient);
