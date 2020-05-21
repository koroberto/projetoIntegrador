'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('tipo_evento', {
        id:
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        descricao: Sequelize.STRING(45),
  })},

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('tipo_evento');
  }
};