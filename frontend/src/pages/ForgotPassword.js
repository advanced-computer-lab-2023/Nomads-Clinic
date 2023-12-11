import React, { useState } from 'react';
import { useOTP } from '../hooks/useOTP';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { message, sendOtp } = useOTP();

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendOtp(email);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
