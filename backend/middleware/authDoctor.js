import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const doctortoken = req.headers.authorization?.split(" ")[1];

    if (!doctortoken) {
      return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
    }
    jwt.verify(doctortoken, process.env.JWT_SECRET , (err , doctor)=>{
      req.doctorId = doctor.id; // Save user ID for use in the request
      next(); 
    });
  } catch (error) {
    console.error("Authorization error:", error.message); 
    return res.status(401).json({ success: false, message: "Unauthorized access", error: error.message });
  }
};

export { authDoctor };
