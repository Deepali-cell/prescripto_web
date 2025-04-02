import validator from "validator";
import bcrypt from "bcrypt";
import doctorModal from "../models/doctorModal.js";
import jwt from "jsonwebtoken";
import appointmentModal from "../models/appointmentModal.js";
import userModal from "../models/userModal.js";

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const doctorData = {
      name,
      email,
      password: hashPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
      image,
    };

    const newDoctor = new doctorModal(doctorData);
    await newDoctor.save();

    res.status(201).json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const atoken = jwt.sign({ email }, process.env.JWT_SECRET);
      return res.json({ success: true, message: atoken });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const alldoctors = async(req,res)=>{
  try {
    const doctors = await doctorModal.find({}).select("-password");
     res.json({success:true , doctors});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const allappointments = async (req,res)=>{
try {
  const appointments = await appointmentModal.find({});

  res.json({success:true , appointments});
  
} catch (error) {
  console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
}
}

const cancelAppointment = async (req,res)=>{
  const {appointmentId} = req.body;
  try {
    const appointment = await appointmentModal.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    // Update the appointment status
    appointment.cancelled = true;
    await appointment.save();

    res.status(200).json({ message: "Appointment cancelled successfully." });
    
  } catch (error) {
    console.error('Error updating user:', error); 
    return res.status(500).json({ success: false, message: error.message });
  }
}

const dashboardData = async (req,res)=>{
  try {
    const users = await userModal.find({});
    const doctors = await doctorModal.find({});
    const appointments = await appointmentModal.find({});
  
    const dashData = {
      users : users.length,
      doctors : doctors.length,
      appointments : appointments.length,
      latestappointment : appointments.reverse().slice(0,5),
    }
    
    res.json({success : true , dashData});

    
  } catch (error) {
    console.error('Error updating user:', error); 
    return res.status(500).json({ success: false, message: error.message });
  }
}

export { addDoctor, adminLogin , alldoctors , allappointments , cancelAppointment , dashboardData};
