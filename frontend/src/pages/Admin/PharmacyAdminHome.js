import { Link } from 'react-router-dom'

const PharmacyAdminHome = () => {

  return (

    <div className="admin-home" style={{ display: 'flex' }}>
      <div className="home-button">
        <Link to="/admin-view-pharmacists">
          <button>View Current Pharmacists</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/admin-view-approval-pharmacists">
          <button>View Pharmacist Requests</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/admin-view-medicine">
          <button>View All Medicine</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/admin-view-patients">
          <button>View Patients</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/admin-view-admins">
          <button>View Admins</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/admin-change-password">
        <button>Change Password</button>
        </Link>
      </div>
    </div>

  )
}
export default PharmacyAdminHome