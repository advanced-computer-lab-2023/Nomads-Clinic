require('dotenv').config()
 
const Prescription = require('../models/prescriptionModel')
const mongoose= require('mongoose')


//Create a new Prescription
const createPrescription= async (req,res) => {
    const {year,month,day,name,status,patientId}= req.body

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
    if(!name){
        emptyFields.push('name')
    }
    if(!status){
        emptyFields.push('status')
    }
    if(!patientId){
        emptyFields.push('doctorId')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }

    //add doc to db
    try{
        const doctorId= req.doctor._id
        const prescription= await Prescription.create({year,month,day,name,status,patientId,doctorId})
        res.status(200).json(prescription)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//get all prescriptions
const getPrescriptions = async (req, res) => {
   
    try {
        let prescriptions;

        
        if (req.patient) {
            // If a patient is logged in, retrieve precriptions for the patient
            const patientId = req.patient._id;
            prescriptions = await Prescription.find({ patientId }).sort({ createdAt: -1 });
        } 
        else if (req.doctor) {
      
            // If a doctor is logged in, retrieve prescriptions for the doctor
          
            const doctorId = req.doctor._id;
            prescriptions = await Prescription.find({ doctorId }).sort({ createdAt: -1 });
        } 

       
        res.status(200).json(prescriptions);
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPrescriptionsByDate = async (req, res) => {
    try {
        const { year,month,day} = req.query; // Access time from query parameters
    
        // Query the database to find Prescriptions with the specified time
        const prescriptions = await Prescription.find({year:year, month:month, day:day}).sort({ createdAt: -1 });

        res.status(200).json(prescriptions);
    } catch (error) {
        console.error('Error fetching precriptions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Get a single Prescription
const getPrescription= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such prescription'})
    }

    const prescription= await Prescription.findById(id)

    if(!prescription){
        return res.status(404).json({error: 'No such prescription'})
    }
    
    res.status(200).json(prescription)
}

//Delete a prescription
const deletePrescription= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such prescription'})
    }

    const prescription= await Prescription.findOneAndDelete({_id: id})


    if(!prescription){
        return res.status(404).json({error: 'No such prescription'})
    }

    res.status(200).json(prescription)
}

//Update a prescription
const updatePrescription= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such prescription'})
    }

    const prescription= await Prescription.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!prescription){
        return res.status(404).json({error: 'No such prescription'})
    }
    res.status(200).json(prescription)

}
module.exports= {
    createPrescription,
    getPrescriptions,
    getPrescription,
    deletePrescription,
    updatePrescription,
    getPrescriptionsByDate
}