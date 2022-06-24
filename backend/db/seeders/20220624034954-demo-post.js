'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Posts', [
        {
          authorId: 1,
          title: 'Example Passage 1',
          body: "This is the body text1. I think I would like to do something about it."
        },
        {
          authorId: 3,
          title: 'Nice Day!',
          body: "This is another body text. I will populate more."
        }
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
