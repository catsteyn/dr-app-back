// Import necessary modules
const mongoose = require("mongoose"); // Mongoose for MongoDB object modeling
const bcrypt = require("bcrypt"); // bcrypt for password hashing

// Define the user schema using mongoose.Schema
const userSchema = new mongoose.Schema({
  // Name of the user
  name: {
    type: String, // Data type is String
    required: true, // Field is required
  },
  // Email of the user
  email: {
    type: String, // Data type is String
    required: true, // Field is required
    unique: true, // Email should be unique
  },
  // Password of the user
  password: {
    type: String, // Data type is String
    required: true, // Field is required
  },
  // Role of the user, default value is "client"
  role: {
    type: String, // Data type is String
    default: "client", // Default value is "client"
  },
});

// Define a method to compare passwords
userSchema.methods.isValidPassword = async function (password) {
  try {
    // Use bcrypt to compare the provided password with the hashed password stored in the database
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Create a User model based on the schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other modules
module.exports = User;
