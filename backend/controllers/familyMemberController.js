require('dotenv').config()
 
const FamilyMember = require('../models/familyMemberModel')
const mongoose= require('mongoose')


//Create a new Family Member 
const createFamilyMember= async (req,res) => {
    const {firstName,lastName,nationalId,age,gender,relationToThePatient}= req.body

    let emptyFields = []

    if(!firstName){
        emptyFields.push('firstName')
    }
    if(!lastName){
        emptyFields.push('lastName')
    }
    if(!nationalId){
        emptyFields.push('nationalId')
    }
    if(!age){
        emptyFields.push('age')
    }
    if(!gender){
        emptyFields.push('gender')
    }
    if(!relationToThePatient){
        emptyFields.push('relationToThePatient')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }

    //add doc to db
    try{
        const patientId= req.patient._id
        const familyMember= await FamilyMember.create({firstName,lastName,nationalId,age,gender,relationToThePatient,patientId})
        res.status(200).json(familyMember)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}



//Get all packages
const getFamilyMembers= async (req,res) => {

    const patientId=req.patient._id
    const familyMembers = await FamilyMember.find({patientId}).sort({createdAt: -1 })

    res.status(200).json(familyMembers)
}

//Get a single family member
const getFamilyMember= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such family member'})
    }

    const familyMember= await FamilyMember.findById(id)

    if(!familyMember){
        return res.status(404).json({error: 'No such family memebr'})
    }
    
    res.status(200).json(familyMember)
}

//Delete a family member
const deleteFamilyMember = async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such familyMember'})
    }

    const familyMember= await FamilyMember.findOneAndDelete({_id: id})


    if(!familyMember){
        return res.status(404).json({error: 'No such family member'})
    }

    res.status(200).json(familyMember)
}

//Update a family Member
const updateFamilyMember= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such family memebr'})
    }

    const familyMember = await FamilyMember.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!familyMember){
        return res.status(404).json({error: 'No such family member'})
    }
    res.status(200).json(familyMember)

}
module.exports= {
    createFamilyMember,
    getFamilyMembers,
    getFamilyMember,
    deleteFamilyMember,
    updateFamilyMember,
}