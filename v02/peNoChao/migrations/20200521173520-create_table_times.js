'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('times', {
        id:
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        nome:
        {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        cep:
        {
          type: Sequelize.STRING(8),
          allowNull: false
        }

  })},

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('times');
  }
};