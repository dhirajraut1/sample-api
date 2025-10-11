const express = require("express");
const {
  createOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middleware/authMiddleware");
const { validate, schemas } = require("../middleware/validationMiddleware");

const router = express.Router();

router.post("/", authenticateToken, validate(schemas.createOrder), createOrder);
router.get("/", authenticateToken, authorizeRole(["admin"]), getAllOrders);
router.get("/my-orders", authenticateToken, getUserOrders);
router.get("/:id", authenticateToken, getOrderById);
router.patch(
  "/:id/status",
  authenticateToken,
  authorizeRole(["admin"]),
  updateOrderStatus
);

module.exports = router;
