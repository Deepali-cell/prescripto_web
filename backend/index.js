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

const corsOptions = {
  origin: [
    "http://localhost:5173", // dev frontend
    "http://localhost:5174", // dev admin
    "https://prescripto-web-admin-panel.onrender.com",
    "https://prescripto-web-frontend.onrender.com",
  ],
  credentials: true,
};
app.use(cors(corsOptions));



app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", UserRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
