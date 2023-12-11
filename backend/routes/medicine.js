const express= require('express')
const router= express.Router()
const {createMedicine,getAllMedicine,getMedicine,deleteMedicine,updateMedicine} = require('../controllers/medicineController')



const requireAuthPharmacist = require('../middleware/requireAuthPharmacist')
const requireAuthAdmin= require('../middleware/requireAuthAdmin')
const requireAuthPatient = require('../middleware/requireAuthPatient')



//require Auth for all medicine routes


 
 const multer = require('multer');

// Create a storage engine for Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
 //Create a new medicine
 router.post('/',upload.single('image'),createMedicine)


 //Get all medicines
 router.get('/',getAllMedicine)

 //Get a single medicine
 router.get('/:id',getMedicine)

 //Delete an medicine
 router.delete('/:id',deleteMedicine)

 //Update an medicine
  router.patch('/:id',updateMedicine)

module.exports= router