import {Link} from 'react-router-dom'

const AdminHome = () => {

  return (

    <div className="admin-home" style={{ display: 'flex' }}>
      <div className="home-button">
        <Link to="/admin-view-doctors">
        <button>View Current Doctors</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/admin-view-approval-doctors">
        <button>View Doctor Requests</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/admin-view-patients">
        <button>View Patients</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/admin-view-healthpackages">
        <button>View Health packages</button>
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
export default AdminHome