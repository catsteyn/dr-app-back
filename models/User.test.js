// Import necessary modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./User"); // replace with the path to your User model

// Test the User model
describe("User model", () => {
  it("should not save a user without email field", async () => {
    let user = new User({
      name: "John Doe",
      password: "password",
      role: "client",
    });

    try {
      const savedUserWithoutEmail = await user.save();
      error = savedUserWithoutEmail;
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.errors.email).toBeDefined();
    }
  });
});
