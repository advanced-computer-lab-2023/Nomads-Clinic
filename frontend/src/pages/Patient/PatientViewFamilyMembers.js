import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import FamilyMemberDetails from '../../components/Patient/FamilyMemberDetails';
import {useAuthContext} from '../../hooks/useAuthContext'

const PatientViewFamilyMembers = () => {
    const [familyMembers, setFamilyMembers] = useState(null);
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchFamilyMembers = async () => {
            const response = await fetch('/api/familymembers', {
                headers: {
                    'Authorization': `Bearer ${user.token}`

                }
            });
            const json = await response.json();

            if (response.ok) {
                setFamilyMembers(json);
            }
        };
        if(user){
            fetchFamilyMembers();
        }
      
    }, [user]);

    return (
        <div className="home">
            <div className="doctors">
                {familyMembers && familyMembers.map((familyMember) => (
                    <FamilyMemberDetails
                        key={familyMember._id} familyMember={familyMember} />
                ))}
                <div className='add-new-admin-button'>
                    <Link to="/familymember-form">
                        <button>Add a Family Member</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default PatientViewFamilyMembers