const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator= require('validator')
const FamilyMember = require('./familyMemberModel')
const HealthPackage = require('./healthPackageModel')

const Schema = mongoose.Schema

const patientSchema = new Schema({
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
    gender: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    wallet:{
        type: Number,
        default: 0
    },
    emergencyContact: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        mobileNumber: {
            type: Number,
            required: true
        }
    },
    healthPackage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HealthPackage'
    },
    cart: [
        {
            medicine: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Medicine', 
                required: true
            },
            quantity: { type: Number, required: true },
            price: { type: Number, default: 0 }
        }
    ],
    addresses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Address',
        },
      ],

}, { timestamps: true });


//static signup method
patientSchema.statics.signup = async function(username,firstName,lastName,email,password,dateOfBirth,gender,mobileNumber,emergencyContact) {
    //validation
    if(!username || !firstName || !lastName || !email || !password || !dateOfBirth || !gender || !mobileNumber || !emergencyContact){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
   
    const exists= await this.findOne({email})

    if(exists){
        throw Error('Email already in use')
    }
    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    const patient = await this.create({username,firstName,lastName,email,password: hash,dateOfBirth,gender,mobileNumber,emergencyContact})

    return patient
}
//static login method
patientSchema.statics.login= async function(email,password) {
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    const patient= await this.findOne({email})

    if(!patient){
        throw Error('Incorrect Email')
    }

    const match= await bcrypt.compare(password,patient.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return patient
}



module.exports = mongoose.model('Patient', patientSchema)
