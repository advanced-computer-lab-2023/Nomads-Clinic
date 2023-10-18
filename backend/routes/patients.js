const express= require('express')
const { getPatients, getPatient, deletePatient, updatePatient, signupPatient,loginPatient } = require('../controllers/patientController')
const router= express.Router()

//Get all patients
router.get('/', getPatients)

 //Get a single patient
 router.get('/:id', getPatient)

 //Sign up as a patient
 router.post('/signup',signupPatient)

 //Log in as a patient
  router.post('/login',loginPatient)

 //Delete a patient
 router.delete('/:id',deletePatient)

 //Update a patient
  router.patch('/:id',updatePatient)

module.exports= router