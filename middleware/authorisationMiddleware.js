// Middleware function to authorize user roles
const authoriseMiddleware = (req, res, next) => {
  // Check if user role is not "client"
  if (req.user.role !== "client") {
    // Send error response if user is not authorized
    return res.status(403).json({ message: "Unauthorised" });
  }
  // Call next middleware function if user is authorized
  next();
};

// Export middleware function
module.exports = authoriseMiddleware;
