const { DataTypes } = require("sequelize");
const { db } = require("../database");


const Notes = db.define('notes', {
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    clientId: { type: DataTypes.INTEGER },
    register: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dateLimit: { 
        type: DataTypes.DATEONLY
    },
    hourLimit: { type: DataTypes.TIME },
    state: {
        type: DataTypes.STRING, defaultValue: 'incompleted',
        validate: {
            isIn: [['completed', 'incompleted']]
        }
    }
});

module.exports = Notes;