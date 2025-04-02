import validator from "validator";
import bcrypt from "bcrypt";
import userModal from "../models/userModal.js";
import jwt from "jsonwebtoken";
import doctorModal from "../models/doctorModal.js";
import appointmentModal from "../models/appointmentModal.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already in use." });
    }


    if (!name || !email || !password) {
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

    const userData = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new userModal(userData);
    const user = await newUser.save();

    const usertoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ success: true, usertoken });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const loginUser = async (req,res) =>{
  try {
    const {email , password} = req.body;
    const user = await userModal.findOne({email});

    if(!user){
    return res.json({success : false , message : "user doen't exsist"});
    }

    const isMatch = await bcrypt.compare(password , user.password);

    if(isMatch){
    const usertoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ success: true, usertoken });
    }else{
    return res.json({success : false , message : "Invalid credentials"});
    }
  
  } catch (error) {
    console.log(error);
    return res.json({success : false , message : error.message});
  }
  }

const getProfile = async (req, res) => {
  try {
    const userData = await userModal.findById(req.userId).select("-password");
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, userData });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name,email, gender, dob, address, phone } = req.body;
    const userId = req.userId;
    if ( !name || !email ||  !phone || !dob || !gender || !address || typeof address !== 'object') {
      return res.status(400).json({ success: false, message: "Missing detail" });
    }
    const { line1, line2 } = address;
    if (!line1 || !line2) {
      return res.status(400).json({ success: false, message: "Address must include line1 and line2" });
    }
    const updatedUser = await userModal.findByIdAndUpdate(
      userId,
      { name, email, gender, dob,  address: { line1, line2 } , phone },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User updated successfully", userData: updatedUser });

  } catch (error) {
    console.error('Error updating user:', error); 
    return res.status(500).json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  const { appointmentData } = req.body;

  try {
    // Validate input
    if (!appointmentData || !appointmentData.userId || !appointmentData.docId || !appointmentData.slotDate || !appointmentData.slotTime) {
      return res.status(400).json({ success: false, message: "Missing appointment details." });
    }

    // Check if the appointment already exists
    const existingAppointment = await appointmentModal.findOne({
      docId: appointmentData.docId,
      slotDate: appointmentData.slotDate,
      slotTime: appointmentData.slotTime,
      cancelled: false,
    });

    if (existingAppointment) {
      return res.status(400).json({ success: false, message: "This time slot is already booked." });
    }

    // Create a new appointment
    const newAppointment = new appointmentModal(appointmentData);
    await newAppointment.save();

    res.status(200).json({ success: true, message: "Appointment booked successfully." });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ success: false, message: "Error booking appointment." });
  }
};



const appointmentsList = async (req,res)=>{
  try {
    const userId = req.userId;
    const appointments = await appointmentModal.find({userId});
    res.json({success : true , appointments});
  } catch (error) {
    console.error('Error updating user:', error); 
    return res.status(500).json({ success: false, message: error.message });
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

export { registerUser , loginUser , getProfile , updateProfile , bookAppointment , appointmentsList , cancelAppointment};
