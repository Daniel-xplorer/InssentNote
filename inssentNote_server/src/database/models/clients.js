const { DataTypes } = require("sequelize");
const { db } = require("../database");
const Notes = require("./notes");


const Clients = db.define('clients', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING },
    id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    processType: { type: DataTypes.STRING,  }//colocar validacion segun necesidad
});

// asociations:
Clients.belongsToMany(Notes, { through: 'Note-Client' });


module.exports = Clients;