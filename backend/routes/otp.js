const express = require('express');
const { checkEmail, sendOTPController, checkOTP , resetPassword } = require('../controllers/otpController');



const router = express.Router();

// Endpoint to check if email exists
router.get('/check-email/:email', checkEmail);

// Endpoint to send OTP
router.post('/send-otp', sendOTPController);

router.post('/check-otp' , checkOTP);

router.post('/reset-password',resetPassword)


module.exports = router;
