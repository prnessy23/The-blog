const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcryptjs = require('bcryptjs');
const { beforeCreate } = require('./Comment');

class User extends Model {

    checkPassword(loginPW) {
        return bcryptjs.compareSync(loginPW, this.password);
    }
}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcryptjs.hash(newUserData.password, 10);
                return newUserData;

            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcryptjs.hash(updatedUserData.password, 10);
                return updatedUserData;
            }

        },
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;
