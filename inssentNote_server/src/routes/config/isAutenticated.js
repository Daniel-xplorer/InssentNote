const jwt = require('jsonwebtoken');

// funciones de autenticacion de ususarios:
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    //debe existir el cookie (header) authorization
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(' ')[1];
      //validar el token
      jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(500).json({ msg: 'Token invalid' });
        else {
          req.user = decoded;
          next()
        }
      })
    } else {
      //si no existe el header authorization
      res.status(401).json({ msg: 'Access Deneggated, Not Autorization' });
    }
  } else {
    res.status(401).json({ error: 'Access Deneggated, Not Session ID' });
  }
};
function isNotAuthenticated(req, res, next) {
  if (req.headers.authorization && req.isAuthenticated()) {
    res.status(500).json({ error: 'The User Is Actually Logged' })
  } else {
    next()
  }
};
module.exports = {
  isAuthenticated,
  isNotAuthenticated,
}