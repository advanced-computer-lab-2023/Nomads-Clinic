require('dotenv').config()
 
const ClinicPrice = require('../models/clinicPriceModel')
const mongoose= require('mongoose')



const createClinicPrice= async (req,res) => {
    const {price}= req.body

    //add doc to db
    try{
        const clinicPrice= await ClinicPrice.create({price})
        res.status(200).json(clinicPrice)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//Get all packages
const getClinicPrice= async (req,res) => {
    const clinicPrice = await ClinicPrice.find({}).sort({createdAt: -1 })

    res.status(200).json(clinicPrice)
}

//Update Clinic Price
const updateClinicPrice= async (req,res) => {
   

    const clinicPrice = await ClinicPrice.updateMany({}, {
        ...req.body
    })
    
    res.status(200).json(clinicPrice)

}


module.exports = {createClinicPrice,getClinicPrice,updateClinicPrice}


