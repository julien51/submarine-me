'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  users.init({
    pinata_user_id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    pinata_submarine_key: DataTypes.STRING,
    pinata_gateway_subdomain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};