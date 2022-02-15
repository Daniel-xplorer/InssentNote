const { DataTypes } = require("sequelize");
const { db } = require("../database");


const Notes = db.define('notes', {
    description: { type: DataTypes.STRING },
    clientId: { type: DataTypes.INTEGER },
    date: { type: DataTypes.DATE, defaultValue: Date()},
    register: { type: DataTypes.INTEGER }
});

module.exports = Notes;