// Import required library
const jwt = require("jsonwebtoken");

// Get JWT secret key from environment variables
const jwtSecret = process.env.JWT_SECRET;

// Middleware function to authenticate JWT token
const authenticateMiddleware = (req, res, next) => {
  // Extract token from request headers
  const token = req.headers.authorization;
  // Check if token is provided
  if (!token) {
    // Send error response if token is not provided
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    // Attach decoded user information to request object
    req.user = decoded;
    // Call next middleware function
    next();
  } catch (error) {
    // Send error response if token is invalid
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Export middleware function
module.exports = authenticateMiddleware;
