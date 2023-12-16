import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';


import GuestHome from './pages/Guest/GuestHome'

import AdminHome from './pages/Admin/AdminHome'
import ClinicAdminHome from './pages/Admin/ClinicAdminHome';
import PharmacyAdminHome from './pages/Admin/PharmacyAdminHome';
import AdminViewDoctors from './pages/Admin/AdminViewDoctors';
import AdminViewApprovalDoctors from './pages/Admin/AdminViewApprovalDoctors'
import AdminViewAdmins from './pages/Admin/AdminViewAdmins';
import AdminForm from './components/Admin/AdminForm';
import AdminViewPatients from './pages/Admin/AdminViewPatients';
import AdminViewHealthPackages from './pages/Admin/AdminViewHealthPackages';
import AdminChangePassword from './pages/Admin/AdminChangePassword';
import HealthPackageForm from './components/Admin/HealthPackageForm';
import AdminViewPharmacists from './pages/Admin/AdminViewPharmacists';
import AdminViewApprovalPharmacists from './pages/Admin/AdminViewApprovalPharmacists'
import AdminViewMedicine from './pages/Admin/AdminViewMedicine';
import AdminLogin from './pages/Admin/AdminLogin';


import DoctorHome from './pages/Doctor/DoctorHome';
import NonApprovedDoctor from './pages/Doctor/NonApprovedDoctor';
import DoctorViewInfo from './pages/Doctor/DoctorViewInfo';
import DoctorViewAppointments from './pages/Doctor/DoctorViewAppointments';
import DoctorViewPatients from './pages/Doctor/DoctorViewPatients';
import DoctorChangePassword from './pages/Doctor/DoctorChangePassword';
import DoctorAddAvailableTime from './pages/Doctor/DoctorAddAvailableTime';
import DoctorViewWallet from './pages/Doctor/DoctorViewWallet';
import DoctorViewHealthRecords from './pages/Doctor/DoctorViewHealthRecords';
import DoctorScheduleFollowUp from './pages/Doctor/DoctorScheduleFollowUp';
import DoctorViewPrescriptions from './pages/Doctor/DoctorViewPrescriptions';
import PrescriptionForm from './components/Doctor/PrescriptionForm';
import DoctorLogin from './pages/Doctor/DoctorLogin';
import DoctorSignup from './pages/Doctor/DoctorSignup';
import DoctorHealthRecordForm from './components/Doctor/DoctorHealthRecordForm';

import PharmacistHome from './pages/Pharmacist/PharmacistHome';
import NonApprovedPharmacist from './pages/Pharmacist/NonApprovedPharmacist';
import PharmacistViewMedicine from './pages/Pharmacist/PharmacistViewMedicine';
import MedicineForm from './components/Pharmacist/MedicineForm';
import PharmacistChangePassword from './pages/Pharmacist/PharmacistChangePassword';
import PharmacistLogin from './pages/Pharmacist/PharmacistLogin';
import PharmacistSignup from './pages/Pharmacist/PharmacistSignup';


import PatientHome from './pages/Patient/PatientHome';
import ClinicPatientHome from './pages/Patient/ClinicPatientHome';
import PharmacyPatientHome from './pages/Patient/PharmacyPatientHome';
import PatientViewPrescriptions from './pages/Patient/PateintViewPrescriptions';
import PatientViewAppointments from './pages/Patient/PatientViewAppointments';
import PatientViewDoctors from './pages/Patient/PatientViewDoctors';
import PatientViewFamilyMembers from './pages/Patient/PatientViewFamilyMembers';
import PatientViewHealthPackages from './pages/Patient/PatientViewHealthPackages';
import FamilyMemberForm from './components/Patient/FamilyMemberForm';
import PatientBookAppointment from './pages/Patient/PatientBookAppointment';
import PatientChangePassword from './pages/Patient/PatientChangePassword';
import PatientViewHealthRecords from './pages/Patient/PatientViewHealthRecords';
import PatientHealthRecordForm from './components/Patient/PatientHealthRecordForm';
import PatientViewWallet from './pages/Patient/PatientViewWallet';
import PatientSubscribedHealthPackage from './pages/Patient/PatientSubscribedHealthPackage';
import PatientLogin from './pages/Patient/PatientLogin';
import PatientSignup from './pages/Patient/PatientSignup';
import PatientViewMedicine from './pages/Patient/PatientViewMedicine';
import PatientCheckout from './pages/Patient/PatientCheckout';
import PatientViewOrders from './pages/Patient/PatientViewOrders';
import ViewMyDoctors from './pages/Patient/ViewMyDoctors';




import Navbar from './components/Navbar';
import ChatComponent from './components/Patient/ChatComponent';
import ChatPage from './components/Doctor/ChatPage';


function App() {

  const {user} = useAuthContext()
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={ !user ?  <GuestHome /> : 
              user.type==="patient" ? <Navigate to="patient-home"/> :
              user.type==="doctor" ? (user.approved ? <Navigate to="doctor-home"/> :<Navigate to="not-approved-doctor"/> ) : 
              user.type==="pharmacist" ? (user.approved ? <Navigate to="pharmacist-home"/> :<Navigate to="not-approved-pharmacist"/> ) :  
              <Navigate to="admin-home"/> }
            />
            <Route
              path="/patient-login"
              element={<PatientLogin />}
            />
            <Route
              path="/doctor-login"
              element={<DoctorLogin />}
            />
            <Route
              path="/admin-login"
              element={<AdminLogin />}
            />
            <Route
              path="/pharmacist-login"
              element={<PharmacistLogin />}
            />
            <Route
              path="/patient-signup"
              element={<PatientSignup />}
            />
            <Route
              path="/doctor-signup"
              element={<DoctorSignup />}
            />
            <Route
              path="/pharmacist-signup"
              element={<PharmacistSignup />}
            />
            <Route
              path="/patient-signup"
              element={<PatientSignup />}
            />
            <Route
              path="/admin-home"
              element={<AdminHome />}
            />
            <Route
              path="/clinic-admin-home"
              element={<ClinicAdminHome />}
            />
            <Route
              path="/pharmacy-admin-home"
              element={<PharmacyAdminHome />}
            />
            <Route
              path="/admin-view-doctors"
              element={<AdminViewDoctors />}
            />
            <Route
              path="/admin-view-pharmacists"
              element={<AdminViewPharmacists />}
            />
            <Route
              path="/admin-view-medicine"
              element={<AdminViewMedicine />}
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
              path="/admin-view-approval-pharmacists"
              element={<AdminViewApprovalPharmacists />}
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
              path="/doctor-view-healthRecords"
              element={<DoctorViewHealthRecords />}
            />
            <Route
              path="/doctor-view-prescriptions"
              element={<DoctorViewPrescriptions />}
            />
            <Route
              path="/doctor-view-patients"
              element={<DoctorViewPatients />}
            />
            <Route
              path="/doctor-view-wallet"
              element={<DoctorViewWallet />}
            />
            <Route
              path="/doctor-change-password"
              element={<DoctorChangePassword />}
            />
            <Route
              path="/doctor-add-availableTime"
              element={<DoctorAddAvailableTime />}
            />
            <Route
              path="/doctor-schedule-followUp"
              element={<DoctorScheduleFollowUp/>}
            />
            <Route
              path="/doctor-healthrecord-form"
              element={<DoctorHealthRecordForm/>}
            />
            <Route
              path="/prescription-form"
              element={<PrescriptionForm/>}
            />
            <Route
              path="/pharmacist-home"
              element={<PharmacistHome/>}
            />
            <Route
              path="/pharmacist-home"
              element={<PharmacistHome/>}
            />
            <Route
              path="/not-approved-pharmacist"
              element={<NonApprovedPharmacist/>}
            />
            <Route
              path="/pharmacist-view-medicine"
              element={<PharmacistViewMedicine/>}
            />
            <Route
              path="/medicine-form"
              element={<MedicineForm/>}
            />
            <Route
              path="/pharmacist-change-password"
              element={<PharmacistChangePassword/>}
            />
            <Route
              path="/patient-home"
              element={<PatientHome />}
            />
            <Route
              path="/clinic-patient-home"
              element={<ClinicPatientHome />}
            />
            <Route
              path="/pharmacy-patient-home"
              element={<PharmacyPatientHome />}
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
              path="/patient-view-wallet"
              element={<PatientViewWallet />}
            />
            <Route
              path="patient-subscribed-healthPackage"
              element={<PatientSubscribedHealthPackage />}
            />
            <Route
              path="/patient-view-wallet"
              element={<PatientViewWallet />}
            />
            <Route
              path="/patient-healthrecord-form"
              element={<PatientHealthRecordForm />}
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
            <Route
              path="/patient-view-healthRecords"
              element={<PatientViewHealthRecords />}
            />
  
            <Route
              path="/patient-view-medicine"
              element={<PatientViewMedicine/>}
            />
            <Route
              path="/checkout"
              element={<PatientCheckout/>}
            />
            <Route
              path="/orders"
              element={<PatientViewOrders/>}
            />
             <Route
              path="/chat"
              element={<ChatComponent/>}
            />
             <Route
              path='/chat/:roomId'
              element={<ChatPage/>}
            />
            <Route
              path="/view-my-doctors"
              element={<ViewMyDoctors/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
