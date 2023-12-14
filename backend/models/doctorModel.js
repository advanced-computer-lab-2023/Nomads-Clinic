const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const doctorSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    affiliation: {
        type: String,
        required: true
    },
    educationalBackground: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    wallet:{
        type: Number,
        default: 0
    },
    accepted_contract: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });


//static signup method
doctorSchema.statics.signup = async function (username, firstName, lastName, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground, specialty) {

    //validation
    if (!username || !firstName || !lastName || !email || !password || !dateOfBirth || !hourlyRate || !affiliation || !educationalBackground || !specialty) {
        throw Error('All fields must be filled')

    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }
    else {

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doctor = await this.create({ username, firstName, lastName, email, password: hash, dateOfBirth, hourlyRate, affiliation, educationalBackground, specialty })

        return doctor
    }

}
//static login method
doctorSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    const doctor = await this.findOne({ email })

    if (!doctor) {
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, doctor.password)

    if (!match) {
        throw Error('Incorrect Password')
    }

    return doctor
}



module.exports = mongoose.model('Doctor', doctorSchema)
