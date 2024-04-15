const Appointment = require("../models/Appointment");

// Controller to get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    // Find all appointments and populate the 'patient' field with actual data
    const appointments = await Appointment.find().populate("patient");
    res.json(appointments); // Send the appointments as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // If an error occurs, send 500 status with error message
  }
};

// Controller to add a new appointment
exports.addAppointment = async (req, res) => {
  // Create a new appointment instance with data from request body and current user ID
  const appointment = new Appointment({
    dateTime: req.body.dateTime,
    reason: req.body.reason,
    doctor: "Dr. Jones",
    patient: req.body.patient,
  });

  try {
    // Save the new appointment
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment); // Send 201 status with the newly created appointment
  } catch (error) {
    res.status(400).json({ message: error.message }); // If an error occurs, send 400 status with error message
  }
};

// Controller to update an existing appointment
exports.updateAppointment = async (req, res) => {
  try {
    // Find the appointment by ID
    const appointment = await Appointment.findById(req.params._id);
    if (appointment == null) {
      return res.status(404).json({ message: "Appointment not found" }); // If appointment not found, send 404 status with message
    }

    // Update appointment fields if provided in request body
    if (req.body.dateTime != null) {
      appointment.dateTime = req.body.dateTime;
    }
    if (req.body.reason != null) {
      appointment.reason = req.body.reason;
    }
    if (req.body.patient != null) {
      appointment.patient = req.body.patient;
    }

    // Save the updated appointment
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment); // Send the updated appointment as JSON response
  } catch (error) {
    res.status(400).json({ message: error.message }); // If an error occurs, send 400 status with error message
  }
};

// Controller to delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    // Find the appointment by ID
    const appointment = await Appointment.findById(req.params.id);
    if (appointment == null) {
      return res.status(404).json({ message: "Appointment not found" }); // If appointment not found, send 404 status with message
    }

    // Remove the appointment
    await appointment.deleteOne();
    res.json({ message: "Appointment deleted" }); // Send success message as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // If an error occurs, send 500 status with error message
  }
};
