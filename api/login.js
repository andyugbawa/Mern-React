const express = require("express");
const serverless = require("serverless-http");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const UserModel = require("../../server/models/User");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["https://mern-react-eta.vercel.app", "http://localhost:5173"],
  credentials: true
}));

// Login route
app.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "No Record Existed" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Password is not Correct" });

    const token = jwt.sign({ email: user.email, role: user.role || "user" }, process.env.JWT_SECRET, { expiresIn: "1d" });

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

module.exports = serverless(app);