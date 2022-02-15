const express = require('express');

//importar rutas
const users = require('./routes/users');
const clients = require('./routes/clients');
const notes = require('./routes/notes');




const server = express();

server.use('/users', users);
server.use('/clients', clients);
server.use('/notes', notes)

server.get('/', (req, res) => {
    res.send('home');
})

module.exports = server;