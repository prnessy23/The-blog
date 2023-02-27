// importing sequelize constructor from library
const { Sequelize } = require('sequelize');

require('dotenv').config();

let sequelize;

// for Heroku deployment

if (process.env.JAWSDB_URL){
    sequelize =new Sequelize(process.env.JAWSDB_URL);
    } else{
        // for local host option
        sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASSWORD,{
            host: '127.0.0.1',
            dialect: 'mysql',
            port: 3306
        });
    }

    module.exports = sequelize;