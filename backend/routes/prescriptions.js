const express = require('express')
const router = express.Router()
const { createPrescription, getPrescriptions, getPrescription, deletePrescription, updatePrescription, getPrescriptionsByDate } = require('../controllers/prescriptionController')
const requireAuthPatient = require('../middleware/requireAuthPatient')
const requireAuthDoctor= require('../middleware/requireAuthDoctor')


//require Auth for all prescription routes
router.use(requireAuthPatient)
router.use(requireAuthDoctor)

//Create a new prescription
router.post('/', createPrescription)

//Get all prescriptions
router.get('/', getPrescriptions)


//Finda prescription by date
router.get('/bydate', getPrescriptionsByDate)

//Get a single prescription
router.get('/:id', getPrescription)

//Delete a prescription
router.delete('/:id', deletePrescription)

//Update a prescription
router.patch('/:id', updatePrescription)

module.exports = router