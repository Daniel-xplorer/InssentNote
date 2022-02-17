const { DataTypes } = require("sequelize");
const { db } = require("../database");


const Notes = db.define('notes', {
    description: { type: DataTypes.STRING },
    clientId: { type: DataTypes.INTEGER },
    register: { type: DataTypes.INTEGER }
});

module.exports = Notes;