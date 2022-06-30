'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followingId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
    Follow.hasMany(models.User, { as: 'follower', foreignKey: 'followerId'});
    Follow.hasMany(models.User, { as: 'followed', foreignKey: 'userId'});
  };
  return Follow;
};
