import express from "express";
import { registerUser , loginUser, getProfile, updateProfile , bookAppointment, appointmentsList, cancelAppointment} from "../controllers/userController.js";
import { authUser } from "../middleware/authUser.js";

const UserRouter = express.Router();

UserRouter.post("/register" , registerUser );
UserRouter.post("/login" , loginUser);
UserRouter.get("/profile" , authUser , getProfile);
UserRouter.post("/update" , authUser , updateProfile);
UserRouter.post("/bookappointment" , authUser , bookAppointment);
UserRouter.get("/appointmentslist" , authUser , appointmentsList);
UserRouter.post("/cancelappointment" , authUser , cancelAppointment);




export default UserRouter;
