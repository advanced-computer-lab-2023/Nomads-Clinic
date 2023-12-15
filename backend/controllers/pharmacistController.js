require('dotenv').config()
 
 const Pharmacist= require('../models/pharmacistModel')
 const mongoose= require('mongoose')
 const jwt= require('jsonwebtoken')
 const bcrypt = require('bcrypt')
 const validator= require('validator')



 const createToken= (_id) => {
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'})
}


//Gets pharmacists are that still not approved
const getApprovalPharmacists= async (req,res) => {
    const pharmacists = await Pharmacist.find({approved: false}).sort({createdAt: -1 })

    res.status(200).json(pharmacists)
}


//Gets pharmacists are approved
const getPharmacists= async (req,res) => {
    const pharmacists = await Pharmacist.find({approved: true}).sort({createdAt: -1 })

    res.status(200).json(pharmacists)
}

//Get a single pharmacist
const getPharmacist= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such pharmacist'})
    }

    const pharmacist= await Pharmacist.findById(id)

    if(!pharmacist){
        return res.status(404).json({error: 'No such pharmacist'})
    }
    
    res.status(200).json(pharmacist)
}

//Delete a pharmacist
const deletePharmacist = async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such pharmacist'})
    }

    const pharmacist= await Pharmacist.findOneAndDelete({_id: id})


    if(!pharmacist){
        return res.status(404).json({error: 'No such pharmacist'})
    }

    res.status(200).json(pharmacist)
}

//Update a pharmacist
const updatePharmacist= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such pharmacist'})
    }

    const pharmacist = await Pharmacist.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!pharmacist){
        return res.status(404).json({error: 'No such pharmacist'})
    }
    res.status(200).json(pharmacist)
}

//login pharmacist
const loginPharmacist= async (req,res) => {

    const {email,password}= req.body


    try{
        const pharmacist = await Pharmacist.login(email,password)

        //create a token
        const token = createToken(pharmacist._id)
        const id= pharmacist._id

        const type = "pharmacist"
        
        const { approved } = pharmacist;

        res.status(200).json({ type, id, email, token, approved });
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}
//sinup new pharmacist
const signupPharmacist= async (req,res) => {
    const {username,firstName,lastName,email,password,dateOfBirth,hourlyRate,affiliation,educationalBackground, specialty}= req.body

    try{
        const pharmacist= await Pharmacist.signup(username,firstName,lastName,email,password,dateOfBirth,hourlyRate,affiliation,educationalBackground, specialty)

        //create a token
        const token = createToken(pharmacist._id)

        const id= pharmacist._id

        const type = "pharmacist"

        const approved= false;

        res.status(200).json({type,id,email,token,approved})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}
const updatePharmacistPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body; // Get the new password from the request body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such pharmacist' });
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: 'Password is not strong enough' });
    }

    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    const pharmacist = await Pharmacist.findByIdAndUpdate(
        { _id: id },
        { password:hash } // Update the pharmacist's password
    );

    if (!pharmacist) {
        return res.status(404).json({ error: 'No such pharmacist' });
    }

    res.status(200).json(pharmacist);
};

module.exports= {
    getApprovalPharmacists,
    getPharmacists,
    getPharmacist,
    deletePharmacist,
    updatePharmacist,
    updatePharmacistPassword,
    signupPharmacist,
    loginPharmacist
}
