const { Sequelize } = require('sequelize');



const db = new Sequelize(
    'postgres://DanielAmado:1004148762@localhost:5432/inssent_note_app', {
    logging: false
});


module.exports = {
    db,
}