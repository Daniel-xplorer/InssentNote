const { Sequelize } = require('sequelize');


// conexion a postgress con sequelize:
const db = new Sequelize(
    'postgres://DanielAmado:1004148762@localhost:5432/db2',
    {
    logging: false
    }
);


module.exports = {
    db,
}