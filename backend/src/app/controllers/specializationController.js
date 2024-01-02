const {
    getAllSpecializations,
    addNewSpecialization,
    deleteSpecialization,
    updateSpecialization
} = require("../services/specializationService");
const specializationController = {
    getAllSpecialization: async (req, res) => {
        try {
            let page = req.query.page;
            let q = req.query.q ?? "";
            let specializations = await getAllSpecializations(page, q);
            res.status(specializations.statusCode).send({
                statusCode: specializations.statusCode,
                message: specializations.message,
                data: specializations.data
            });
        } catch (error) {
            res.status(500).send({
                statusCode: 500,
                message: error.message,
                data: null
            });
        }
    },
    addNewSpecialization: async (req, res) => {
        try {
            let specialization = await addNewSpecialization(req);
            res.status(specialization.statusCode).send({
                statusCode: specialization.statusCode,
                message: specialization.message,
                data: specialization.data
            });
        } catch (error) {
            res.status(500).send({
                statusCode: 500,
                message: error.message,
                data: null
            });
        }
    },
    updateSpecialization: async (req, res) => {
        try {
            let specialization = await updateSpecialization(req);
            res.status(specialization.statusCode).send({
                statusCode: specialization.statusCode,
                message: specialization.message,
                data: specialization.data
            });
        } catch (error) {
            res.status(500).send({
                statusCode: 500,
                message: error.message,
                data: null
            });
        }
    },
    deleteSpecialization: async (req, res) => {
        try {
            let specialization = await deleteSpecialization(req);
            res.status(specialization.statusCode).send({
                statusCode: specialization.statusCode,
                message: specialization.message,
                data: specialization.data
            });
        } catch (error) {
            res.status(500).send({
                statusCode: 500,
                message: error.message,
                data: null
            });
        }
    }
}
module.exports = specializationController;