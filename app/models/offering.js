'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offering extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Offering.belongsTo(models.User, {
        foreignKey: "id_buyer",
      }),
      models.Offering.belongsTo(models.Product, {
        foreignKey: "id_product",
      });
    }
  }
  Offering.init({
    id_product: DataTypes.INTEGER,
    id_buyer: DataTypes.INTEGER,
    offering_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Offering',
  });
  return Offering;
};