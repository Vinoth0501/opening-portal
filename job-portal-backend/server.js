const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://job-portal-02.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

console.log("🔄 Starting Server...");
console.log("🔄 MongoDB URI:", process.env.MONGO_URI ? "Loaded" : "NOT LOADED");

console.log("🔄 Setting up routes...");

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

console.log("🔄 Attempting to connect to MongoDB...");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
