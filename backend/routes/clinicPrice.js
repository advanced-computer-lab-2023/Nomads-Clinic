const express= require('express')
const router= express.Router()
const {getClinicPrice,createClinicPrice,updateClinicPrice} = require('../controllers/clinicPriceController')


//Create Clinic Price
router.post('/',createClinicPrice)

//Get Clinic Price
router.get('/',getClinicPrice)

 //Update a health package
 router.patch('/',updateClinicPrice)

 module.exports= router