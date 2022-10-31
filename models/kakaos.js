'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kakaos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kakaos.init({
    kakaoId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nick: DataTypes.STRING,
    snsId: DataTypes.STRING,
    provider: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kakaos',
  });
  return Kakaos;
};