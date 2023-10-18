const mongoose = require('mongoose')

const Schema = mongoose.Schema

const healthPackageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    doctorDiscount: {
        type: Number,
        required: true
    },
    medicineDiscount: {
        type: Number,
        required: true
    },
    familyMemberDiscount: {
        type: Number,
        required: true
    },
    patientId: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model('HealthPackage', healthPackageSchema)
