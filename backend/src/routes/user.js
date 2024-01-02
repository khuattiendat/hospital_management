const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/userController')
const {MiddleWareUploadFiles} = require("../app/middlewares/MiddlewareUploadFiles");
const {MiddlewareLogin} = require("../app/middlewares/MiddlewareLogin");
//
router.get('/', userController.getAllUser)
router.get('/:id', userController.getUserById)
router.post('/', MiddlewareLogin.verifyTokenAndAdmin, MiddleWareUploadFiles, userController.addNewUser)
router.put('/:id', MiddlewareLogin.verifyTokenAndAdmin, MiddleWareUploadFiles, userController.updateUser)
router.delete('/', userController.deleteUser)
//
module.exports = router;
