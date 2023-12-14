const mongoose = require('mongoose')

const Schema = mongoose.Schema

const documentSchema = new Schema({
    doctorId: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema)