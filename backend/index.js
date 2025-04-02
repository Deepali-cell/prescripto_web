import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import adminRouter from "./routes/adminRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import UserRouter from "./routes/userRouter.js";


// app config
const port = process.env.PORT || 3000;
const app = express();
connectDB();

// middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/admin" , adminRouter);
app.use("/api/doctor" , doctorRouter);
app.use("/api/user" , UserRouter);


app.get("/" , (req,res)=>{
  res.send("welcome to backend");
})

app.listen(port , (req,res)=>{
  console.log("server is working");
})
