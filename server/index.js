// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/User"); // Make sure this path is correct

const app = express();
app.use(express.json());
app.use(cookieParser());

// ----- CORS Setup -----
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173"
];

app.use(cors({
  origin: function(origin, callback){
    // Allow requests from server (e.g., Postman) or allowedOrigins
    if(!origin) return callback(null, true); 
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = "CORS blocked: " + origin;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST"],
  credentials: true
}));

// ----- Connect to MongoDB -----
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ----- Routes -----
// Register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    await UserModel.create({ name, email, password: hash });
    res.json({ status: "SUCCESS" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
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

    // Send token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,       // true for HTTPS
      sameSite: "none"    // allow cross-site cookie
    });

    res.json({ status: "SUCCESS", role: user.role || "user" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ----- Start server -----
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));