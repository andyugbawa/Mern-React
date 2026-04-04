const express = require("express");
const serverless = require("serverless-http");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("../server/models/User");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["https://mern-react-eta.vercel.app", "http://localhost:5173"],
  credentials: true
}));

// MongoDB connection
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB Connected");
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Register route
app.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await UserModel.create({ name, email, password: hash, role: "user" });
    res.json({ status: "SUCCESS" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = serverless(app);