import React, { useEffect, useState } from 'react';
import DoctorDetails from '../../components/Patient/DoctorDetails';
import { useNavigate } from 'react-router-dom'

const PatientViewDoctors = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState(null);
    const [isNameChecked, setIsNameChecked] = useState(false);
    const [isSpecialtyChecked, setIsSpecialtyChecked] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch('/api/doctors/approved');
            const json = await response.json();

            if (response.ok) {
                setDoctors(json);
                setFilteredDoctors(json); // Initialize filteredDoctors with all doctors initially
            }
        };
        fetchDoctors();
    }, []);

    const handleSearchInputChange = (e) => {
        const searchValue = e.target.value;
        setSearchInput(searchValue);

        // Filter doctors based on the search input and selected checkboxes
        const filtered = doctors.filter((doctor) => {
            const nameMatch =
                isNameChecked &&
                (doctor.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                    doctor.lastName.toLowerCase().includes(searchValue.toLowerCase()));
            const specialtyMatch =
                isSpecialtyChecked && doctor.specialty.toLowerCase().includes(searchValue.toLowerCase());

            // If no checkboxes are checked, return true to show all doctors
            if (!isNameChecked && !isSpecialtyChecked) {
                return true;
            }

            // If at least one checkbox is checked, return true if there's a match
            return nameMatch || specialtyMatch;
        });

        setFilteredDoctors(filtered);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'name') {
            setIsNameChecked(checked);
        } else if (name === 'specialty') {
            setIsSpecialtyChecked(checked);
        }
    };

 // Inside PatientViewDoctors component
const handleBook = (doctor) => {
    navigate('/patient-book-appointment', { state: { doctor } });
  };
  

    return (
        <div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search doctors..."
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    disabled={!isNameChecked && !isSpecialtyChecked} // Disable search bar when no checkboxes are checked
                />
            </div>
            <div> Search Doctors by:</div>
            <div className="search-options">
                <label className="checkbox-label">
                    <input type="checkbox" name="name" onChange={handleCheckboxChange} /> Name
                </label>
                <label className="checkbox-label">
                    <input type="checkbox" name="specialty" onChange={handleCheckboxChange} /> Specialty
                </label>
            </div>
            <div className="home">
                <div className="doctors">
                    {filteredDoctors &&
                        filteredDoctors.map((doctor) => (
                            <DoctorDetails key={doctor._id} doctor={doctor} onBook={() => handleBook(doctor)} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default PatientViewDoctors;
