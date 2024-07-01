const express = require("express");
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const authenticateUser = require("../middlewares/authenticate");

const router = express.Router();

router.get("/categories", authenticateUser, getCategories);
router.get("/categories/:id", authenticateUser, getCategoryById);
router.post("/categories", authenticateUser, createCategory);
router.put("/categories/:id", authenticateUser, updateCategory);
router.delete("/categories/:id", authenticateUser, deleteCategory);

module.exports = router;
