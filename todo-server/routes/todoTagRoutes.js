const express = require("express");
const {
  getTagsByTodo,
  addTagsToTodo,
  removeTagFromTodo,
} = require("../controllers/todoTagController");
const authenticateUser = require("../middlewares/authenticate");

const router = express.Router();

router.get("/todos/:todoId/tags", authenticateUser, getTagsByTodo);
router.post("/todos/:todoId/tags/:tagId", authenticateUser, addTagsToTodo);
router.delete(
  "/todos/:todoId/tags/:tagId",
  authenticateUser,
  removeTagFromTodo
);

module.exports = router;
