// Import required libraries and models
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

// Generate secret key and set salt rounds
const secretKey = crypto.randomBytes(64).toString("hex");
const saltRounds = 10;
const jwtSecret = secretKey;

// Function to generate token and respond
const generateTokenAndRespond = async (res, user) => {
  try {
    // Check user validity
    if (!user || typeof user !== "object") {
      throw new Error("Invalid user");
    }
    // Sign JWT token with user ID and secret key
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1d" });
    // Omit password from user data
    const { password, ...rest } = user;
    // Set token as HTTP-only cookie and send user data as JSON response
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      })
      .json(rest);
  } catch (error) {
    console.error(error);
    // Send server error response if an error occurs
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Signup controller
const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    // Hash password
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });
    // Save user to database
    await newUser.save();
    // Send success response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    // Send server error response if an error occurs
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login controller
const login = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    // Check for admin user
    if (identifier === "drjones" && password === "drjones") {
      // Generate token and respond for admin user
      const adminUser = {
        email: "drjones@drapp.com",
        name: "Dr. Jones",
      };
      await generateTokenAndRespond(res, adminUser);
      return;
    }

    // Find user by email or username
    let user = await User.findOne({ email: identifier });
    if (!user) {
      user = await User.findOne({ username: identifier });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or username" });
      }
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // Generate token and respond for authenticated user
    await generateTokenAndRespond(res, user);
  } catch (error) {
    console.error(error);
    // Send server error response if an error occurs
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Google OAuth controller
const google = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    // Find user by email
    let user = await User.findOne({ email });
    // If user does not exist, create new user
    if (!user) {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, saltRounds);
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
      });
      user = await newUser.save();
      await generateTokenAndRespond(res, user);
    } else {
      // If user exists, generate token and respond
      await generateTokenAndRespond(res, user);
    }
  } catch (error) {
    next(error);
  }
};

// Facebook OAuth controller
const facebook = async (req, res, next) => {
  const { email, facebookPhotoUrl } = req.body;
  try {
    // Find user by email
    let user = await User.findOne({ email });
    // If user does not exist, create new user
    if (!user) {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, saltRounds);
      const newUser = new User({
        email,
        profilePicture: facebookPhotoUrl,
        password: hashedPassword,
      });
      user = await newUser.save();
      await generateTokenAndRespond(res, user);
    } else {
      // If user exists, generate token and respond
      await generateTokenAndRespond(res, user);
    }
  } catch (error) {
    next(error);
  }
};

// Export controllers
module.exports = { signup, login, google, facebook };
