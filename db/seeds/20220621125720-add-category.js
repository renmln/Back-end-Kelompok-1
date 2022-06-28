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
    let data = [
      {
        name: "Baju",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Elektronik",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hobi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kendaraan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kesehatan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Categories", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
