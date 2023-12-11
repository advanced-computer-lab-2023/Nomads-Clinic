// ClinicHome.js

import React from 'react';
import { Link } from 'react-router-dom';
 

const ClinicHome = () => {
  return (
    <div className="clinic-home-container">
      <h1>Welcome to El7a2ny. To Access the Clinic and/or the Pharmacy Please select an option!</h1>
      <p className="select-role">I'm a</p>
      <div className="button-container">
        <Link to="/patient-login">
          <button className="role-button">Patient</button>
        </Link>
        <Link to="/doctor-login">
          <button className="role-button">Doctor</button>
        </Link>
        <Link to="/pharmacist-login">
          <button className="role-button">Pharmacist</button>
        </Link>
        <Link to="/admin-login">
          <button className="role-button">Admin</button>
        </Link>
      </div>
      <p className="or-text">or</p>

      <Link to="/patient-signup">
        <button className="register-button">Register as  a Patient</button>
      </Link>
      <p className="or-text">or</p>
      <Link to="/doctor-signup">
        <button className="register-button">Register as a Doctor</button>
      </Link>
   
      <p className="or-text">or</p>
      <Link to="/pharmacist-signup">
        <button className="register-button">Register as a Pharmacist</button>
      </Link>
    </div>
  );
};

export default ClinicHome;
