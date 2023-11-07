
import { Link } from "react-router-dom";

const DoctorHome =() => {
    
  
    return (

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
        </div>
    
      )
    }
export default DoctorHome;