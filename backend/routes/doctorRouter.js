import express from "express";
import { appointmentsDoctor, cancelAppointment, completeAppointment, doctordashboardData, doctorslist, getProfile, logindoctor, updateProfile } from "../controllers/doctorController.js";
import { authDoctor } from "../middleware/authDoctor.js";
const doctorRouter = express.Router();

doctorRouter.get("/list" , doctorslist );
doctorRouter.post("/login" , logindoctor );
doctorRouter.get("/doctorappointments" ,authDoctor , appointmentsDoctor );
doctorRouter.post("/cancelappointment" ,authDoctor , cancelAppointment );
doctorRouter.post("/completedappointment" ,authDoctor , completeAppointment );
doctorRouter.get("/doctordashboard" , authDoctor , doctordashboardData);
doctorRouter.get("/getprofile" , authDoctor , getProfile);
doctorRouter.post("/updateprofile" , authDoctor , updateProfile);


export default doctorRouter;