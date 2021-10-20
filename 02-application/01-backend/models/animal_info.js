const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('animal_info', {
    animal_id_intake: {
      type: DataTypes.CHAR(7),
      allowNull: false,
      primaryKey: true
    },
    animal_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    breed: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'animal_info',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "animal_id_intake" },
        ]
      },
    ]
  });
};
