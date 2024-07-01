const { Comment, Todo, User } = require("../models");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: Todo,
          as: "todo", 
          attributes: ["id", "title", "description", "status", "dueDate"], 
        },
        {
          model: User,
          as: "user", 
          attributes: ["id", "name", "email", "password"], 
        },
      ],
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getOneComment = async (req, res) => {
  const id = req.params.id;
  console.log("Request params:", req.params);

  try {
    console.log(`Finding category with ID: ${id}`);
    const comment = await Comment.findByPk(id);

    if (!comment) {
      console.log(`Category with ID: ${id} not found`);
      return res.status(404).json({ message: "Comment not found" });
    }

    console.log(`Comment found: ${JSON.stringify(comment, null, 2)}`);
    return res.status(200).json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createComment = async (req, res) => {
  const { text, todoId } = req.body;
  try {
    const comment = await Comment.create({ text, todoId, userId: req.user.userId });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

const updateComment = async (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    await comment.update({ text });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update comment" });
  }
};

const deleteComment = async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    await comment.destroy();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

module.exports = {
  getComments,
  getOneComment,
  createComment,
  updateComment,
  deleteComment,
};