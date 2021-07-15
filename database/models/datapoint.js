'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Datapoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Datapoint.belongsTo(models.Buoy, { foreignKey: "buoy_id" });
    }
  };
  Datapoint.init({
    timestamp: DataTypes.DATE,
    xlabel: DataTypes.STRING,
    value: DataTypes.REAL,
    metric: DataTypes.ENUM("BB", "TOL", "PSD", "OL"),
    statistic: DataTypes.ENUM("median", "mean")
  }, {
    sequelize,
    modelName: 'Datapoint',
    underscored: true
  });
  return Datapoint;
};