const { DataTypes, NUMBER } = require('sequelize');
const Clients = require('./clients');
const { db } = require('../database');
const Notes = require('./notes');
const bcrypt = require('bcryptjs');

// model Users:

const Users = db.define('users', {
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING },
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    role: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, validate: {
        isEmail: true
    } },
    city: { type: DataTypes.STRING },
    password: { type: DataTypes.TEXT }
});


// relations:

Users.hasMany(Clients);// { foreigkey: 'id', sourceKey: 'id' }
Clients.belongsTo(Users);

Users.hasMany(Notes);
Notes.belongsTo(Clients);

module.exports = Users;