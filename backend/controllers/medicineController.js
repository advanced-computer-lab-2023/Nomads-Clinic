const Medicine= require('../models/medicineModel')
const mongoose= require('mongoose')
const fs = require('fs');



//Get all medicine
const getAllMedicine= async (req,res) => {
    const medicine = await Medicine.find({}).sort({createdAt: -1 })

    res.status(200).json(medicine)
}

//Get a single medicine
const getMedicine = async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such medicine'})
    }

    const medicine= await Medicine.findById(id)

    if(!medicine){
        return res.status(404).json({error: 'No such medicine'})
    }
    
    res.status(200).json(medicine)
}
//Create a new medicine
const createMedicine= async (req,res) => {
    const {name,use,description,ingredients,price,quantity}= req.body

    let emptyFields = []

    if(!name){
        emptyFields.push('name')
    }
    if(!use){
        emptyFields.push('use')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!ingredients){
        emptyFields.push('ingredients')
    }
    if(!price){
        emptyFields.push('price')
    }
    if(!quantity){
        emptyFields.push('quantity')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }

    const pharmacistId=req.pharmacist._id

    const image = req.file;

    //add doc to db
    try{
        const medicine= await Medicine.create({name,use,description,ingredients,price,quantity,pharmacistId})
        res.status(200).json(medicine)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//Delete a medicine
const deleteMedicine = async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such medicine'})
    }

    const medicine= await Medicine.findOneAndDelete({_id: id})


    if(!medicine){
        return res.status(404).json({error: 'No such medicine'})
    }

    res.status(200).json(medicine)
}

//Update a medicine
const updateMedicine= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such medicine'})
    }

    const medicine = await Medicine.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!medicine){
        return res.status(404).json({error: 'No such medicine'})
    }
    res.status(200).json(medicine)
}
module.exports= {
    getAllMedicine,
    getMedicine,
    deleteMedicine,
    updateMedicine,
    createMedicine,
}