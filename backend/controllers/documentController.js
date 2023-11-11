require('dotenv').config()
 
const Document = require('../models/documentModel')
const mongoose= require('mongoose')


//Upload a new Document
const uploadDocument= async (req,res) => {
    const patientId = req.body.patientId
    const document = req.file.path

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

module.exports = { uploadDocument };