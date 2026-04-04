const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const serverless = require("serverless-http");
const UserModel = require("../server/models/User");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mern-react-eta.vercel.app"
  ],
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

// Routes
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "No Record Existed" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Password is not Correct" });

    const token = jwt.sign(
      { email: user.email, role: user.role || "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    res.json({ status: "SUCCESS", role: user.role || "user" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    await UserModel.create({ name, email, password: hash, role: "user" });
    res.json({ status: "SUCCESS" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ THIS IS THE KEY FIX
module.exports = serverless(app);