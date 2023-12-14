const express= require('express')
const router= express.Router()
const {uploadHealthRecord, getHealthRecords, getDoctorHealthRecords, deleteHealthRecord} = require('../controllers/healthRecordController')
const upload = require('../middleware/uploadHealthRecord')
const requireAuthPatient = require('../middleware/requireAuthPatient')
const requireAuthDoctor = require('../middleware/requireAuthDoctor')

//require Auth for all appointment routes
router.use(requireAuthPatient)
router.use(requireAuthDoctor)

//Upload health document as a patient
router.post('/', upload.single('document'),uploadHealthRecord)

//Get health documents of a patient
router.get('/', getHealthRecords)

//Get medical documents of a doctor
router.get('/doctor', getDoctorHealthRecords)

//Delete a document
router.delete('/:id', deleteHealthRecord)


module.exports= router