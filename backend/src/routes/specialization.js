const express = require('express');
const specializationController = require("../app/controllers/specializationController");
const router = express.Router();

router.get("/", specializationController.getAllSpecialization)
router.post("/", specializationController.addNewSpecialization)
router.put("/:id", specializationController.updateSpecialization)
router.delete("/", specializationController.deleteSpecialization)

module.exports = router;