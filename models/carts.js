'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Carts
  .init({
    cartId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    title : DataTypes.STRING,
    option: DataTypes.CHAR,
    amount: DataTypes.INTEGER,
    cost: DataTypes.FLOAT,
    imgUrl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};