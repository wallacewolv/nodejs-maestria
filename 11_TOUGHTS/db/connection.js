const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('toughts', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
  console.log('Conectamos com sucesso!');
} catch (error) {
  console.log(`Não possivel conectar: ${error}`);
}

module.exports = sequelize;
