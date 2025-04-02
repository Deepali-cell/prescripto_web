import doctorModal from "../models/doctorModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModal from "../models/appointmentModal.js";

const changeAvailability = async (req,res) =>{
try {

  const {docId} = req.body;
  const docData = await doctorModal.findById(docId);
  await doctorModal.findByIdAndUpdate(docId , {available : !docData.available});
  res.json({success:true , message : "Availablitity changed"});
  
} catch (error) {
  console.log(error);
  res.json({success:false , message : error.message});

}
}

const doctorslist = async (req,res)=>{
  try {
    const doctors = await doctorModal.find({}).select(["-password" , "-email"])
     res.json({success:true , doctors});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
const logindoctor = async (req,res) =>{
  try {
    const {email , password} = req.body;
    const doctor = await doctorModal.findOne({email});

    if(!doctor){
    return res.json({success : false , message : "doctor doen't exsist"});
    }

    const isMatch = await bcrypt.compare(password , doctor.password);

    if(isMatch){
    const doctortoken = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
    res.status(201).json({ success: true, doctortoken });
    }else{
    return res.json({success : false , message : "Invalid credentials"});
    }
  
  } catch (error) {
    console.log(error);
    return res.json({success : false , message : error.message});
  }
  }

  const appointmentsDoctor = async (req,res)=>{
    try {
      const doctorId = req.doctorId;
      const appointments = await appointmentModal.find({docId : doctorId});
      res.json({success : true , appointments});
    } catch (error) {
      console.log(error);
      return res.json({success : false , message : error.message});
    }
  }

  const completeAppointment = async (req,res)=>{
    try {
      const {appointmentId} = req.body;
      const doctorId = req.doctorId;
      const appointment = await appointmentModal.findById(appointmentId);
      console.log(appointmentId , + " " + doctorId);

      if(appointment && appointment.docId === doctorId){
        await appointmentModal.findByIdAndUpdate(appointmentId , {isCompleted : true});
        res.json({success : true , message : "Appointment completed successfully"});
      }else{
        res.json({success : false , message : "Mark failed"});
      }
    } catch (error) {
      console.log(error);
      return res.json({success : false , message : error.message});
    }
  }

  const cancelAppointment = async (req,res)=>{
    try {
      const {appointmentId } = req.body;
      const doctorId = req.doctorId;
      const appointment = await appointmentModal.findById(appointmentId);
      console.log(appointmentId , + " " + doctorId);

      if(appointment && appointment.docId === doctorId){
        await appointmentModal.findByIdAndUpdate(appointmentId , {cancelled : true});
        res.json({success : true , message : "Appointment cancelled successfully"});
      }else{
        res.json({success : false , message : "cancellation failed"});
      }
    } catch (error) {
      console.log(error);
      return res.json({success : false , message : error.message});
    }
  }

  const doctordashboardData = async (req,res)=>{
    try {
      const doctorId = req.doctorId; 
      const appointments = await appointmentModal.find({docId : doctorId});
      let earning = 0;
      appointments.map((item)=>{
        if(item.cancelled || item.isCompleted){
          earning += item.amount;
        }
      })
      let patients = [];
      appointments.map((item)=>{
       if(!patients.includes(item.userId)){
        patients.push(item.userId);
       }
      })
      const dashData = {
        earning,
        appointments : appointments.length,
        patients : patients.length,
        latestappointments : appointments
      }
      res.json({success:true , dashData});
    } catch (error) {
      console.log(error);
      return res.json({success : false , message : error.message});
    }
  }

  const getProfile = async (req, res) => {
    try {
      const doctorId = req.doctorId; 
      const doctorData = await doctorModal.findById(doctorId).select("-password");
      if (!doctorData) {
        return res.status(404).json({ success: false, message: "doctor not found." });
      }
      res.status(200).json({ success: true, doctorData });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  const updateProfile = async (req, res) => {
    try {
      const {available, fees , address } = req.body;
      const doctorId = req.doctorId;
      if (!fees || !available ||   !address || typeof address !== 'object') {
        return res.status(400).json({ success: false, message: "Missing detail" });
      }
      const { line1, line2 } = address;
      if (!line1 || !line2) {
        return res.status(400).json({ success: false, message: "Address must include line1 and line2" });
      }
      const updateDoctor = await doctorModal.findByIdAndUpdate(
        doctorId,
        { available , fees ,  address: { line1, line2 } },
        { new: true } 
      );
  
      if (!updateDoctor) {
        return res.status(404).json({ success: false, message: "Doctor not found" });
      }
      return res.status(200).json({ success: true, message: "Doctor updated successfully", doctorData: updateDoctor});
  
    } catch (error) {
      console.error('Error updating doctor:', error); 
      return res.status(500).json({ success: false, message: error.message });
    }
  };

export {changeAvailability , doctorslist , logindoctor , appointmentsDoctor , cancelAppointment , completeAppointment , doctordashboardData , getProfile , updateProfile};