const { DataTypes, NUMBER } = require('sequelize');
const Clients = require('./clients');
const { db } = require('../database');
const Notes = require('./notes');

//models

const Users = db.define('users', {
    name: {type: DataTypes.STRING, allowNull: false},
    position: {type: DataTypes.STRING, allowNull: false},
    id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true}
});

//relations

Users.hasMany(Clients);// { foreigkey: 'id', sourceKey: 'id' }
Clients.belongsTo(Users);

Users.hasMany(Notes);
Notes.belongsTo(Clients);

module.exports = Users;