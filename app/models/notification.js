"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      // define association here
      models.Notification.belongsTo(models.User, {
        foreignKey: "userId",
      });
      models.Notification.belongsTo(models.Product, {
        foreignKey: "productId",
      });
      models.Notification.belongsTo(models.Offering, {
        foreignKey: "offeringId",
      });
    }
  }
  Notification.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      productId: DataTypes.INTEGER,
      offeringId: DataTypes.INTEGER,
      message: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
