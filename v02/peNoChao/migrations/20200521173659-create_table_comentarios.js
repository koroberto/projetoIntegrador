'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('comentarios', {
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
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        jogadores_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: 
          { 
            model:'jogadores',
            key: 'id'
          }
        },
        postagens_id:
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: 
          { 
            model:'postagens',
            key: 'id'
          }
        },
        create_at: Sequelize.INTEGER,
        update_at: Sequelize.INTEGER
  })},

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('comentarios');
  }
};