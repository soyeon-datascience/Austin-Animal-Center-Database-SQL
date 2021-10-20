const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('outcome', {
    animal_id_intake: {
      type: DataTypes.CHAR(7),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'animal_info',
        key: 'animal_id_intake'
      }
    },
    outcome_number: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    outcome_datetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    outcome_weekday: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    age_upon_outcome_years: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true
    },
    age_upon_outcome_days: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    sex_upon_outcome: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    outcome_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    outcome_subtype: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'outcome',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "animal_id_intake" },
          { name: "outcome_number" },
        ]
      },
    ]
  });
};
