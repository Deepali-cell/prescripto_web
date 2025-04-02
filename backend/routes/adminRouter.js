import express from "express";
import { addDoctor, adminLogin, allappointments, alldoctors, cancelAppointment, dashboardData } from "../controllers/adminController.js";
import { authAdmin } from "../middleware/authAdmin.js";
import multer from 'multer';
import path from 'path';
import { changeAvailability } from "../controllers/doctorController.js";

// Configure Multer storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append file extension
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Please upload an image with valid format (JPEG, PNG, GIF).'));
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5 MB
});

const adminRouter = express.Router();

adminRouter.post("/doctors", upload.single('image'), authAdmin, addDoctor);
adminRouter.post("/login", adminLogin);
adminRouter.post("/alldoctors" , authAdmin , alldoctors);
adminRouter.post("/changeAvailability" , authAdmin , changeAvailability);
adminRouter.get("/allappointments" , authAdmin , allappointments);
adminRouter.post("/cancelappointment" , authAdmin , cancelAppointment);
adminRouter.get("/dashboard" , authAdmin , dashboardData);
export default adminRouter;
