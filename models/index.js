const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
    logging: console.log
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.travel = require('./travel.model.js')(sequelize, Sequelize);
db.travelPack = require('./travel-pack.model.js')(sequelize, Sequelize);

// Define relationships
db.travel.hasMany(db.travelPack, {
  foreignKey: 'travel_id',
  as: 'travelPacks'
});

db.travelPack.belongsTo(db.travel, {
  foreignKey: 'travel_id',
  as: 'travel'
});

module.exports = db;