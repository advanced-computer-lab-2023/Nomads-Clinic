import React, { useEffect, useState } from 'react';
import MedicineDetails from '../../components/Admin/MedicineDetails';
import { useAuthContext } from '../../hooks/useAuthContext';

const AdminViewMedicine = () => {
    const [medicine, setMedicine] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search input
    const [selectedUse, setSelectedUse] = useState(''); // State to hold the selected use for filtering

    const { user } = useAuthContext();

    useEffect(() => {
        const fetchMedicine = async () => {
            const response = await fetch('/api/medicine', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                setMedicine(json);
            }
        };

        if (user) {
            fetchMedicine();
        }
    }, [user]);


    const uniqueUses = [...new Set(medicine?.map((medicine) => medicine.use))];


    const filteredMedicines = medicine
        ? medicine.filter((medicine) => {
              const lowerCaseSearchTerm = searchTerm.toLowerCase();
              return (
                  (medicine.use === selectedUse || selectedUse === '') &&
                  medicine.name.toLowerCase().includes(lowerCaseSearchTerm)
              );
          })
        : [];

    return (
        <div className="home2">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div>
                    Use: 
                </div>
                <select
                    value={selectedUse}
                    onChange={(e) => setSelectedUse(e.target.value)}
                >
                    <option value="">All Uses</option>
                    {uniqueUses.map((use) => (
                        <option key={use} value={use}>
                            {use}
                        </option>
                    ))}
                </select>
            </div>
            <div className="medicine">
                {filteredMedicines.map((medicine) => (
                    <MedicineDetails key={medicine._id} medicine={medicine} />
                ))}
            </div>
        </div>
    );
};

export default AdminViewMedicine;

