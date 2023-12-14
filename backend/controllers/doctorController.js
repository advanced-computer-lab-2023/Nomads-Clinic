require('dotenv').config()
 
 const Doctor= require('../models/doctorModel')
 const mongoose= require('mongoose')
 const jwt= require('jsonwebtoken')
 const bcrypt = require('bcrypt')
 const validator= require('validator')
 const Document = require('../models/documentModel')




 const createToken= (_id) => {
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'})
}


//Gets doctors are that still not approved
const getApprovalDoctors= async (req,res) => {
    const doctors = await Doctor.find({approved: false}).sort({createdAt: -1 })

    res.status(200).json(doctors)
}


//Gets doctors are approved
const getDoctors= async (req,res) => {
    const doctors = await Doctor.find({approved: true}).sort({createdAt: -1 })

    res.status(200).json(doctors)
}

//Get a single doctor
const getDoctor= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such doctor'})
    }

    const doctor= await Doctor.findById(id)

    if(!doctor){
        return res.status(404).json({error: 'No such doctor'})
    }
    
    res.status(200).json(doctor)
}

//Delete a doctor
const deleteDoctor = async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such doctor'})
    }

    const doctor= await Doctor.findOneAndDelete({_id: id})


    if(!doctor){
        return res.status(404).json({error: 'No such doctor'})
    }

    res.status(200).json(doctor)
}

//Update a doctor
const updateDoctor= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such doctor'})
    }

    const doctor = await Doctor.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!doctor){
        return res.status(404).json({error: 'No such doctor'})
    }
    res.status(200).json(doctor)
}
const updateDoctorPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body; // Get the new password from the request body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such doctor' });
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: 'Password is not strong enough' });
    }

    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    const doctor = await Doctor.findByIdAndUpdate(
        { _id: id },
        { password:hash } // Update the doctor's password
    );

    if (!doctor) {
        return res.status(404).json({ error: 'No such doctor' });
    }

    res.status(200).json(doctor);
};

//login doctor
const loginDoctor= async (req,res) => {

    const {email,password}= req.body


    try{
        const doctor = await Doctor.login(email,password)

        //create a token
        const token = createToken(doctor._id)
        const id= doctor._id

        const type = "doctor"

        res.status(200).json({type,id,email,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}
//sinup new doctor
const signupDoctor= async (req,res) => {
    const {username,firstName,lastName,email,password,dateOfBirth,hourlyRate,affiliation,educationalBackground, specialty}= req.body

    try{
        const doctor= await Doctor.signup(username,firstName,lastName,email,password,dateOfBirth,hourlyRate,affiliation,educationalBackground, specialty)

        //create a token
        const token = createToken(doctor._id)

        const id= doctor._id

        const type = "doctor"

        res.status(200).json({type,id,email,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}

//Upload required document
const uploadDocument= async (req,res) => {

    if(!req.file){
        return res.status(400).json({error: 'No file was uploaded'})
    }

    const document = req.file.filename

    if (req.doctor) {
        // If a doctor is logged in
        const doctorId = req.doctor._id;
        const newDocument= new Document({
            doctorId,
            document
        })

        try{
            await newDocument.save()
            res.status(201).json(newDocument)
        }catch(error){
            console.log(error)
            res.status(500).json({error: error.message})
        }
    }
}

module.exports= {
    getApprovalDoctors,
    getDoctors,
    getDoctor,
    deleteDoctor,
    updateDoctor,
    updateDoctorPassword,
    signupDoctor,
    loginDoctor,
    uploadDocument
}