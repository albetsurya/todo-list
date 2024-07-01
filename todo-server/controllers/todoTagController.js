const { Todo, Tag, TodoTag } = require("../models");

const getTagsByTodo = async (req, res) => {
  const todoId = req.params.todoId;

  try {
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const tags = await todo.getTags();
    res.status(200).json(tags);
  } catch (err) {
    console.error("Error fetching tags for todo:", err);
    res.status(500).json({ message: "Failed to fetch tags" });
  }
};

const addTagsToTodo = async (req, res) => {
  const todoId = req.params.todoId;
  const tagId = req.params.tagId;

  try {
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    await todo.addTag(tag);
    res.status(200).json({ message: "Tag added to todo successfully" });
  } catch (err) {
    console.error("Error adding tag to todo:", err);
    res.status(500).json({ message: "Failed to add tag to todo" });
  }
};

const removeTagFromTodo = async (req, res) => {
  const todoId = req.params.todoId;
  const tagId = req.params.tagId;

  try {
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    await todo.removeTag(tag);
    res.status(200).json({ message: "Tag removed from todo successfully" });
  } catch (err) {
    console.error("Error removing tag from todo:", err);
    res.status(500).json({ message: "Failed to remove tag from todo" });
  }
};

module.exports = {
  getTagsByTodo,
  addTagsToTodo,
  removeTagFromTodo,
};
