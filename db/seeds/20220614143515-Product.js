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
          email_user: "superadmin@gmail.com",
          password_user: await encryptPassword("super123"),
          id_type: 1,
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
