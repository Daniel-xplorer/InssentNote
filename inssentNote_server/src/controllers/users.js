const Users = require("../database/models/users");
const { deleteClient } = require("./clients");
const passport = require("passport");
const bcrypt = require("bcryptjs");//para encriptar la constraseña al agregar un usuario
const jwt = require("jsonwebtoken");

//users data
const getAllUsers = (req, res) => {
    Users.findAll()
    .then(x => res.send(x))
    .catch(error => res.status(500).send(error));
};
const getUserData = (req, res) => {
    const id = req.query.id;
    const keys = req.query.info;
    Users.findOne({
        where: {id: id}
    })
    .then(user => {
        let object = new Object(Object.prototype);
        for (let i = 0; i < keys.length; i++) {
            let name = keys[i];
            let value = user[name];
            Object.defineProperty(object, name, {
                value: value, enumerable: true,
                writable: true, 
                configurable: true
            });
            console.log('i',object);
        };
        res.json(object);
    })
    .catch(err => console.log(err));
};
//register Users
const addUser = (req, res) => {
    const { 
        first_name,
        last_name,
        id,
        role,
        email,
        city,
        password } = req.body;
    if (typeof(id) !== 'number') return res.status(400).json({
        error: 'the id must be a number'
    });
    if (id && first_name && id && role && password) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {throw Error('1',err)};
//hasheo de la contraseña
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {throw Error('2',err)};
//Luego podra ser autenticada con la libraria que utilizamos para hashear
                Users.findOrCreate({
                    where: { id: id },
                    defaults: {
                        first_name: first_name,
                        last_name: last_name,
                        id: id,
                        role: role, 
                        email: email, 
                        city: city,
                        password: hash
                    }
                })
                .then(newUser => {
                    newUser[1] === true ?
                    //cambiar la contrseña (se debe filtrar para no enviarla)
                    newUser.password = 'payasito' && 
                    res.json({ new_user: newUser[0] }) :
                    res.json({ 
                        error: "the user already exist", 
                        message: `the user with id:${id} already exist` 
                    });
                })
                .catch(err => {
                    res.status(500).send(err);
                });
            });
        });
    } else {
        res.status(400).json({ error: "data is incomplete" });
    }
};
//delete Users
const deleteUser = (req, res) => {
    const userId = req.params.userId;
    if (userId) {
        Users.destroy({
            where: {
                id: userId
            }
        })
        .then(x => {
            res.json({
                message: "user deleted",
                delete: x
            });
        })
        .catch(err => {
            res.json({ error: err })
        })
    } else {
        res.status(400).json({ error: "user not passed for params" });
    }
};
//Loging users
const logInUser = (req, res) => {
    //verificacion con passport:
    passport.authenticate('local', (err, user, info) => {
        if (err) throw new TypeError(err);
        if (!user) return res.status(401).send('User Not Found');
        else {
            //logeamos el usuario con la funcion dada por req de passport y express
            req.login(user, (err) => {
                if (err) throw new TypeError(err);
                //generamos el token
                let token = jwt.sign({ user: user }, 'secret', {
                    expiresIn: '1h'
                });
                res.header('Access-Control-Allow-Credentials', true);
                //enviamos el token para el manejo del mismo en cookie del navegador
                //y ser devuelto en futuras peticiones
                res.json({
                    user: user,
                    token: token
                });
            });
        }
    })(req, res);//parte de la configuracion
};
const logout = (req, res) => {
    // funcion logaout de req, deslogea la session de passport
    req.logout();
    res.send('User unlogged');
};


//para borrar (en developer) todos al tiempo
const deleteAll = async (rew, res) => {
    const all = await Users.findAll()
        try {
            var array = []
            all.forEach(async y => {
                if (y.id) {
                    const deleted = await Users.destroy({
                        where: {id: y.id}
                    })
                    array.push(deleted)
                }
                
            })
            res.send(array)
        } catch (err) {
            console.log(err)
        }
};

module.exports = {
    getUserData,
    getAllUsers,
    addUser,
    deleteUser,
    logInUser,
    logout,

    deleteAll
}