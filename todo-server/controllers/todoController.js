const { Todo, User, Category, Comment, Tag } = require("../models");


  const getAllTodos = async (req, res) => {
    try {
      const userId = req.user.userId; 
      const todos = await Todo.findAll({
        where: { userId }, 
        include: [
          { model: User, as: "user" },
          { model: Category, as: "category" },
          { model: Comment, as: "comments" },
          { model: Tag, as: "tags" },
        ],
      });
      res.status(200).json(todos);
    } catch (err) {
      console.error("Error fetching todos:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

const createTodo = async (req, res) => {
  const { title, description, status, dueDate, categoryId, tagIds, comments } =
    req.body;
  const userId = req.user.userId;
  try {
    const newTodo = await Todo.create({
      title,
      description,
      status,
      dueDate,
      userId,
      categoryId,
    });

    if (tagIds && tagIds.length > 0) {
      const tags = await Tag.findAll({ where: { id: tagIds } });
      await newTodo.setTags(tags);
    }

    if (comments && comments.length > 0) {
      await Comment.bulkCreate(
        comments.map((comment) => ({
          text: comment.text,
          todoId: newTodo.id,
        }))
      );
    }

    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).json({ message: "Failed to create todo" });
  }
};

  const getTodoById = async (req, res) => {
    const todoId = req.params.id;
    const userId = req.user.userId; 
    try {
      const todo = await Todo.findOne({
        where: { id: todoId, userId }, 
        include: [
          { model: User, as: "user" },
          { model: Category, as: "category" },
          { model: Comment, as: "comments" },
          { model: Tag, as: "tags" },
        ],
      });
      if (!todo) {
        res.status(404).json({ message: "Todo not found" });
      } else {
        res.status(200).json(todo);
      }
    } catch (err) {
      console.error("Error fetching todo:", err);
      res.status(500).json({ message: "Failed to fetch todo" });
    }
  };

const updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const { title, description, status, dueDate, categoryId, tagIds, comments } =
    req.body;
  const userId = req.user.userId;
  try {
    const todo = await Todo.findOne({
      where: { id: todoId, userId },
    });
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      todo.title = title;
      todo.description = description;
      todo.status = status;
      todo.dueDate = dueDate;
      todo.categoryId = categoryId;

      await todo.save();

      if (tagIds && tagIds.length > 0) {
        const tags = await Tag.findAll({ where: { id: tagIds } });
        await todo.setTags(tags);
      }

      if (comments && comments.length > 0) {
        await Promise.all(
          comments.map(async (comment) => {
            if (comment.id) {
              const existingComment = await Comment.findByPk(comment.id);
              if (existingComment) {
                existingComment.text = comment.text;
                await existingComment.save();
              }
            } else {
              await Comment.create({
                text: comment.text,
                todoId: todo.id,
              });
            }
          })
        );
      }

      res.status(200).json(todo);
    }
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ message: "Failed to update todo" });
  }
};


const deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  const userId = req.user.userId;
  try {
    const todo = await Todo.findOne({
      where: { id: todoId, userId },
    });
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      await Comment.destroy({ where: { todoId: todo.id } }); // Hapus semua komentar terkait
      await todo.destroy(); // Hapus todo itu sendiri
      res.status(204).end();
    }
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ message: "Failed to delete todo" });
  }
};


  module.exports = {
    getAllTodos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo,
  };