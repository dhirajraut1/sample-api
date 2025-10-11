// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);

    // Ensure userId is a valid MongoDB ObjectId (optional but safer)
    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password"); // exclude password

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach user to request
    req.user = user; // Mongoose doc — has .id virtual
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

const authorizeRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole,
};
