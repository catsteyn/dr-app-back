// Import the express module to create the router
const express = require("express");
const router = express.Router(); // Create a new router using express.Router()
const {
  // Import the controller functions for handling authentication routes
  signup,
  login,
  google,
  facebook,
} = require("../controllers/authController"); // Import controller functions

// Define routes for handling different authentication operations
router.post("/login", login); // Route for user login
router.post("/signup", signup); // Route for user signup
router.post("/google", google); // Route for Google authentication
router.post("/facebook", facebook); // Route for Facebook authentication

module.exports = router; // Export the router to use in other modules
