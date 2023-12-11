const express = require('express')
const router = express.Router()
const { getApprovalPharmacists, getPharmacists, getPharmacist, deletePharmacist, updatePharmacist,updatePharmacistPassword, signupPharmacist, loginPharmacist } = require('../controllers/pharmacistController')


//Get pharmacists that are still not approved
router.get('/notapproved', getApprovalPharmacists)

//Get all that are approved pharmacists
router.get('/approved', getPharmacists)

//Get a single pharmacist
router.get('/:id', getPharmacist)

//Sign up as a pharmacist
router.post('/signup', signupPharmacist)

//Log in as a pharmacist
router.post('/login', loginPharmacist)

//Delete a pharmacist
router.delete('/:id', deletePharmacist)

//Update a pharmacist
router.patch('/:id', updatePharmacist)

router.patch('/changepassword/:id', updatePharmacistPassword)


module.exports = router