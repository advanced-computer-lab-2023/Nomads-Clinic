import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext'; 

const DoctorViewInfo = () => {
    const [doctor, setDoctor] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newHourlyRate, setNewHourlyRate] = useState('');
    const [newAffiliation, setNewAffiliation] = useState('');
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingHourlyRate, setIsEditingHourlyRate] = useState(false);
    const [isEditingAffiliation, setIsEditingAffiliation] = useState(false);
    const { user } = useAuthContext(); 
      useEffect(() => {
        const fetchDoctor = async () => {
            const response = await fetch(`/api/doctors/${user.id}`);
            const json = await response.json();

            if (response.ok) {
                setDoctor(json);
                setNewUsername(json.username);
                setNewHourlyRate(json.hourlyRate);
                setNewAffiliation(json.affiliation);
            }
        };
        if(user){
            fetchDoctor();
        }
      }, [user]);
      const handleUpdateUsername= async () => {
        // Send an API request to update the clinic price with newClinicPrice
        try {
            const response = await fetch(`/api/doctors/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: newUsername }),
            });

            if (response.ok) {
                window.location.reload();
                setNewUsername(newUsername);
                setIsEditingUsername(false);
            } else {
                console.error('Error updating Username');
            }
        } catch (error) {
            console.error('Error updating Username', error);
        }
    };
    const handleUpdateHourlyRate= async () => {
        // Send an API request to update the clinic price with newClinicPrice
        try {
            const response = await fetch(`/api/doctors/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hourlyRate: newHourlyRate}),
            });

            if (response.ok) {
                window.location.reload();
                setNewHourlyRate(newHourlyRate);
                setIsEditingHourlyRate(false);
            } else {
                console.error('Error updating Hourly Rate');
            }
        } catch (error) {
            console.error('Error updating Hourly Rate:', error);
        }
    };
    const handleUpdateAffiliation= async () => {
        // Send an API request to update the clinic price with newClinicPrice
        try {
            const response = await fetch(`/api/doctors/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ affiliation: newAffiliation }),
            });

            if (response.ok) {
                window.location.reload();
                setNewAffiliation(newAffiliation);
                setIsEditingAffiliation(false);
            } else {
                console.error('Error updating Affiliation');
            }
        } catch (error) {
            console.error('Error updating Affiliation', error);
        }
    };
      return (
        <div>
          {doctor ? (
            <div>
              <h2>My Info</h2>
              <p><strong>Email: </strong> {doctor.email}</p>
              <p><strong>First Name: </strong> {doctor.firstName}</p>
              <p><strong>Last Name: </strong> {doctor.lastName}</p>
              <p><strong>Date of Birth: </strong>{new Date(doctor.dateOfBirth).toLocaleDateString()}</p>
              <p><strong>Specialty: </strong>{doctor.specialty}</p>

              {isEditingUsername ? (
                    <div>
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                        <div className='edit-button'>
                        <button onClick={handleUpdateUsername}>Save</button>
                        </div>
                        <div className='edit-button'>
                        <button onClick={() => setIsEditingUsername(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p><strong>Username: </strong> {doctor.username}</p>
                        <button onClick={() => setIsEditingUsername(true)}>Edit Username</button>
                    </div>
                )}

              {isEditingHourlyRate ? (
                    <div>
                        <input
                            type="text"
                            value={newHourlyRate}
                            onChange={(e) => setNewHourlyRate(e.target.value)}
                        />
                        <div className='edit-button'>
                        <button onClick={handleUpdateHourlyRate}>Save</button>
                        </div>
                        <div className='edit-button'>
                        <button onClick={() => setIsEditingHourlyRate(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p><strong>Hourly Rate: </strong> {doctor.hourlyRate}</p>
                        <button onClick={() => setIsEditingHourlyRate(true)}>Edit Hourly Rate</button>
                    </div>
                )}
              {isEditingAffiliation ? (
                    <div>
                        <input
                            type="text"
                            value={newAffiliation}
                            onChange={(e) => setNewAffiliation(e.target.value)}
                        />
                        <div className='edit-button'>
                        <button onClick={handleUpdateAffiliation}>Save</button>
                        </div>
                        <div className='edit-button'>
                        <button onClick={() => setIsEditingAffiliation(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p><strong>Affiliation: </strong> {doctor.affiliation}</p>
                        <button onClick={() => setIsEditingAffiliation(true)}>Edit Affiliation</button>
                    </div>
                )}
                
            </div>
          ) : (
            <p>Loading doctor information...</p>
          )}
        </div>
      );
}

export default DoctorViewInfo