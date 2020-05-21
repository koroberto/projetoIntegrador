'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('jogadores',
      {
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
        dataNascimento:
        {
          type: Sequelize.DATE,
          allowNull: false
        },
        sexo:
        {
          type: Sequelize.STRING(9),
          allowNull: false
        },
        estado:
        {
          type: Sequelize.STRING(2),
          allowNull: false
        },
        cidade:
        {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        bairro:
        {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        cep: {
          type: Sequelize.STRING(8),
          allowNull: false
        },
        telefone: {
          type: Sequelize.STRING(20),
          allowNull: false
        },
        posicaoJogador:
        {
          type: Sequelize.STRING(17),
          allowNull: false
        },
        email:
        {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true
        },
        password:
        {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        photo_id:
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        times_id:
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: 
          { 
            model:'times',
            key: 'id'
          }
        },
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('jogadores');
  }
};