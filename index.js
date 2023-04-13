const express = require('express');
const sequelize = require('./src/models/sequelize')
const app = express();
const userRoutes = require('./src/routes/users')

const PORT = 3000;

app.use('/', userRoutes);


(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
    app.listen(PORT, () => console.log('Server started on port 3000'));
  } catch (error) {
    console.error('Unable to synchronize models:', error);
  }
})();

process.on('SIGINT', async () => {
  console.log('Closing database connection...');
  await sequelize.close();
  console.log('Database connection closed.');
  process.exit(0);
});