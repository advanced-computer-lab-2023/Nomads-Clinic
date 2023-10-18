require('dotenv').config()
 
const HealthPackage = require('../models/healthPackageModel')
 const mongoose= require('mongoose')


//Create a new health package
const createHealthPackage= async (req,res) => {
    const {name,price,doctorDiscount, medicineDiscount,familyMemberDiscount}= req.body

    let emptyFields = []

    if(!name){
        emptyFields.push('name')
        console.log(name)
    }
    if(!price){
        emptyFields.push('price')
        console.log(name)
    }
    if(!doctorDiscount){
        emptyFields.push('doctorDiscount')
        console.log(name)
    }
    if(!medicineDiscount){
        emptyFields.push('medicineDiscount')
       console.log(name)
    }
    if(!familyMemberDiscount){
        emptyFields.push('familyMemberDiscount')
        console.log(name)
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }

    //add doc to db
    try{
        const healthPackage= await HealthPackage.create({name,price,doctorDiscount,medicineDiscount,familyMemberDiscount})
        res.status(200).json(healthPackage)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}



//Get all packages
const getHealthPackages= async (req,res) => {
    const healthPackages = await HealthPackage.find({}).sort({createdAt: -1 })

    res.status(200).json(healthPackages)
}

//Get a single health package
const getHealthPackage= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such health package'})
    }

    const healthPackage= await HealthPackage.findById(id)

    if(!healthPackage){
        return res.status(404).json({error: 'No such health package'})
    }
    
    res.status(200).json(healthPackage)
}

//Delete a health package
const deleteHealthPackage = async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such health package'})
    }

    const healthPackage= await HealthPackage.findOneAndDelete({_id: id})


    if(!healthPackage){
        return res.status(404).json({error: 'No such healthPackage'})
    }

    res.status(200).json(healthPackage)
}

//Update a health package
const updateHealthPackage= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such health package'})
    }

    const healthPackage = await HealthPackage.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!healthPackage){
        return res.status(404).json({error: 'No such health package'})
    }
    res.status(200).json(healthPackage)

}
module.exports= {
    createHealthPackage,
    getHealthPackages,
    getHealthPackage,
    deleteHealthPackage,
    updateHealthPackage,
}