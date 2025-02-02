const { sequelize } = require('./models/index');

const connectToDatabase = async function () {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    await sequelize.sync({ logging: false });
    // await sequelize.sync({ force: true });
  } catch (error) {
    console.log('Error connection', error);
  }
};

module.exports = { connectToDatabase };
