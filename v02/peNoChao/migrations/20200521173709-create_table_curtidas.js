'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('curtidas', {
        id:
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        jogadores_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: 
          { 
            model:'jogadores',
            key: 'id'
          }
        },
        postagens_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: 
          { 
            model:'postagens',
            key: 'id'
          }
        },
  })},

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('curtidas');
  }
};