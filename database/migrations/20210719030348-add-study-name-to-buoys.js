'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
     await queryInterface.addColumn('buoys', 'study_name', { type: Sequelize.DataTypes.STRING })
     return await queryInterface.addConstraint('buoys', { type: "UNIQUE", fields: ['study_name', 'name'], name: "unique_study_and_name"});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeConstraint('buoys', 'unique_study_and_name', { transaction: t });
      return await queryInterface.removeColumn('buoys', 'study_name', { transaction: t });
    });
  }
};
