const express = require('express')
const router = express.Router()
const { getApprovalDoctors, getDoctors, getDoctor, deleteDoctor, updateDoctor, signupDoctor, loginDoctor } = require('../controllers/doctorController')


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

module.exports = router