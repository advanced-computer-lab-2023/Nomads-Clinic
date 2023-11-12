require('dotenv').config()
 
const Document = require('../models/documentModel')
const mongoose= require('mongoose')
const fs = require('fs')


//Upload a new Medical History Document for a patient
const uploadPatientDocument= async (req,res) => {
    const isPatient = true
    const userId = req.patient._id
    const document = req.file.filename

    if(!userId){
        return res.status(400).json({error: 'Patient Id is required'})
    }

    if(!document){
        return res.status(400).json({error: 'No file was uploaded'})
    }

    const newDocument= new Document({
        isPatient,
        userId,
        document
    })

    try{
        await newDocument.save()
        res.status(201).json(newDocument)
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
}

//Get documents of a patient
const getPatientDocuments= async (req,res) => {
    const userId = req.patient._id

    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json({error: 'No such patient'})
    }

    if(!userId){
        return res.status(400).json({error: 'Patient Id is required'})
    }

    try{
        const documents= await Document.find({userId, isPatient: true}).sort({createdAt: -1 })
        res.status(200).json(documents)
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
}

//Delete a document
const deleteDocument = async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such document'})
    }

    const document= await Document.findOneAndDelete({_id: id})

    if(!document){
        return res.status(404).json({error: 'No such document'})
    }

    const fileName = document.document;
    const directoryPath = __basedir + "/uploads/";

    try{
        fs.unlinkSync(directoryPath + fileName) // delete file from path
        res.status(200).json(document)
    }
    catch(error){
        res.status(404).json({error: 'No such document'})
    }
    
}

//Upload a required document for a doctor such as ID, Medical licenses and medical degree 
const uploadDoctorDocument= async (req,res) => {
    const isPatient = false
    const userId = req.body.doctorId
    const document = req.file.filename

    if(!userId){
        return res.status(400).json({error: 'Doctor Id is required'})
    }

    if(!document){
        return res.status(400).json({error: 'No file was uploaded'})
    }

    const newDocument= new Document({
        isPatient,
        userId,
        document
    })

    try{
        await newDocument.save()
        res.status(201).json(newDocument)
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
}

//Get documents of a doctor
const getDoctorDocuments= async (req,res) => {
    const userId = req.doctor._id

    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json({error: 'No such doctor'})
    }

    if(!userId){
        return res.status(400).json({error: 'Doctor Id is required'})
    }

    try{
        const documents= await Document.find({userId, isPatient: false}).sort({createdAt: -1 })
        res.status(200).json(documents)
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
}

module.exports = {uploadPatientDocument, getPatientDocuments, deleteDocument, uploadDoctorDocument, getDoctorDocuments};