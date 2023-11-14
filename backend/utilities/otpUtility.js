const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587, 
    secure: false, 
    auth: {
      user: 'ahmadderas111@outlook.com',
      pass: 'deras1234', 
    },
  });

const sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: 'ahmadderas111@outlook.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    });

    console.log('OTP email sent successfully.');
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};

module.exports = { sendOTP };
