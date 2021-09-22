'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Articles.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASECADE"
      })
    }
  };
  Articles.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    title:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Articles',
  });
  return Articles;
};