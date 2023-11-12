const express= require('express')
const router= express.Router()
const {uploadPatientDocument, getPatientDocuments, deleteDocument, uploadDoctorDocument, getDoctorDocuments} = require('../controllers/documentController')
const upload = require('../middleware/upload')
const requireAuthPatient = require('../middleware/requireAuthPatient')
const requireAuthDoctor = require('../middleware/requireAuthDoctor')



//Upload health document as a patient
router.post('/patient/upload', requireAuthPatient, upload.single('document'),uploadPatientDocument)

//Upload medical document as a doctor
router.post('/doctor/upload', requireAuthDoctor, upload.single('document'),uploadDoctorDocument)

//Get health documents of a patient
router.get('/patient', requireAuthPatient, getPatientDocuments)

//Get medical documents of a doctor
router.get('/doctor', requireAuthDoctor, getDoctorDocuments)

//Delete a document
router.delete('/:id', deleteDocument)


module.exports= router