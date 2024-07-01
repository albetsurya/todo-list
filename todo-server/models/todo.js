// models/todo.js

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    dueDate: DataTypes.DATE,
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Todo.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });
    Todo.hasMany(models.Comment, { foreignKey: "todoId", as: "comments" });
    Todo.belongsToMany(models.Tag, {
      through: models.TodoTag,
      foreignKey: "todoId",
      otherKey: "tagId",
      as: "tags",
    });
  };

  return Todo;
};
