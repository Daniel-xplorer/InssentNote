const express = require('express');
//const json = require("express").json()
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport')
// importar rutas:
const users = require('./routes/users');
const clients = require('./routes/clients');
const notes = require('./routes/notes');

// configuracion de autenticion con passport:
require('./config/autentication/passport');

// create app-server:
const server = express();

// cors:
//configuración para aceptar peticiones de origenes desconocidos
var corsOptions = {
    origin: "http://localhost:8080",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,//credenciales para setear una session id
    optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
server.use(cors(corsOptions))//modulo cors con opciones personalizadas

// midelwares:
server.use(morgan('dev'));//sirve para visualizar las peticiones
server.use(express.json());//bodyparser
//inicializar sesion con express necesario para declarar las sesiones desde req
server.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: parseInt(process.env.MAX_SESSION_AGE)
    }
}));


// Inicializa Passport y recupera el estado de autenticación de la sesión.
server.use(passport.initialize());
server.use(passport.session());

// Middleware para mostrar la sesión actual en cada request
// server.use((req, res, next) => {
//     console.log('user:');
//     console.log(req.user);
//     next();
// });

// Rutas:

server.use('/users', users);
server.use('/clients', clients);
server.use('/notes', notes)

server.get('/', (req, res) => {
    res.send('home');
})

module.exports = server;