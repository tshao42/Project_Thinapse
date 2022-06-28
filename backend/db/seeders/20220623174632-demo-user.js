'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id:1,
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        id:2,
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        id: 3,
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        id: 4,
        email: 'example@example.com',
        username: 'exampleuser1',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        id: 5,
        email: 'example2@example.com',
        username: 'chetcospan',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        id: 6,
        email: 'something@something.com',
        username: 'cambridgechain',
        hashedPassword: bcrypt.hashSync('examplepassword')
      },
      {
        id: 7,
        email: 'anotherexample@example.com',
        username: 'vectorforce',
        hashedPassword: bcrypt.hashSync('demopassword')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
