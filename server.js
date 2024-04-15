const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // Import bodyParser module
const passport = require("passport"); // Require Passport
const session = require("express-session"); // Require express-session
const appointmentRoutes = require("./routes/appointmentRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;

// Middleware to ignore requests for favicon
app.use((req, res, next) => {
  if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
    return res.sendStatus(204);
  }
  return next();
});

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://catsteyn:Theresa%4021@myfirstcluster.gtqbro4.mongodb.net/dr_appointment_app",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  session({
    secret: "your_secret_session_key",
    resave: false,
    saveUninitialized: false,
  })
); // Configure express-session

// Initialise Passport middleware
app.use(passport.initialize()); // Initialise Passport
app.use(passport.session()); // Configure Passport to use session management

// Define API routes
app.use("/api", appointmentRoutes);
app.use("/api/auth", authRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Define a route handler for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the appointment app"); // Example response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
