const {Schema} = require('mongoose');
const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
// Định nghĩa schema cho specialization
const specialization = new Schema({
    name: {type: String, required: true},
    slug: {type: String, slug: "name", unique: true},
}, {
    timestamps: true
})
// Tạo models cho specialization
module.exports = mongoose.model('specializations', specialization);