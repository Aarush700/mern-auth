import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DATABASE connected!"))
  .catch((err) => console.log(err));

const __dirname = path.resolve();
const app = express();

// Parse JSON and cookies first
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Serve React static files
app.use(express.static(path.join(__dirname, "/client/dist")));

// Catch-all for React routing (must be last)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, message, statusCode });
});

app.listen(3000, () => console.log("Server is listening on port 3000."));
