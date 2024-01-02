const {Schema} = require('mongoose');
const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
// Định nghĩa schema cho user
const user = new Schema({
    name: {type: String, required: true},
    phone_number: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'staff'},
    avatar: {type: String},
    slug: {type: String, slug: "name", unique: true},
    specialization: {type: String},
    schedule: [{day: {type: String}, hour: {type: String}}],
}, {
    timestamps: true
})
module.exports = mongoose.model('users', user);