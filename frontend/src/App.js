import { BrowserRouter, Routes, Route } from 'react-router-dom'


import GuestHome from './pages/Guest/GuestHome'
import GuestViewDoctors from './pages/Guest/GuestViewDoctors';

import AdminHome from './pages/Admin/AdminHome'
import AdminViewDoctors from './pages/Admin/AdminViewDoctors';
import AdminViewApprovalDoctors from './pages/Admin/AdminViewApprovalDoctors'
import AdminViewAdmins from './pages/Admin/AdminViewAdmins';
import AdminForm from './components/Admin/AdminForm';
import AdminViewPatients from './pages/Admin/AdminViewPatients';
import AdminViewHealthPackages from './pages/Admin/AdminViewHealthPackages';
import AdminChangePassword from './pages/Admin/AdminChangePassword';
import HealthPackageForm from './components/Admin/HealthPackageForm';

import DoctorHome from './pages/Doctor/DoctorHome';
import NonApprovedDoctor from './pages/Doctor/NonApprovedDoctor';
import DoctorViewInfo from './pages/Doctor/DoctorViewInfo';
import DoctorViewAppointments from './pages/Doctor/DoctorViewAppointments';
import DoctorViewPatients from './pages/Doctor/DoctorViewPatients';
import DoctorChangePassword from './pages/Doctor/DoctorChangePassword';

import PatientHome from './pages/Patient/PatientHome';
import PatientViewPrescriptions from './pages/Patient/PateintViewPrescriptions';
import PatientViewAppointments from './pages/Patient/PatientViewAppointments';
import PatientViewDoctors from './pages/Patient/PatientViewDoctors';
import PatientViewFamilyMembers from './pages/Patient/PatientViewFamilyMembers';
import PatientViewHealthPackages from './pages/Patient/PatientViewHealthPackages';
import FamilyMemberForm from './components/Patient/FamilyMemberForm';
import PatientBookAppointment from './pages/Patient/PatientBookAppointment';
import PatientChangePassword from './pages/Patient/PatientChangePassword';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<GuestHome />}
            />
            <Route
              path="/guest-view-doctors"
              element={<GuestViewDoctors />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/admin-home"
              element={<AdminHome />}
            />
            <Route
              path="/admin-view-doctors"
              element={<AdminViewDoctors />}
            />
            <Route
              path="/admin-view-admins"
              element={<AdminViewAdmins />}
            />
            <Route
              path="/admin-view-patients"
              element={<AdminViewPatients />}
            />
            <Route
              path="/admin-view-healthpackages"
              element={<AdminViewHealthPackages />}
            />
            <Route
              path="/admin-form"
              element={<AdminForm />}
            />
            <Route
              path="/admin-change-password"
              element={<AdminChangePassword />}
            />
            <Route
              path="/healthpackage-form"
              element={<HealthPackageForm />}
            />
            <Route
              path="/admin-view-approval-doctors"
              element={<AdminViewApprovalDoctors />}
            />
            <Route
              path="/doctor-home"
              element={<DoctorHome />}
            />
            <Route
              path="/not-approved-doctor"
              element={<NonApprovedDoctor />}
            />
            <Route
              path="/doctor-view-info"
              element={<DoctorViewInfo />}
            />
            <Route
              path="/doctor-view-appointments"
              element={<DoctorViewAppointments />}
            />
            <Route
              path="/doctor-view-patients"
              element={<DoctorViewPatients />}
            />
            <Route
              path="/doctor-change-password"
              element={<DoctorChangePassword />}
            />
            <Route
              path="/patient-home"
              element={<PatientHome />}
            />
            <Route
              path="/patient-view-prescriptions"
              element={<PatientViewPrescriptions />}
            />
            <Route
              path="/patient-view-appointments"
              element={<PatientViewAppointments />}
            />
            <Route
              path="/patient-view-doctors"
              element={<PatientViewDoctors />}
            />
            <Route
              path="/patient-view-familymembers"
              element={<PatientViewFamilyMembers />}
            />
            <Route
              path="/patient-view-healthpackages"
              element={<PatientViewHealthPackages />}
            />
            <Route
              path="/familymember-form"
              element={<FamilyMemberForm />}
            />
            <Route
              path="/patient-book-appointment"
              element={<PatientBookAppointment />}
            />
            <Route
              path="/patient-change-password"
              element={<PatientChangePassword />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
