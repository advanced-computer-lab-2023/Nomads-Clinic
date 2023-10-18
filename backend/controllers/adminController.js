require('dotenv').config()
 
 const Admin = require('../models/adminModel')
 const mongoose= require('mongoose')
 const jwt= require('jsonwebtoken')
 const bcrypt = require('bcrypt')

 



 const createToken= (_id) => {
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'})
}
//Create a new admin
const createAdmin= async (req,res) => {
    const {email,password}= req.body

    let emptyFields = []

    if(!email){
        emptyFields.push('email')
    }
    if(!password){
        emptyFields.push('password')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }
    //add doc to db
    try{
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        const salt= await bcrypt.genSalt(10)
        const hash= await bcrypt.hash(password,salt)
        
        const admin = await Admin.create({email,password: hash})
        res.status(200).json(admin)
        
    }
    catch(error){

        res.status(400).json({error: error.message})
    }
}


//Get all admins
const getAdmins= async (req,res) => {
    const admins = await Admin.find({}).sort({createdAt: -1 })

    res.status(200).json(admins)
}

//Get a single admin
const getAdmin= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such admin'})
    }

    const admin= await Admin.findById(id)

    if(!admin){
        return res.status(404).json({error: 'No such admin'})
    }
    
    res.status(200).json(admin)
}

//Delete an admin
const deleteAdmin = async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such admin'})
    }

    const admin= await Admin.findOneAndDelete({_id: id})


    if(!admin){
        return res.status(404).json({error: 'No such admin'})
    }

    res.status(200).json(admin)
}

//Update an admin
const updateAdmin= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such admin'})
    }

    const admin = await Admin.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!admin){
        return res.status(404).json({error: 'No such admin'})
    }
    res.status(200).json(admin)
}

//login admin
const loginAdmin = async (req,res) => {

    const {email,password}= req.body


    try{
        const admin = await Admin.login(email,password)

        //create a token
        const token = createToken(admin._id)
        const id= admin._id

        res.status(200).json({id,email,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}
//sinup new admin
const signupAdmin = async (req,res) => {
    const {email,password}= req.body

    try{
    
        const admin= await Admin.signup(email,password)

        //create a token
        const token = createToken(admin._id)

        const id= admin._id

        res.status(200).json({id,email,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}

module.exports= {
    createAdmin,
    getAdmins,
    getAdmin,
    deleteAdmin,
    updateAdmin,
    signupAdmin,
    loginAdmin
}