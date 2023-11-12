const mongoose = require('mongoose')

const Schema = mongoose.Schema

const healthRecordSchema = new Schema({
    patientId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: false
    },
    document: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('HealthRecord', healthRecordSchema)