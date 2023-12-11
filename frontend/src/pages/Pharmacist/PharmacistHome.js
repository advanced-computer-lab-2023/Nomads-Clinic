import { Link } from "react-router-dom";

const PharmacistHome = () => {

  return (

    <div className="admin-home" style={{ display: 'flex' }}>
      <div className="home-button">
        <Link to="/pharmacist-view-medicine">
          <button>View All Medicine</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/pharmacist-change-password">
          <button>Change Password</button>
        </Link>
      </div>
    </div>

  )
}
export default PharmacistHome;