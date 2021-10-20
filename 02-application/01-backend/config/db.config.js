const Sequelize = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    port: env.port,
    dialect: env.dialect,
    operatorsAliases: 0,
    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.MegaTable = require('../models/in_out_mega.js')(sequelize, Sequelize);
db.AnimalInfoTable = require('../models/animal_info')(sequelize, Sequelize);
// db.IntakeDateAgeTable = require('../models/intake_date_age')(sequelize, Sequelize);
 db.IntakeInfoTable = require('../models/intake')(sequelize, Sequelize);
// db.NoUseTable = require('../models/no_use')(sequelize, Sequelize);
// db.OutcomeDateAgeTable = require('../models/outcome_date_age')(sequelize, Sequelize);
db.OutcomeInfoTable = require('../models/outcome')(sequelize, Sequelize);
// db.TimeInShelterTable = require('../models/time_in_shelter')(sequelize, Sequelize);

module.exports = db;
