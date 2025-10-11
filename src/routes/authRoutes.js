const express = require("express");
const {
  register,
  login,
  getProfile,
  updateProfile,
} = require("../controllers/authController");
const { validate, schemas } = require("../middleware/validationMiddleware");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", validate(schemas.register), register);
router.post("/login", validate(schemas.login), login);
router.get("/profile", authenticateToken, getProfile);
router.put(
  "/profile",
  authenticateToken,
  validate(schemas.updateUser),
  updateProfile
);

module.exports = router;
