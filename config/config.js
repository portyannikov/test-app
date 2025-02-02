require('dotenv').config();
module.exports = {
  development: {
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    database: process.env.DATABASE_NAME || 'test',
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
  },
};
