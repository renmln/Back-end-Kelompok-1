'use strict';
const {
  Model
} = require('sequelize');
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
      })
      models.Transaction.belongsTo(models.Offering, {
        foreignKey: "id_offering",
      })
    }
  }
  Transaction.init({
    id_seller: DataTypes.INTEGER,
    id_offering: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};