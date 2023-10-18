import { Link } from "react-router-dom";

const PatientHome = () => {
  
    return (

        <div className="admin-home" style={{ display: 'flex' }}>
          <div className="home-button">
            <Link to="/patient-view-doctors">
            <button>View All Doctors</button>
            </Link>
          </div>
          <div className="home-button">
            <Link to="/patient-view-appointments">
            <button>My Appointments</button>
            </Link>
          </div>
          <div className="home-button">
            <Link to="/patient-view-prescriptions">
            <button>My Prescriptions</button>
            </Link>
          </div>
          <div className="home-button">
            <Link to="/patient-view-familymembers">
            <button>View Registered Family Members</button>
            </Link>
          </div>
          <div className="home-button">
            <Link to="/patient-view-healthpackages">
            <button>View Health Packages</button>
            </Link>
          </div>
        </div>
    
      )
    }
export default PatientHome;