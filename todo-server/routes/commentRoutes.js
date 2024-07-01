const express = require("express");
const {
  getComments,
  getOneComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const authenticateUser = require("../middlewares/authenticate");

const router = express.Router();

router.get("/comments", authenticateUser, getComments);
router.get("/comments/:id", authenticateUser, getOneComment);
router.post("/comments", authenticateUser, createComment);
router.put("/comments/:id", authenticateUser, updateComment);
router.delete("/comments/:id", authenticateUser, deleteComment);

module.exports = router;
