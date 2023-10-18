const mongoose = require('mongoose')


const Schema = mongoose.Schema

const clinicPriceSchema = new Schema({
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('ClinicPrice', clinicPriceSchema)