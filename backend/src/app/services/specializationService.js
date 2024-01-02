const Specialization = require('../models/specialization');
const {MESSAGE_SUCCESS} = require("../../utils/messageList");
const User = require("../models/User");
const getAllSpecializations = async (page, q = "") => {
    let pageSize = parseInt(process.env.PAGE_SIZE) ?? 9;
    let skip = (page - 1) * pageSize;
    if (!page) {
        let specializations = await Specialization.find({})
        return {
            statusCode: 200,
            data: specializations,
            message: MESSAGE_SUCCESS
        }
    }
    let count = await Specialization.countDocuments({name: {$regex: q, $options: "i"}});
    let specializations = await Specialization.find({name: {$regex: q, $options: "i"}})
        .limit(pageSize)
        .skip(skip)
    return {
        statusCode: 200,
        data: {
            specializations: specializations,
            totalPage: Math.ceil(count / pageSize),
            currentPage: page
        },
        message: MESSAGE_SUCCESS
    }
}
const addNewSpecialization = async (req) => {
    let messageError = [];
    if (!req.body.name) {
        messageError.push("Name is required");
    }
    if (messageError.length > 0) {
        return {
            statusCode: 400,
            message: messageError,
            data: null
        }
    }
    let checkName = await Specialization.findOne({name: req.body.name});
    if (checkName) {
        return {
            statusCode: 400,
            message: "Name is exist",
            data: null
        }
    }
    let specialization = new Specialization(req.body);
    await specialization.save();
    return {
        statusCode: 201,
        message: MESSAGE_SUCCESS,
        data: specialization
    }
}
const updateSpecialization = async (req) => {
    let checkName;
    if (req.body.name) {
        checkName = await Specialization.findOne({name: req.body.name});
    }
    if (checkName) {
        return {
            statusCode: 400,
            message: "Name is exist",
            data: null
        }
    }
    let checkSpecialization = await Specialization.findById(req.params.id);
    if (!checkSpecialization) {
        return {
            statusCode: 404,
            message: "Specialization is not exist",
            data: null
        }
    }
    let specialization = await Specialization.findByIdAndUpdate(req.params.id, req.body);
    return {
        statusCode: 200,
        message: MESSAGE_SUCCESS,
        data: specialization
    }

}
const deleteSpecialization = async (req) => {
    let id = req.body.id;
    let count = 0;
    for (let i = 0; i < id.length; i++) {
        if (!id[i].match(/^[0-9a-fA-F]{24}$/)) {
            return {
                statusCode: 400,
                message: "Specialization id is not valid",
                data: null
            }
        }
        let user = await Specialization.findById(id[i])
        if (user) {
            count++;
        }
    }


    if (count < id.length) {
        return {
            statusCode: 404,
            message: "Specialization is not exist",
            data: null
        }
    }
    await Specialization.deleteMany({_id: req.body.id})
    return {
        statusCode: 200,
        message: MESSAGE_SUCCESS,
        data: null
    }

}
module.exports = {
    getAllSpecializations,
    addNewSpecialization,
    updateSpecialization,
    deleteSpecialization
}