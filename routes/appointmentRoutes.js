// Import the express module to create the router
const express = require("express");
const router = express.Router(); // Create a new router using express.Router()
const {
  // Import the controller functions for handling appointment routes
  getAllAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController"); // Import controller functions

// Define routes for handling different appointment operations
router.get("/appointments", getAllAppointments); // Route for getting all appointments
router.post("/appointments", addAppointment); // Route for adding a new appointment
router.patch("/appointments/:id", updateAppointment); // Route for updating an appointment
router.delete("/appointments/:id", deleteAppointment); // Route for deleting an appointment

module.exports = router; // Export the router to use in other modules
