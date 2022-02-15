const express = require('express');
//const json = require("express").json()
const morgan = require('morgan');

//importar rutas
const users = require('./routes/users');
const clients = require('./routes/clients');
const notes = require('./routes/notes');


const server = express();

//midelwares
server.use(morgan('dev'));//sirve para visualizar las peticiones
server.use(express.json());//bodyparser

server.use('/users', users);
server.use('/clients', clients);
server.use('/notes', notes)

server.get('/', (req, res) => {
    res.send('home');
})

module.exports = server;