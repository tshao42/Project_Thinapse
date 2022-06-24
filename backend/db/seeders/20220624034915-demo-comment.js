'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        userId: 5,
        postId: 1,
        body: "Great Post!"
      },
      {
        userId: 4,
        postId: 2,
        body: "This is dog latin."
      },
      {
        userId: 3,
        postId: 1,
        body: "Another Dog Latin Post."
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
