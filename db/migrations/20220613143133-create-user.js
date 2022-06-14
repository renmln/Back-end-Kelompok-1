'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      city:{
        type: Sequelize.STRING,
        allowNull: true
      },
      address:{
        type: Sequelize.STRING,
        allowNull: true
      },
      no_hp:{
        type: Sequelize.STRING,
        allowNull: true
      },
      photo_profile:{
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('Users');
  }
};