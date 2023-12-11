const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const pharmacistSchema = new Schema({
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
    }
}, { timestamps: true });


//static signup method
pharmacistSchema.statics.signup = async function (username, firstName, lastName, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground, specialty) {

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

        const pharmacist = await this.create({ username, firstName, lastName, email, password: hash, dateOfBirth, hourlyRate, affiliation, educationalBackground, specialty })

        return pharmacist
    }

}
//static login method
pharmacistSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    const pharmacist = await this.findOne({ email })

    if (!pharmacist) {
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, pharmacist.password)

    if (!match) {
        throw Error('Incorrect Password')
    }

    return pharmacist
}



module.exports = mongoose.model('Pharmacist', pharmacistSchema)
