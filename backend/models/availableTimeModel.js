const mongoose = require('mongoose')

const Schema = mongoose.Schema

const availableTimeSchema = new Schema({
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
    time: {
        type: Number,
        required: true
    },
    booked: {
        type: Boolean,
        default: false
    },
    doctorId: {
        type: String,
        required: true
    }
    
}, { timestamps: true });

module.exports = mongoose.model('AvailableTime', availableTimeSchema)