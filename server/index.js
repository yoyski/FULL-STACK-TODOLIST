import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Mongodb connected");
    app.listen(PORT, () => {
      console.log("🚀 Server is running on port " + PORT);
    });
  }) // right now the ip address in atlas is 0.0.0.0/0  for testing, but this is not recommended for production environments.

  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
