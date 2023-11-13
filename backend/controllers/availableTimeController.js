require('dotenv').config()
 
const AvailableTime = require('../models/availableTimeModel')
const mongoose= require('mongoose')


//Create a new Family Member 
const createAvailableTime= async (req,res) => {
    const {year,month,day,time}= req.body

    let emptyFields = []

    if(!year){
        emptyFields.push('year')
    }
    if(!month){
        emptyFields.push('month')
    }
    if(!day){
        emptyFields.push('day')
    }
    if(!time){
        emptyFields.push('time')
    }

    //add doc to db
    try{
        const doctorId= req.doctor._id
        const availableTime= await AvailableTime.create({year,month,day,time,doctorId})
        res.status(200).json(availableTime)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


const getAvailableTimes= async (req,res) => {

    const doctorId=req.doctor._id
    const availableTimes = await AvailableTime.find({doctorId}).sort({createdAt: -1 })

    res.status(200).json(availableTimes)
}

//Get all packages
const getAvailableTimesByDate = async (req, res) => {
    const { year, month, day, time } = req.query; // Access data from query parameters
    const doctorId = req.doctor._id;

    try {
        const availableTimes = await AvailableTime.find({ year, month, day, time, doctorId }).sort({ createdAt: -1 });
        res.status(200).json(availableTimes);
    } catch (error) {
        console.error('Error fetching available times:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getAvailableTimesNotBooked = async (req, res) => {

    const { doctorId } = req.query; // Access data from query parameters


    try {
        const availableTimes = await AvailableTime.find({ booked:false, doctorId }).sort({ createdAt: -1 });
        res.status(200).json(availableTimes);
    } catch (error) {
        console.error('Error fetching available times:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//Get a single available time
const getAvailableTime= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such available time'})
    }

    const availableTime= await AvailableTime.findById(id)

    if(!availableTime){
        return res.status(404).json({error: 'No such available time'})
    }
    
    res.status(200).json(availableTime)
}

//Delete an available time
const deleteAvailableTime = async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such available time'})
    }

    const availableTime= await AvailableTime.findOneAndDelete({_id: id})


    if(!availableTime){
        return res.status(404).json({error: 'No such available time'})
    }

    res.status(200).json(availableTime)
}

//Update a family Member
const updateAvailableTime= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such available time'})
    }

    const availableTime = await AvailableTime.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!availableTime){
        return res.status(404).json({error: 'No such available time'})
    }
    res.status(200).json(availableTime)

}
module.exports= {
    createAvailableTime,
    getAvailableTimes,
    getAvailableTimesByDate,
    getAvailableTimesNotBooked,
    getAvailableTime,
    deleteAvailableTime,
    updateAvailableTime,
}