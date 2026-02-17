import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Doctors } from "./pages/Doctors";
import { About } from "./pages/About";
import { RegisterPage } from "./pages/RegisterPage";
import { Profile } from "./pages/Profile";
import { Appointment } from "./pages/Appointment";
import { Contact } from "./pages/Contact";
import { MyAppointment } from "./pages/MyAppointment";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PublicRoute } from "./protection/PublicRoute";
import { ProtectedRoute } from "./protection/ProtectedRoute";

export default function App() {
  return (
    <>
      <div className="no-scrollbar overflow-y-auto">
        <ToastContainer />
        <Routes>
          {/* Always accessible */}
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {/* Public only if not logged in */}
           <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          /> 
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointment/:docId"
            element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myappointment"
            element={
              <ProtectedRoute>
                <MyAppointment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}
