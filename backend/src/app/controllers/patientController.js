const Patient = require('../models/Patient');
const {MESSAGE_SUCCESS, MESSAGE_REQUIRED} = require("../../utils/messageList");
const patientController = {
    getAllPatients: async (req, res) => {
        try {
            const patients = await Patient.find({});
            res.status(200).send({
                statusCode: 200,
                message: MESSAGE_SUCCESS,
                data: patients
            })
        } catch (error) {
            console.log(error);
        }
    },
    addNewPatient: async (req, res) => {
        try {
            let messageError = [];
            if (!req.body.name) {
                messageError.push(String.format(MESSAGE_REQUIRED, "Name"))
            }
            if (messageError.length > 0) {
                throw {
                    statusCode: 400,
                    message: messageError,
                    data: null
                }
            }
            const patient = new Patient(req.body);
            await patient.save();
            res.status(201).send({
                statusCode: 200,
                message: MESSAGE_SUCCESS,
                data: patient
            })
        } catch (error) {
            res.send({
                statusCode: error.status,
                message: error.message,
                data: null
            })
        }
    }

}
module.exports = patientController;