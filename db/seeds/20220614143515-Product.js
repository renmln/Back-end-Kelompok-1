"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    "Products",
      [
        {
          id_seller: 1,
          product_name: "Jam Tangan Casio",
          price: 250000,
          category:"Aksesoris",
          description:"lorem ipsum dolor sit amet, consectetur adip",
          image_1: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {};
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
