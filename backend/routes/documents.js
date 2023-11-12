const express= require('express')
const router= express.Router()
const {uploadPatientDocument, getPatientDocuments, deleteDocument, uploadDoctorDocument, getDoctorDocuments} = require('../controllers/documentController')
const upload = require('../middleware/upload')



//Upload health document as a patient
router.post('/patient/upload', upload.single('document'),uploadPatientDocument)

//Upload medical document as a doctor
router.post('/doctor/upload', upload.single('document'),uploadDoctorDocument)

//Get health documents of a patient
router.get('/patient/:id', getPatientDocuments)

//Get medical documents of a doctor
router.get('/doctor/:id', getDoctorDocuments)

//Delete a document
router.delete('/:id', deleteDocument)


module.exports= router