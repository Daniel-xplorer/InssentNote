const passport = require('passport');
const LocalStrategy = require('passport-local');
const Users = require('../../database/models/users');
const bcrypt = require('bcryptjs');

// Configuración de passport (en este caso local):
//configuración de estrategia de autenticación
passport.use('local', new LocalStrategy({
  usernameField: 'email', //definir los valores pasados por body
  passwordField: 'password'
  }, async (email, password, done) => {
    const user = await Users.findOne({ where: {email: email}});
    if (!user) {
      return done(null, false, { message: 'Not User Found.' });
    } else {
      // comparacion de contraseña pasada por body y en base de datos con libraria bcrypt
      bcrypt.compare(password, user.password, (err, result) => {
        if(err) throw err;
        if (result === true) {
          return done(null, user);//función done recibe por parametros boolean y user finded
        } else {
          return done(null, false);
        };
      });
    };
}));
//serializacion del usuario para trabajar con sus peticiones además de setear el usuario actual y los guardados (session ID)
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//deserealizar, creo que es para cerrar o eliminar la session ID
passport.deserializeUser(function (id, done) {
  Users.findOne({
    where: {id: id}
  })
  .then(user => {
    done(null, user);
  }, err => {
    done(err);
  })
});