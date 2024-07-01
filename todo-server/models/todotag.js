module.exports = (sequelize, DataTypes) => {
  const TodoTag = sequelize.define("TodoTag", {
    todoId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER,
  });

  return TodoTag;
};
