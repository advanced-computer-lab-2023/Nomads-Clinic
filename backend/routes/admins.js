const express= require('express')
const router= express.Router()
const {createAdmin,getAdmins,getAdmin,deleteAdmin,updateAdmin,signupAdmin,loginAdmin} = require('../controllers/adminController')



 //Create a new admin
 router.post('/',createAdmin)

 //Get all admins
 router.get('/',getAdmins)

 //Get a single admin
 router.get('/:id',getAdmin)

 //Sign up as an admin
 router.post('/signup',signupAdmin)

 //Log in as an admin
 router.post('/login',loginAdmin)

 //Delete an admin
 router.delete('/:id',deleteAdmin)

 //Update an admin
  router.patch('/:id',updateAdmin)

module.exports= router