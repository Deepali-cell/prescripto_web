import express from "express";
import {
  addDoctor,
  adminLogin,
  allappointments,
  alldoctors,
  cancelAppointment,
  dashboardData,
} from "../controllers/adminController.js";
import { authAdmin } from "../middleware/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";
import upload from "../middleware/multer.js";

const adminRouter = express.Router();

adminRouter.post("/doctors", upload.single("image"), authAdmin, addDoctor);
adminRouter.post("/login", adminLogin);
adminRouter.post("/alldoctors", authAdmin, alldoctors);
adminRouter.post("/changeAvailability", authAdmin, changeAvailability);
adminRouter.get("/allappointments", authAdmin, allappointments);
adminRouter.post("/cancelappointment", authAdmin, cancelAppointment);
adminRouter.get("/dashboard", authAdmin, dashboardData);
export default adminRouter;
