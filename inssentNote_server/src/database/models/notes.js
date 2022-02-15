const { DataTypes } = require("sequelize");
const { db } = require("../database");


const Notes = db.define('notes', {
    description: {type: DataTypes.STRING, defaultValue: Date()},
    userId: { type: DataTypes.INTEGER}
});

module.exports = Notes;