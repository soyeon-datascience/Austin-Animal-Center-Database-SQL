const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('in_out_mega', {
    age_upon_outcome: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    animal_id_outcome: {
      type: DataTypes.CHAR(7),
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    outcome_subtype: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    outcome_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sex_upon_outcome: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    age_upon_outcome_days: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    age_upon_outcome_years: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true
    },
    age_upon_outcome_age_group: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    outcome_datetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    outcome_month: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true
    },
    outcome_year: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true
    },
    outcome_monthyear: {
      type: DataTypes.CHAR(7),
      allowNull: true
    },
    outcome_weekday: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    outcome_hour: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true
    },
    outcome_number: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true
    },
    dob_year: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true
    },
    dob_month: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true
    },
    dob_monthyear: {
      type: DataTypes.CHAR(7),
      allowNull: true
    },
    age_upon_intake: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    animal_id_intake: {
      type: DataTypes.CHAR(7),
      allowNull: true
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
    found_location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    intake_condition: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    intake_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sex_upon_intake: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    count: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true
    },
    age_upon_intake_days: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    age_upon_intake_years: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true
    },
    age_upon_intake_age_group: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    intake_datetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    intake_month: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true
    },
    intake_year: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true
    },
    intake_monthyear: {
      type: DataTypes.CHAR(7),
      allowNull: true
    },
    intake_weekday: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    intake_hour: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true
    },
    intake_number: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true
    },
    time_in_shelter: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    time_in_shelter_days: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'in_out_mega',
    timestamps: false
  });
};
