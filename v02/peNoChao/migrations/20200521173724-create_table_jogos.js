'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('jogos', {
        id:
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        time1_id:
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: 
          { 
            model:'times',
            key: 'id'
          }
        },
        time2_id:
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: 
          { 
            model:'times',
            key: 'id'
          }
        },
        data: Sequelize.DATE
  })},

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('jogos');
  }
};