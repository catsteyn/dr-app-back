// Error handling middleware function
const errorMiddleware = (err, req, res, next) => {
  // Log the error stack to the console
  console.error(err.stack);
  // Send internal server error response with status code 500
  res.status(500).json({ message: "Internal Server Error" });
};

// Export error middleware function
module.exports = errorMiddleware;
