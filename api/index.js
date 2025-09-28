import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Serve React static files
app.use(express.static(path.join(__dirname, "client/dist")));

// Catch-all for React routes (must be after API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, message, statusCode });
});

// DB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DATABASE connected!"))
  .catch((err) => console.log(err));

app.listen(3000, () => console.log("Server running on port 3000"));
