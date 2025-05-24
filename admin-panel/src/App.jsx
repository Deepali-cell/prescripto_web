import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import { Navbar } from "./componenets/Navbar";
import { Sidebar } from "./componenets/Sidebar";
import { Login } from "./pages/Login";

// Admin Pages
import { Dashboard } from "./pages/Admin/Dashboard";
import { AllAppointment } from "./pages/Admin/AllAppointment";
import { AddDoctors } from "./pages/Admin/AddDoctors";
import { DoctorsList } from "./pages/Admin/DoctorsList";

// Doctor Pages
import { DoctorProfile } from "./pages/Doctor/DoctorProfile";
import { DoctorAppointment } from "./pages/Doctor/DoctorAppointment";
import { DoctorDashboard } from "./pages/Doctor/DoctorDashboard";
import { ProtectedAdminRoute } from "../protection/ProtectedAdminRoute";
import { ProtectedDoctorRoute } from "../protection/ProtectedDoctorRoute";
import { PublicRoute } from "../protection/PublicRoute";
import { DoctorContext } from "./context/DoctorContext";
import { AdminContext } from "./context/AdminContext";

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { doctortoken } = useContext(DoctorContext);
  const isLoggedIn = atoken || doctortoken;

  return (
    <>
      <ToastContainer />
      {isLoggedIn && (
        <>
          <Navbar />
          <div className="flex items-start">
            <Sidebar />
            <div className="w-full">
              <Routes>
                {/* Admin Protected Routes */}
                <Route
                  path="/admin/admindashboard"
                  element={
                    <ProtectedAdminRoute>
                      <Dashboard />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/adminallappointments"
                  element={
                    <ProtectedAdminRoute>
                      <AllAppointment />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/adminadddoctors"
                  element={
                    <ProtectedAdminRoute>
                      <AddDoctors />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/admindoctorslist"
                  element={
                    <ProtectedAdminRoute>
                      <DoctorsList />
                    </ProtectedAdminRoute>
                  }
                />

                {/* Doctor Protected Routes */}
                <Route
                  path="/admin/doctorprofile"
                  element={
                    <ProtectedDoctorRoute>
                      <DoctorProfile />
                    </ProtectedDoctorRoute>
                  }
                />
                <Route
                  path="/admin/doctorappointments"
                  element={
                    <ProtectedDoctorRoute>
                      <DoctorAppointment />
                    </ProtectedDoctorRoute>
                  }
                />
                <Route
                  path="/admin/doctordashboard"
                  element={
                    <ProtectedDoctorRoute>
                      <DoctorDashboard />
                    </ProtectedDoctorRoute>
                  }
                />

                {/* Default redirection */}
                <Route
                  path="/admin"
                  element={
                    atoken ? (
                      <Navigate to="/admin/admindashboard" />
                    ) : doctortoken ? (
                      <Navigate to="/admin/doctordashboard" />
                    ) : (
                      <Navigate to="/admin/login" />
                    )
                  }
                />
              </Routes>
            </div>
          </div>
        </>
      )}

      {!isLoggedIn && (
        <Routes>
          <Route
            path="/admin/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="*" element={<Navigate to="/admin/login" />} />
        </Routes>
      )}
    </>
  );
};

export default App;
