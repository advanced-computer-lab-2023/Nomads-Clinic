const express= require('express')
const router= express.Router()
const {createFamilyMember,getFamilyMembers,getFamilyMember,deleteFamilyMember,updateFamilyMember} = require('../controllers/familyMemberController')
const requireAuthPatient = require('../middleware/requireAuthPatient')


//require Auth for all family members routes
router.use(requireAuthPatient)

 //Create a new family member
 router.post('/',createFamilyMember)

 //Get all family members
 router.get('/',getFamilyMembers)

 //Get a single family member
 router.get('/:id',getFamilyMember)

 //Delete a family member
 router.delete('/:id',deleteFamilyMember)

 //Update a family member
  router.patch('/:id',updateFamilyMember)

module.exports= router