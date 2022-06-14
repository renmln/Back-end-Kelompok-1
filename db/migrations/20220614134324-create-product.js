'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_seller: {
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      image_1: {
        type: Sequelize.STRING
      },
      image_2: {
        type: Sequelize.STRING
      },
      image_3: {
        type: Sequelize.STRING
      },
      image_4: {
        type: Sequelize.STRING
      },
      status:{
        type:Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};