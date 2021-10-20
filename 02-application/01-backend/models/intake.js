const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('intake', {
    animal_id_intake: {
      type: DataTypes.CHAR(7),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'animal_info',
        key: 'animal_id_intake'
      }
    },
    intake_number: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    intake_datetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    intake_weekday: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    age_upon_intake_years: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true
    },
    age_upon_intake_days: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    sex_upon_intake: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    intake_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    intake_condition: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    found_location: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'intake',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "animal_id_intake" },
          { name: "intake_number" },
        ]
      },
    ]
  });
};
