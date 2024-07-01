const express = require("express");
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const authenticateUser = require("../middlewares/authenticate");

const router = express.Router();

router.get("/todos", authenticateUser, getAllTodos);
router.get("/todos/:id", authenticateUser, getTodoById);
router.post("/todos", authenticateUser, createTodo);
router.put("/todos/:id", authenticateUser, updateTodo);
router.delete("/todos/:id", authenticateUser, deleteTodo);

module.exports = router;
