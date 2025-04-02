import { useContext } from "react";
import { Login } from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import { Navbar } from "./componenets/Navbar";
import { Sidebar } from "./componenets/Sidebar";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Admin/Dashboard";
import { AllAppointment } from "./pages/Admin/AllAppointment";
import { AddDoctors } from "./pages/Admin/AddDoctors";
import { DoctorsList } from "./pages/Admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import { DoctorProfile } from "./pages/Doctor/DoctorProfile";
import { DoctorAppointment } from "./pages/Doctor/DoctorAppointment";
import { DoctorDashboard } from "./pages/Doctor/DoctorDashboard";
const App = () => {
  const { atoken } = useContext(AdminContext);
  const { doctortoken } = useContext(DoctorContext);
  return atoken || doctortoken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />

        <Routes>
          <Route path="/" element={<></>}></Route>
          <Route path="/admindashboard" element={<Dashboard />}></Route>
          <Route
            path="/adminallappointments"
            element={<AllAppointment />}
          ></Route>
          <Route path="/adminadddoctors" element={<AddDoctors />}></Route>
          <Route path="/admindoctorslist" element={<DoctorsList />}></Route>
          <Route path="/doctorprofile" element={<DoctorProfile />}></Route>
          <Route
            path="/doctorappointments"
            element={<DoctorAppointment />}
          ></Route>
          <Route path="/doctordashboard" element={<DoctorDashboard />}></Route>
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
