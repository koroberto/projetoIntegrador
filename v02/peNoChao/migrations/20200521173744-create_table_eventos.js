'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('eventos', {
        id:
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        jogo_id:
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: 
          { 
            model:'jogos',
            key: 'id'
          }
        }
        ,
        jogador_id:
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: 
          { 
            model:'jogadores',
            key: 'id'
          }
        },
        cronometro: Sequelize.INTEGER,
        tipo_evento_id:
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: 
          { 
            model:'tipo_evento',
            key: 'id'
          }
        }
  })},

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('eventos');
  }
};