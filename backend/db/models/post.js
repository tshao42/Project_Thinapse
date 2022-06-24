'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    authorId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.hasMany(models.Comment, {foreignKey: 'postId', onDelete: 'CASCADE', hooks: true});
    Post.belongsTo(models.User, {foreignKey: 'authorId'});
  };
  return Post;
};
