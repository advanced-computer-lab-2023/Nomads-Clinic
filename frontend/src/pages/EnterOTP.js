
import React, { useState } from 'react';
import { useOTP } from '../hooks/useOTP';

const EnterOTP = () => {
  const [otp, setOtp] = useState('');
  const { message, checkOtp } = useOTP();

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkOtp(otp);
    
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <label>OTP:</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Submit OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EnterOTP;
