import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useOTP = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const sendOtp = async (email) => {
    try {
      // Check if the email is present in the database
      const checkEmailResponse = await fetch(`/api/otp/check-email/${email}`);
      const checkEmailJson = await checkEmailResponse.json();

      if (!checkEmailResponse.ok) {
        setMessage(checkEmailJson.error || 'Something went wrong.');
        return;
      }

      if (checkEmailJson.exists) {
        // If the email exists, initiate the OTP sending process
        const response = await fetch('/api/otp/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          setMessage('Check your email for an OTP.');
          // Redirect to EnterOTP page
          navigate('/enter-otp');
        } else {
          const data = await response.json();
          setMessage(data.error || 'Something went wrong.');
        }
      } else {
        setMessage('Email not registered.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const checkOtp = async (otp) => {
    try {
      const response = await fetch('/api/otp/check-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      if (data.match) {
        // Redirect to PasswordReset page
        navigate("/password-reset");
      } else {
        setMessage('Invalid OTP');
      }
    } catch (error) {
      console.error('Error during OTP check:', error.message);
     
    }
  }

  const resetPassword = async (password) => {
    try {
      const response = await fetch('/api/otp/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      
      if (response.ok) {
        setMessage('Password reset successful');
        navigate('/login');
      } else {
        setMessage('Password reset failed');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Something went wrong, please try again!');
    }
  };
  


  return { message, sendOtp, checkOtp, resetPassword };
};
