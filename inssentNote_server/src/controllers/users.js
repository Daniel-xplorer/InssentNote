const Users = require("../database/models/users");
const { deleteClient } = require("./clients");

const getAllUsers = (req, res) => {
    Users.findAll()
    .then(x => res.send(x))
    .catch(error => res.status(500).send(error));
};
const addUser = (req, res) => {
    console.log(req.body)
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
        Users.findOrCreate({
            where: { id: id },
            defaults: {
                first_name: first_name,
                last_name: last_name,
                id: id,
                role: role, 
                email: email, 
                city: city,
                password: password, 
            }
        })
        .then(newUser => {
            newUser[1] === true ?
            res.json({ new_user: newUser[0] }) :
            res.json({ 
                error: "the user already exist", 
                message: `the user with id:${id} already exist` 
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    } else {
        res.status(400).json({ error: "data is incomplete" });
    }
};
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
const deleteAll = async (rew, res) => {
    const all = await Users.findAll()
        try {
            var array = []
            all.forEach(async y => {
                console.log(y.id)
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
    getAllUsers,
    addUser,
    deleteUser,
    deleteAll
}