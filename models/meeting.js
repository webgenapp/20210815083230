'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Meeting.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Meeting',
    }
  )
  return Meeting
}
