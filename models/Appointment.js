// Importing mongoose for database schema creation
const mongoose = require("mongoose");

// Defining appointment schema using mongoose.Schema
const appointmentSchema = new mongoose.Schema({
  // dateTime field representing the date and time of the appointment
  dateTime: {
    type: Date, // Data type is Date
    required: true, // Field is required
  },
  // reason field representing the reason for the appointment
  reason: {
    type: String, // Data type is String
    required: true, // Field is required
  },
  // patient field representing the name of the patient
  patient: {
    type: String, // Data type is String
    required: true, // Field is required
  },
});

// Creating Appointment model using the appointmentSchema
const Appointment = mongoose.model("Appointment", appointmentSchema);

// Exporting the Appointment model for use in other modules
module.exports = Appointment;
