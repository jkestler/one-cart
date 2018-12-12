'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    content: DataTypes.STRING
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};