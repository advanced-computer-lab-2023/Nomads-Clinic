const express= require('express')
const router= express.Router()
const {createHealthPackage,getHealthPackages,getHealthPackage,deleteHealthPackage,updateHealthPackage} = require('../controllers/healthPackageController')



 //Create a new health package
 router.post('/',createHealthPackage)

 //Get all health packages
 router.get('/',getHealthPackages)

 //Get a single health package
 router.get('/:id',getHealthPackage)

 //Delete a health package
 router.delete('/:id',deleteHealthPackage)

 //Update a health package
  router.patch('/:id',updateHealthPackage)

module.exports= router