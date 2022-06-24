'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    userId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
    Follow.belongsTo(models.User, { as: 'follower', foreignKey: 'followerId'});
    Follow.belongsTo(models.User, { as: 'followed', foreignKey: 'userId'});
  };
  return Follow;
};
