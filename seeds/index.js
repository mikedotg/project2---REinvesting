
const sequelize = require('../config/connection');
const User = require('../models/User');
const seedUsers = require('./userData.json');

const seed = async () => {
  await sequelize.sync({ force: true });

  // await seedUsers();
  const users = await User.bulkCreate(seedUsers)

  process.exit(0);
};

seed();