const express = require('express');
//const json = require("express").json()
const cors = require('cors');
const morgan = require('morgan');



//importar rutas
const users = require('./routes/users');
const clients = require('./routes/clients');
const notes = require('./routes/notes');

//create app
const server = express();

//cors
var corsOptions = {
    origin: "http://localhost:8080",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
server.use(cors(corsOptions))

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