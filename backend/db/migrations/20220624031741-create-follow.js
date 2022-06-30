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
    })
    // .then(()=>queryInterface.addConstraint('Follows',{
    //   fields:['followingId', 'followerId'],
    //   type: 'unique',
    //   name: 'onlyOneAssociation'
    // }));
    
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Follows')
    // .then(()=>queryInterface.removeConstraint('Follows', 'onelyOneAssociation'));
  }
};

