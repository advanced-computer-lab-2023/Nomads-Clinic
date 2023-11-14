import React, { useEffect, useState } from 'react';
import AppointmentDetails from '../../components/Doctor/AppointmentDetails';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom'

const DoctorViewAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(null);
  const [filterUpcoming, setFilterUpcoming] = useState(false);
  const [filterCancelled, setFilterCancelled] = useState(false);
  const [filterRescheduled, setFilterRescheduled] = useState(false); // New filter
  const [filterCompleted, setFilterCompleted] = useState(false);     // New filter
  const [filterByDate, setFilterByDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAppointments = async () => {
      let apiUrl = '/api/appointments';

      if (filterUpcoming && !filterCancelled && !filterRescheduled && !filterCompleted) {
        apiUrl = '/api/appointments/status/?status=Upcoming';
      } else if (!filterUpcoming && filterCancelled && !filterRescheduled && !filterCompleted) {
        apiUrl = '/api/appointments/status/?status=Cancelled';
      } else if (!filterUpcoming && !filterCancelled && filterRescheduled && !filterCompleted) {
        apiUrl = '/api/appointments/status/?status=Rescheduled';
      } else if (!filterUpcoming && !filterCancelled && !filterRescheduled && filterCompleted) {
        apiUrl = '/api/appointments/status/?status=Completed';
      } else if (filterByDate && selectedDate) {
        const dateObject = new Date(selectedDate);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; // Add 1 because months are zero-based
        const day = dateObject.getDate();
        apiUrl = `/api/appointments/bydate?year=${year}&month=${month}&day=${day}`;
      }

      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        // Check if appointment is in the past and update its status to "Completed"
        const updatedAppointments = json.map(appointment => {
          const appointmentDate = new Date(appointment.year, appointment.month - 1, appointment.day);
          const currentDate = new Date();
          //   const currentHour = currentDate.getHours();
          if (appointmentDate < currentDate) {
            // Make a request to the server to update the status
            fetch(`/api/appointments/${appointment._id}`, {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ status: 'Completed' }),
            });

            // Return the updated appointment with the status changed
            return { ...appointment, status: 'Completed' };
          } else {
            return appointment;
          }
        });

        setAppointments(updatedAppointments);
      }
    };

    if (user) {
      fetchAppointments();
    }
  }, [user, filterUpcoming, filterCancelled, filterRescheduled, filterCompleted, filterByDate, selectedDate]);

  const clearDateFilter = () => {
    setFilterByDate(false);
    setSelectedDate('');
  };
  const viewHealthRecords = (appointment) => {
    if (appointment) {
      const { patientId } = appointment; 
      navigate('/doctor-view-healthRecords', { state: { appointment: { patientId } } });
    }
  };
  const viewPrescriptions = (appointment) => {
    navigate('/doctor-view-prescriptions', { state: { appointment } });
  };
  const scheduleFollowUp = (appointment) => {
    if (appointment) {
      const { patientId } = appointment; // Extract only necessary properties
      navigate('/doctor-schedule-followUp', { state: { appointment: { patientId } } });
    }
  };
  

  return (
    <div className="home">

      <div className="doctors">
        {appointments && appointments.map((appointment) => (
          <AppointmentDetails
            key={appointment._id}
            appointment={appointment}
            onHealthRecord={viewHealthRecords}
            onFollowUP={scheduleFollowUp}
            onPrescription={viewPrescriptions}
          />
        ))}
      </div>
      <div className="search-options-app">
        <div className='date-date'>
          <label>Date</label>
          {filterByDate ? (
            <div>
              <input
                type='date'
                value={selectedDate}
                min="2024-01-01"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <button onClick={clearDateFilter}>Clear Date Filter</button>
            </div>
          ) : (
            <input
              type='checkbox'
              checked={filterByDate}
              onChange={() => setFilterByDate(!filterByDate)}
            />
          )}
        </div>
        <div>
          Appointment Status:
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filterUpcoming}
              onChange={() => setFilterUpcoming(!filterUpcoming)}
            />
            Upcoming
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filterCancelled}
              onChange={() => setFilterCancelled(!filterCancelled)}
            />
            Cancelled
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filterRescheduled}
              onChange={() => setFilterRescheduled(!filterRescheduled)}
            />
            Rescheduled
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filterCompleted}
              onChange={() => setFilterCompleted(!filterCompleted)}
            />
            Completed
          </label>
        </div>
      </div>
    </div>
  );
};

export default DoctorViewAppointments;
