module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    text: DataTypes.TEXT,
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Todo, { foreignKey: "todoId", as: "todo" });
    Comment.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  return Comment;
};
