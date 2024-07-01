module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: DataTypes.STRING,
  });

  Category.associate = (models) => {
    Category.hasMany(models.Todo, { foreignKey: "categoryId", as: "todos" });
  };

  return Category;
};
