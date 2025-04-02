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

export default function App() {
  return (
    <>
      <div className="no-scrollbar overflow-y-auto">
        <ToastContainer />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/doctors" element={<Doctors />}></Route>
          <Route path="/doctors/:speciality" element={<Doctors />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<RegisterPage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/appointment/:docId" element={<Appointment />}></Route>
          <Route path="/myappointment" element={<MyAppointment />}></Route>
        </Routes>
      </div>
    </>
  );
}
