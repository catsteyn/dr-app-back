const mongoose = require("mongoose");
const User = require("./User");

mongoose
  .connect(
    "mongodb+srv://catsteyn:Theresa%4021@myfirstcluster.gtqbro4.mongodb.net/dr_appointment_app",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    const doctorJones = new User({
      username: "drjones",
      password: "drjones",
      role: "admin",
    });

    const doctorSmith = new User({
      username: "drsmith",
      password: "drsmith",
      role: "admin",
    });

    const doctorApple = new User({
      username: "drapple",
      password: "drapple",
      role: "admin",
    });

    return Promise.all([
      doctorJones.save(),
      doctorSmith.save(),
      doctorApple.save(),
    ]);
  })
  .then((result) => {
    console.log("Doctors added successfully:", result);
  })
  .catch((error) => {
    console.error("Error adding doctors:", error);
  });
