const Clients = require("../database/models/clients")


const getAllClients = (req, res) => {
    Clients.findAll()
    .then(x => {
        res.send(x)
    }, err => {
        res.status(500).json(err)
    })
}

module.exports = {
    getAllClients
}