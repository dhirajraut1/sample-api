const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authenticateToken, authorizeRole(["admin"]), createProduct);
router.put("/:id", authenticateToken, authorizeRole(["admin"]), updateProduct);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  deleteProduct
);

module.exports = router;
