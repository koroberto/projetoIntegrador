'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('postagens', {
        id:
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        descricao:
        {
          type: Sequelize.STRING(150),
          allowNull: true
        },
        jogadores_id:{
          type: Sequelize.INTEGER,
          allowNull: true,
          references: 
          { 
            model:'jogadores',
            key: 'id'
          }
        },
        create_at: Sequelize.INTEGER,
        update_at: Sequelize.INTEGER
  })},

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('postagens');
  }
};