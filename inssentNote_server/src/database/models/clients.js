const { DataTypes } = require("sequelize");
const { db } = require("../database");


const Clients = db.define('clients', {
    name: {type: DataTypes.STRING},
    id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true}
});

module.exports = Clients;