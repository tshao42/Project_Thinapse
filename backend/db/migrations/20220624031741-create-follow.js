'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Follows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      followingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Users',
        key: 'id'}
      },
      followerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Users',
        key: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Follows');
  }
};
