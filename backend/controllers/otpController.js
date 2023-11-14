const { sendOTP } = require('../utilities/otpUtilitiy');
const Patient = require('../models/patientModel'); 
const Doctor = require('../models/doctorModel'); 
const Admin = require('../models/adminModel'); 
const validator = require('validator');
const bcrypt = require('bcrypt')

let email
let genOtp
// Function to check if the email exists
const checkEmail = async (req, res) => {
  const { email } = req.params;

  try {
    // Check if the email exists in any of the schemas
    const patient = await Patient.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (patient || doctor || admin) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to send OTP
const sendOTPController = async (req, res) => {
  const { email } = req.body;
  genOtp = generateOTP(); 
  try {
    // Utility function called
    await sendOTP(email, genOtp);

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const checkOTP = async (req,res) => {
  try{
    const {enteredOTP} = req.body.otp
    if (genOtp === enteredOTP){
      res.json({ match: true });
    }
    else{
      res.json({ match: false });
    }
    
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
}

// Function to generate a random OTP (for example only)
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const resetPassword = async (req, res) => {
  const { password } = req.body;

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: 'Password is not strong enough' });
  }

    const admin = Admin.findOne(email);
    const patient = Patient.findOne(email);
    const doctor = Doctor.findOne(email);

    if(admin){
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);


        const user = await Admin.findOneAndUpdate(
          { email: email }, // Query to find the admin based on predefined email
          { password: hash }, // Update the admin's password
          { new: true } // Return the updated document
        );
    
        res.status(200).json(user);
      } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    if(patient){
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
    
        
        const user = await Patient.findOneAndUpdate(
          { email: email }, // Query to find the patient based on predefined email
          { password: hash }, // Update the admin's password
          { new: true } // Return the updated document
        );
    
        res.status(200).json(user);
      } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    if(doctor){
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
    
        
        const user = await Doctor.findOneAndUpdate(
          { email: email }, // Query to find the doctor based on predefined email
          { password: hash }, // Update the admin's password
          { new: true } // Return the updated document
        );
    
        res.status(200).json(user);
      } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  
};



module.exports = { checkEmail, sendOTPController, checkOTP, resetPassword };
