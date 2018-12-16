'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isPurchased: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};