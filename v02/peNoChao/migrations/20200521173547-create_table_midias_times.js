'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('midias_times', {
        id:
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        timestamp:
        {
          type: Sequelize.DATE,
          allowNull: false,
        },
        tipo: Sequelize.STRING(45),
        path: Sequelize.STRING(150),
        times_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: 
          { 
            model:'times',
            key: 'id'
          }
        }
  })},

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('midias_times');
  }
};