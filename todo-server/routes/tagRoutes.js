const express = require("express");
const {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} = require("../controllers/tagController");
const authenticateUser = require("../middlewares/authenticate");

const router = express.Router();

router.get("/tags", authenticateUser, getTags);
router.post("/tags", authenticateUser, createTag);
router.put("/tags/:id", authenticateUser, updateTag);
router.delete("/tags/:id", authenticateUser, deleteTag);

module.exports = router;
