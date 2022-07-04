"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Notification.belongsTo(models.User, {
        foreignKey: "userId",
      });
      models.Notification.belongsTo(models.Product, {
        foreignKey: "productId",
      });
    }
  }
  Notification.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      productId: DataTypes.INTEGER,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
