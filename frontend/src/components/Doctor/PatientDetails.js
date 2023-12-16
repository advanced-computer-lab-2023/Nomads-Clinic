import React, { useState, useEffect,useRef } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import socketRef from './socket'; // Adjust the path as needed

import createOrJoinRoom from './Room';



const PatientDetails = ({ appointment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const history = useNavigate();
  const socket = useRef(socketRef); // Use the same socket instance
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);





  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchPatientDetails = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/patients/${appointment.patientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient details');
        }

        const data = await response.json();
        setPatientInfo(data);
        setX(appointment.patientId)
        setY(user.id)

        
      } catch (error) {
        console.error('Error fetching patient details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    
      fetchPatientDetails();
    
  }, []);

  const yourFunction = () => {
    createOrJoinRoom({
      patientId: x,
      doctorId: y,
      onComplete: (roomId) => {
        // Do something with the roomId, e.g., navigate to the chat page
        history(`/chat/${roomId}`);
      },
    });
  };
  
  // Call yourFunction to initiate the process
 

  return (
    <div className="doctor-details">
      {isLoading ? (
        <p>Loading Patient details...</p>
      ) : (
        <div>
          {patientInfo ? (
            <div>
              <p>
                <strong>Patient Name:</strong> {patientInfo.firstName} {patientInfo.lastName}
              </p>
              <p>
                <strong>Gender:</strong> {patientInfo.gender}
              </p>
              <p>
                <strong>Date of Birth: </strong>
                {new Date(patientInfo.dateOfBirth).toLocaleDateString()}
              </p>
              <p>
                <strong>Mobile Number:</strong> {patientInfo.mobileNumber}
              </p>
              <div>
                <button onClick={yourFunction}>Chat with Patient</button>
              </div>
            </div>
          ) : (
            <p>Failed to load patient details.</p>
          )}
        </div>
      )}
    </div>
  );
};
export default PatientDetails;
