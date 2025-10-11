const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, authorizeRole(["admin"]), getAllUsers);
router.get("/:id", authenticateToken, authorizeRole(["admin"]), getUserById);
router.put("/:id", authenticateToken, authorizeRole(["admin"]), updateUser);
router.delete("/:id", authenticateToken, authorizeRole(["admin"]), deleteUser);

module.exports = router;
