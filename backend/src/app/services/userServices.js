require('dotenv').config();
const {MESSAGE_REQUIRED, MESSAGE_SUCCESS} = require("../../utils/messageList");
const User = require("../models/User");
const bcrypt = require("bcrypt");
String.format = function () {
    let s = arguments[0];
    for (let i = 0; i < arguments.length - 1; i++) {
        const reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};
const addUser = async (req) => {
    let messageError = [];
    if (!req.body.phone_number) {
        messageError.push(String.format(MESSAGE_REQUIRED, "Phone number"))
    }
    if (!req.body.password) {
        messageError.push(String.format(MESSAGE_REQUIRED, "Password"))
    }
    if (!req.body.name) {
        messageError.push(String.format(MESSAGE_REQUIRED, "Name"))
    }
    if (!req.body.email) {
        messageError.push(String.format(MESSAGE_REQUIRED, "Email"))
    }
    let checkEmail = await User.findOne({email: req.body.email})
    if (req.body.email && checkEmail) {
        messageError.push("Email already exists")
    }
    let checkPhoneNumber = await User.findOne({phone_number: req.body.phone_number})
    if (req.body.phone_number && checkPhoneNumber) {
        messageError.push("Phone number already exists")
    }
    if (messageError.length > 0) {
        return {
            statusCode: 400,
            message: messageError,
            data: null
        }
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    req.body.avatar = req.file.filename;
    const user = new User(req.body)
    await user.save()
    let {password, ...userWithoutPassword} = user.toObject();
    return {
        statusCode: 201,
        message: MESSAGE_SUCCESS,
        data: userWithoutPassword
    }
}
const updateUser = async (req) => {
    let messageError = [];
    let checkPhoneNumber;
    let checkEmail;
    if (!req.body.name) {
        messageError.push(String.format(MESSAGE_REQUIRED, "Name"))
    }
    if (req.body.email) {
        checkEmail = await User.find({email: req.body.email});
    }
    if (checkEmail) {
        messageError.push("Email already exists")
    }
    if (req.body.phone_number) {
        checkPhoneNumber = await User.findOne({phone_number: req.body.phone_number});
    }

    if (checkPhoneNumber) {
        messageError.push("Phone number already exists")
    }
    if (messageError.length > 0) {
        return {
            statusCode: 400,
            message: messageError,
            data: null
        }
    }
    let user = await User.findById(req.params.id)
    if (!user) {
        return {
            statusCode: 404,
            message: "User not found",
            data: null
        }
    }
    if (req.file) {
        req.body.avatar = req.file.filename;
    }
    await User.findByIdAndUpdate(req.params.id, req.body)
    let {password, ...userWithoutPassword} = user.toObject();
    return {
        statusCode: 200,
        message: MESSAGE_SUCCESS,
        data: userWithoutPassword
    }

}
const deleteUser = async (req) => {
    let id = req.body.id;
    let count = 0;
    for (let i = 0; i < id.length; i++) {
        if (!id[i].match(/^[0-9a-fA-F]{24}$/)) {
            return {
                statusCode: 400,
                message: "user id is not valid",
                data: null
            }
        }
        let user = await User.findById(id[i])
        if (user) {
            count++;
        }
    }


    if (count < id.length) {
        return {
            statusCode: 404,
            message: "User is not exist",
            data: null
        }
    }
    await User.deleteMany({_id: req.body.id})
    return {
        statusCode: 200,
        message: MESSAGE_SUCCESS,
        data: null
    }
}
const getAllUser = async (page = 1, q = "test") => {
    let pageSize = parseInt(process.env.PAGE_SIZE) ?? 9;
    let skip = (page - 1) * pageSize;
    if (page < 1) {
        page = 1;
    }
    let count = await User.countDocuments({
        $or: [
            {name: {$regex: q, $options: "i"}},
            {email: {$regex: q, $options: "i"}},
            {phone_number: {$regex: q, $options: "i"}},
            {specialization: {$regex: q, $options: "i"}},
        ],
    });
    let users = await User.find({
        $or: [
            {name: {$regex: q, $options: "i"}},
            {email: {$regex: q, $options: "i"}},
            {phone_number: {$regex: q, $options: "i"}},
            {specialization: {$regex: q, $options: "i"}},
        ],
    })
        .limit(pageSize)
        .skip(skip)
    let usersWithoutPassword = users.map(user => {
        let {password, ...userWithoutPassword} = user.toObject();
        return userWithoutPassword;
    })
    return {
        statusCode: 200,
        message: MESSAGE_SUCCESS,
        data: {
            users: usersWithoutPassword,
            currentPage: page,
            totalPage: Math.ceil(count / pageSize),
        }
    }
}
const getUserById = async (req) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return {
            statusCode: 400,
            message: "user id is not valid",
            data: null
        }
    }
    let user = await User.findById(id)
    if (!user) {
        return {
            statusCode: 404,
            message: "User is not exist",
            data: null
        }
    }
    let {password, ...userWithoutPassword} = user.toObject();
    return {
        statusCode: 200,
        message: MESSAGE_SUCCESS,
        data: userWithoutPassword
    }

}
module.exports = {addUser, getAllUser, updateUser, deleteUser, getUserById}