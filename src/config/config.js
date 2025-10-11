require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || "default-secret-key",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  },
  environment: process.env.NODE_ENV || "development",
};
