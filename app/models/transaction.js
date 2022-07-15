"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Transaction.belongsTo(models.User, {
        foreignKey: "id_seller",
      });
      models.Transaction.belongsTo(models.Offering, {
        foreignKey: "id_offering",
      });
      models.Transaction.belongsTo(models.Product, {
        foreignKey: "id_product",
      });
    }
  }
  Transaction.init(
    {
      id_seller: DataTypes.INTEGER,
      id_buyer: DataTypes.INTEGER,
      id_offering: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
