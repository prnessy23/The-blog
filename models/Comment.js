// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');
// 
// class Comment extends Model { }
// 
// Comment.init({
// 
    // id: {
        // type: DataTypes.INTEGER,
        // primaryKey: true,
        // allowNull: false,
        // autoIncrement: true
    // },
    // comment_text: {
        // type: DataTypes.STRING,
        // allowNull: false,
        // validate: {
            // len: [1]
        // }
    // },
    // user_id: {
        // type: DataTypes.INTEGER,
        // allowNull: false,
        // references: {
            // model: 'user',
            // key: 'id',
        // }
    // },
// 
    // post_id: {
        // type: DataTypes.INTEGER,
        // allowNull: false,
        // references: {
            // model: 'post',
            // key: 'id',
        // }
    // }
// },
    // {
// 
        // sequelize,
        // freezeTableName: true,
        // modelName: 'comment'
    // }
// 
// 
// );
// 
// 
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize =require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

module.exports = Comment;