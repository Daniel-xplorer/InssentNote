const Users = require("../database/models/users");

const getAllUsers = (req, res) => {
    Users.findAll()
    .then(x => res.send(x))
    .catch(error => res.status(500).send(error));
};

module.exports = {
    getAllUsers,
}