const User = require("../models/User");
const {MESSAGE_SUCCESS, MESSAGE_REQUIRED} = require("../../utils/messageList");
const {addUser, getAllUser, updateUser, deleteUser, getUserById} = require("../services/userServices");

const userController = {
    addNewUser: async (req, res) => {
        try {
            let user = await addUser(req)
            res.status(user.statusCode).send({
                statusCode: user.statusCode,
                message: user.message,
                data: user.data
            })
        } catch (error) {
            res.status(500).send({
                statusCode: 500,
                message: error.message,
                data: null
            })
        }
    },
    updateUser: async (req, res) => {
        try {
            let user = await updateUser(req)
            res.status(user.statusCode).send({
                statusCode: user.statusCode,
                message: user.message,
                data: user.data
            })
        } catch (error) {
            res.status(500).send({
                statusCode: 500,
                message: error.message,
                data: null
            })
        }

    },
    deleteUser: async (req, res) => {
        try {
            let user = await deleteUser(req)
            res.status(user.statusCode).send({
                statusCode: user.statusCode,
                message: user.message,
                data: user.data
            })
        } catch (error) {
            res.status(500).send({
                statusCode: 500,
                message: error.message,
                data: null
            })
        }

    },
    getAllUser: async (req, res) => {
        try {
            let page = req.query.page || 1;
            let q = req.query.q || "";
            let users = await getAllUser(page, q)
            res.status(users.statusCode).send({
                statusCode: users.statusCode,
                message: users.message,
                data: users.data
            })
        } catch (error) {
            res.status(500).send({
                statusCode: 500,
                message: error.message,
                data: null
            })
        }

    },
    getUserById: async (req, res) => {
        try {
            let user = await getUserById(req);
            res.status(user.statusCode).send({
                statusCode: user.statusCode,
                message: user.message,
                data: user.data
            })
        } catch (error) {
            res.status(500).send({
                statusCode: 500,
                message: error.message,
                data: null
            })
        }
    }

}
module.exports = userController;