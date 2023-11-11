require('dotenv').config()
 
const Document = require('../models/documentModel')
const mongoose= require('mongoose')
const fs = require('fs')


//Upload a new Document
const uploadDocument= async (req,res) => {
    const patientId = req.body.patientId
    const document = req.file.filename

    if(!patientId || !document){
        return res.status(400).json({error: 'All fields are required'})
    }

    const newDocument= new Document({
        patientId,
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
const getDocuments= async (req,res) => {
    const patientId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(patientId)){
        return res.status(404).json({error: 'No such patient'})
    }

    if(!patientId){
        return res.status(400).json({error: 'Patient Id is required'})
    }

    try{
        const documents= await Document.find({patientId}).sort({createdAt: -1 })
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

module.exports = { uploadDocument,  getDocuments, deleteDocument};