require('dotenv').config()
 
 const Patient = require('../models/patientModel')
 const mongoose= require('mongoose')
 const jwt= require('jsonwebtoken')
 const bcrypt = require('bcrypt')
 const validator= require('validator')

 



 const createToken= (_id) => {
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'})
}



//Get all patients
const getPatients= async (req,res) => {
    const patients = await Patient.find({}).sort({createdAt: -1 })

    res.status(200).json(patients)
}

//Get a single patient
const getPatient= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such patient'})
    }

    const patient= await Patient.findById(id)

    if(!patient){
        return res.status(404).json({error: 'No such patient'})
    }
    
    res.status(200).json(patient)
}

//Delete a patient
const deletePatient = async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such patient'})
    }

    const patient= await Patient.findOneAndDelete({_id: id})


    if(!patient){
        return res.status(404).json({error: 'No such patient'})
    }

    res.status(200).json(patient)
}

//Update a patient
const updatePatient= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such patient'})
    }

    const patient = await Patient.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!patient){
        return res.status(404).json({error: 'No such patient'})
    }
    res.status(200).json(patient)
}
const updatePatientPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body; // Get the new password from the request body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such patient' });
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: 'Password is not strong enough' });
    }

    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    const patient = await Patient.findByIdAndUpdate(
        { _id: id },
        { password:hash } // Update the patient's password
    );

    if (!patient) {
        return res.status(404).json({ error: 'No such patient' });
    }

    res.status(200).json(patient);
};

//login patient
const loginPatient= async (req,res) => {

    const {email,password}= req.body


    try{
        const patient = await Patient.login(email,password)

        //create a token
        const token = createToken(patient._id)
        const id= patient._id

        res.status(200).json({id,email,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}
//sinup new patient
const signupPatient= async (req,res) => {
    const {username,firstName,lastName,email,password,dateOfBirth,gender,mobileNumber,emergencyContact}= req.body

    try{
        const patient = await Patient.signup(username,firstName,lastName,email,password,dateOfBirth,gender,mobileNumber,emergencyContact)

        //create a token
        const token = createToken(patient._id)
        const id= patient._id

        res.status(200).json({id,email,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}

module.exports= {
    getPatients,
    getPatient,
    deletePatient,
    updatePatient,
    updatePatientPassword,
    signupPatient,
    loginPatient
}