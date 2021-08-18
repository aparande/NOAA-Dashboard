'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GPSPoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
			GPSPoint.belongsTo(models.Buoy, { foreignKey: "buoy_id" });
    }
  };
  GPSPoint.init({
    buoy_id: DataTypes.INTEGER,
		timestamp: DataTypes.DATE,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
		spot_id: DataTypes.STRING,
		reading_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GPSPoint',
		underscored: true,
		tableName: 'GPSPoints'
  });
  return GPSPoint;
};
