require('dotenv').config()
 
const HealthRecord = require('../models/healthRecordModel')
const mongoose= require('mongoose')
const fs = require('fs')


//Upload a new Medical History HealthRecord for a patient
const uploadHealthRecord= async (req,res) => {

    if(!req.file){
        return res.status(400).json({error: 'No file was uploaded'})
    }

    const document = req.file.filename

    if (req.patient) {
        // If a patient is logged in
        const patientId = req.patient._id;
        const newHealthRecord= new HealthRecord({
            patientId,
            document
        })

        try{
            await newHealthRecord.save()
            res.status(201).json(newHealthRecord)
        }catch(error){
            console.log(error)
            res.status(500).json({error: 'Internal server error'})
        }

    }

    else if (req.doctor) {
        // If a doctor is logged in
        const doctorId = req.doctor._id;
        const { patientId }= req.query;
        const newHealthRecord= new HealthRecord({
            patientId,
            doctorId,
            document
        })

        try{
            await newHealthRecord.save()
            res.status(201).json(newHealthRecord)
        }catch(error){
            console.log(error)
            res.status(500).json({error: 'Internal server error'})
        }

    }
}

//Get healthRecords 
const getHealthRecords= async (req,res) => {
    if(req.patient){
        const patientId = req.patient._id
        try{
            const healthRecords= await HealthRecord.find({patientId}).sort({createdAt: -1 })
            res.status(200).json(healthRecords)
        }catch(error){
            console.log(error)
            res.status(500).json({error: 'Internal server error'})
        }
    }
    else if(req.doctor){
        const doctortId = req.doctor._id

        const {patientId } = req.query
        try{
            const healthRecords= await HealthRecord.find({patientId, doctorId:doctortId}).sort({createdAt: -1 })
            res.status(200).json(healthRecords)
        }catch(error){
            console.log(error)
            res.status(500).json({error: 'Internal server error'})
        }
    }
    else{
        return res.status(401).json({error: 'You are not authorized'})
    }

}

//Get healthRecords of a doctor
const getDoctorHealthRecords= async (req,res) => {
    if(!req.doctor){
        return res.status(401).json({error: 'You are not authorized to access this route'})
    }

    const doctorId = req.doctor._id

    if(!mongoose.Types.ObjectId.isValid(doctorId)){
        return res.status(404).json({error: 'No such patient'})
    }

    try{
        const healthRecords= await HealthRecord.find({doctorId}).sort({createdAt: -1 })
        res.status(200).json(healthRecords)
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
}

//Delete a healthRecord
const deleteHealthRecord = async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such healthRecord'})
    }

    const healthRecord= await HealthRecord.findOneAndDelete({_id: id})

    if(!healthRecord){
        return res.status(404).json({error: 'No such healthRecord'})
    }

    const fileName = healthRecord.document;
    const directoryPath = __basedir + "/uploads/healthRecords/";

    try{
        fs.unlinkSync(directoryPath + fileName) // delete file from path
        res.status(200).json(healthRecord)
    }
    catch(error){
        res.status(404).json({error: 'Could not delete file'})
    }
    
}

module.exports = {uploadHealthRecord, getHealthRecords, getDoctorHealthRecords, deleteHealthRecord};