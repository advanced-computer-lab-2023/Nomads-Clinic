const mongoose = require('mongoose')

const Schema = mongoose.Schema

const prescriptionSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    medicineName:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    patientId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema)