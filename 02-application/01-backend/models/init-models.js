var DataTypes = require("sequelize").DataTypes;
var _in_out_mega = require("./in_out_mega");

function initModels(sequelize) {
  var in_out_mega = _in_out_mega(sequelize, DataTypes);


  return {
    in_out_mega,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
