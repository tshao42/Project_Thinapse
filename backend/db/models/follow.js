'use strict';

module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followingId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
    Follow.belongsTo(models.User, { as: 'follower', onDelete: 'CASCADE'});
    Follow.belongsTo(models.User, { as: 'following', onDelete: 'CASCADE'});
  };
  return Follow;
};
