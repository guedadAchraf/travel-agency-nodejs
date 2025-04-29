const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const db = {};

db.sequelize = sequelize;
db.Sequelize = require('sequelize');

// Import models
db.travel = require('./travel.model')(sequelize, DataTypes);
db.travelPack = require('./travelPack.model')(sequelize, DataTypes);

// Setup relationships
db.travel.hasMany(db.travelPack);
db.travelPack.belongsTo(db.travel);

module.exports = db;