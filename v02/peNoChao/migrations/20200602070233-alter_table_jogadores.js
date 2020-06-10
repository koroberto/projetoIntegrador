'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('jogadores', 'passwordResetToken', {
          type: Sequelize.DataTypes.STRING(100)
        }, { transaction: t }),
        queryInterface.addColumn('jogadores', 'passwordResetExpires', {
          type: Sequelize.DataTypes.DATE,
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('jogadores', 'passwordResetToken', { transaction: t }),
        queryInterface.removeColumn('jogadores', 'passwordResetExpires', { transaction: t })
      ]);
    });
  }
};