module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define("Tag", {
    name: DataTypes.STRING,
  });

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Todo, {
      through: models.TodoTag,
      foreignKey: "tagId",
      otherKey: "todoId",
      as: "todos",
    });
  };

  return Tag;
};
