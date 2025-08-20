import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import adminRouter from "./routes/adminRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import UserRouter from "./routes/userRouter.js";
import path from "path";

// app config
const port = process.env.PORT || 3000;
const app = express();
connectDB();

const __dirname = path.resolve();

// middleware
app.use(express.json());
const coreOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"], // frontend apps
  credentials: true,
};
app.use(cors(coreOptions));

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", UserRouter);

// Serve main frontend
app.use(express.static(path.join(__dirname, "frontend/dist")));
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
app.get("/user/*", (_, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Serve admin panel frontend
app.use("/admin", express.static(path.join(__dirname, "admin-panel/dist")));
app.get("/admin/*", (_, res) => {
  res.sendFile(path.join(__dirname, "admin-panel", "dist", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
