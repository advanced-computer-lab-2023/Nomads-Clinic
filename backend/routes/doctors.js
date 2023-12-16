const express = require('express')
const router = express.Router()
const { getApprovalDoctors, getDoctors, getDoctor, deleteDoctor, updateDoctor,updateDoctorPassword, signupDoctor, loginDoctor, uploadDocument, getDocuments, deleteDocument } = require('../controllers/doctorController')
const upload = require('../middleware/uploadDocument')
const requireAuthDoctor = require('../middleware/requireAuthDoctor')

//Get doctors that are still not approved
router.get('/notapproved', getApprovalDoctors)

//Get all that are approved doctors
router.get('/approved', getDoctors)

//Get a single doctor
router.get('/:id', getDoctor)

//Sign up as a doctor
router.post('/signup', signupDoctor)

//Log in as a doctor
router.post('/login', loginDoctor)

//Delete a doctor
router.delete('/:id', deleteDoctor)

//Update a doctor
router.patch('/:id', updateDoctor)

//Upload required document
router.post('/document', requireAuthDoctor, upload.single('document'), uploadDocument)

//Get a doctor's documents
router.get('/document/:id', getDocuments)

//Delete a doctor's document
router.delete('/document/:id', deleteDocument)

router.patch('/changepassword/:id', updateDoctorPassword)

module.exports = router