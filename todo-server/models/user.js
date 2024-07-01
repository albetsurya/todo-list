module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.Todo, { foreignKey: "userId", as: "todos" });
    User.hasMany(models.Comment, { foreignKey: "userId", as: "comments" });
  };

  return User;
};
