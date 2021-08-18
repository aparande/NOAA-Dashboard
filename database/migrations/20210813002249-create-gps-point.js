'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GPSPoints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buoy_id: {
        type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "buoys", field: "id" },
				onDelete: "CASCADE"
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false
      },
      latitude: {
        type: Sequelize.DECIMAL,
				allowNull: false
      },
      longitude: {
        type: Sequelize.DECIMAL,
				allowNull: false
      },
      reading_type: {
        type: Sequelize.STRING
      },
      spot_id: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

		await queryInterface.addIndex('GPSPoints', ['buoy_id', 'timestamp', 'latitude', 'longitude'], { unique: true });
  },
  down: async (queryInterface, Sequelize) => {
		await queryInterface.removeIndex('GPSPoints', ['buoy_id', 'timestamp', 'latitude', 'longitude']);
    await queryInterface.dropTable('GPSPoints');
  }
};
