'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('datapoints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false
      },
      xlabel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.REAL,
        allowNull: false
      },
      statistic: {
        type: Sequelize.ENUM,
        values: ["median", "mean"],
        allowNull: false
      },
      metric: {
        type: Sequelize.ENUM,
        values: ["BB", "TOL", "PSD", "OL"],
        allowNull: false
      },
      buoy_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "buoys", field: "id" },
        onDelete: "CASCADE"
      },
      created_at: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('datapoints', ['buoy_id', 'timestamp', 'xlabel', 'metric', 'statistic'], { unique: true });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('datapoints', ['buoy_id', 'timestamp', 'xlabel', 'metric', 'statistic']);
    await queryInterface.dropTable('datapoints');
  }
};