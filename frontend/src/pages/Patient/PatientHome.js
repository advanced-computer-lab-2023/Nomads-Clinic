
import { Link } from "react-router-dom";

const PatientHome = () => {


  return (

    
    <div className="admin-home" style={{ display: 'flex' }}>
      <div className="home-button">
        <Link to="/clinic-patient-home">
          <button className="home1-button">Clinic </button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/pharmacy-patient-home">
          <button className="home1-button"> Pharmacy</button>
        </Link>
      </div>
    </div>

  )
}
export default PatientHome;