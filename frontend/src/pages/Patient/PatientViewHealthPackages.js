import React, { useEffect, useState } from 'react';
import HealthPackageDetails from '../../components/Patient/HealthPackageDetails';

const PatientViewHealthPackages = () => {
    const [healthPackages, setHealthPackages] = useState(null);
  
    useEffect(() => {
        const fetchHealthPackages = async () => {
            const response = await fetch('/api/healthpackages');
            const json = await response.json();

            if (response.ok) {
                setHealthPackages(json);
            }
        };
        fetchHealthPackages();
    }, []);

    

    return (
        <div className="home">
            <div className="healthPackages">
                {healthPackages && healthPackages.map((healthPackage) => (
                    <HealthPackageDetails key={healthPackage._id} healthPackage={healthPackage}/>
                ))}
            </div>
        </div>
    );
};

export default PatientViewHealthPackages;







