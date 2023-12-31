import { Link } from "react-router-dom";

const ClinicPatientHome = () => {

  return (

    <div className="admin-home" style={{ display: 'flex', flexDirection: 'column' }}>
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
      <div className="home-button">
        <Link to="/patient-change-password">
          <button>Change Password</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/patient-view-healthRecords">
          <button>Medical History</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/patient-view-wallet">
          <button>View Wallet </button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/patient-subscribed-healthPackage">
          <button>View Subscribed Health Package </button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/view-my-doctors">
          <button>View my doctors </button>
        </Link>
      </div>
    </div>

  )
}
export default ClinicPatientHome;