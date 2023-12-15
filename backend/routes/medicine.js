const express= require('express')
const router= express.Router()
const {createMedicine,getAllMedicine,getMedicine,deleteMedicine,updateMedicine} = require('../controllers/medicineController')
const upload = require('../middleware/uploadMedicineImage')


const requireAuthPharmacist = require('../middleware/requireAuthPharmacist')
const requireAuthAdmin= require('../middleware/requireAuthAdmin')
const requireAuthPatient = require('../middleware/requireAuthPatient')



//require Auth for all medicine routes
router.use(requireAuthPharmacist)

 //Create a new medicine
 router.post('/',upload.single('image'),createMedicine)


 //Get all medicines
 router.get('/',getAllMedicine)

 //Get a single medicine
 router.get('/:id',getMedicine)

 //Delete an medicine
 router.delete('/:id',deleteMedicine)

 //Update a medicine
  router.patch('/:id', upload.single('image'),updateMedicine)

module.exports= router