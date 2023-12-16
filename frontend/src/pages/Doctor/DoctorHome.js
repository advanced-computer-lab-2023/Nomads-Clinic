
import { Link } from "react-router-dom";
import {useAuthContext} from '../../hooks/useAuthContext'
import DocumentDetails from '../../components/Doctor/DocumentDetails';
import { useState, useEffect } from "react";

const DoctorHome = () => {
  const [isApproved, setIsApproved] = useState(true);
  const [documents, setDocuments] = useState(null);
  const { user } = useAuthContext();
  //console.log(user);

  useEffect(() => {
    if(user){
      const fetchDocuments = async () => {
        const id = user.id;
        //router.delete('/document/:id', deleteDocument)
        const response = await fetch(`/api/doctors/document/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`

            }
        });
        const json = await response.json();

        if (response.ok) {
            setDocuments(json);
        }
      };
      fetchDocuments();
      if(!user.approved){
        setIsApproved(false)
      }
    }
    
  }, [user]);

  return (

    <div style={{ display: 'block' }}>
    <div className="admin-home" style={{ display: 'flex' }}>
      <div className="home-button">
        <Link to="/doctor-view-info">
          <button>My Info</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/doctor-view-appointments">
          <button>My appointments</button>
        </Link>

      </div>
      <div className="home-button">
        <Link to="/doctor-view-patients">
          <button>My Patients</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/doctor-change-password">
          <button>Change Password</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/doctor-add-availableTime">
          <button>Add Availavble Time Slot</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/doctor-view-wallet">
          <button>View Wallet </button>
        </Link>
      </div>
      <div class="break"></div>
      {!isApproved && (<div className="div-block" style={{ display: 'block' }}>
        <h1>Waiting for admin approval.</h1>
        <h2>Upload the required documents to speed up the process.</h2>
        {documents && documents.map((document) => (
                    <DocumentDetails
                        key={document._id} document={document} />
                ))}
        <div className="home-button">
        <Link to="/not-approved-doctor">
          <button>Upload more documents</button>
        </Link>
      </div>
      </div>)}
    </div>
    </div>

  )
}

export default DoctorHome;