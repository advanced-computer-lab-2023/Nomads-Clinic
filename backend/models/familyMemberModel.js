const mongoose = require('mongoose')

const Schema = mongoose.Schema

const familyMemberSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nationalId:{
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    relationToThePatient: {
        type: String,
        required: true,
        enum: ["Wife", "Husband", "Child"]
    },
    patientId: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('FamilyMember', familyMemberSchema)
