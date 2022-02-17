const Clients = require("../database/models/clients")
const Users = require("../database/models/users")


const getAllClients = (req, res) => {
    Clients.findAll()
    .then(x => {
        res.send(x)
    }, err => {
        res.status(500).json(err)
    })
};
const addClient = (req, res) => {
    const userId = req.params.userId;
    const { name, id } = req.body;
    if (userId) {
        Users.findByPk(userId)
            .then(user => {
                if (user) {
                    if (name && id) {
                        Clients.create({
                            name: name,
                            id: id
                        })
                        .then((newClient) => {
                            console.log('cliente creado')
                            user.addClient(newClient).then(x => {
                                return res.send(newClient.name);
                            });
                        })
                        .catch(err =>{
                            err.original.code == '23505' ?
                            res.status(400).json({error: 'the client already exist', code: '23505'}) :
                            res.status(500).json({error: err})
                        });
                    } else {
                        res.status(400).json({ error: "name or id was not pased" });
                    };
                } else {
                    res.status(400).json({error: 'the user do not exist'});
                }
            })
            .catch(err => res.send(400, err));
    }
};
const deleteClient = (req, res) => {
    const clientId = req.params.clientId;
    if (clientId) {
        Clients.destroy({
            where: {
                id: clientId
            }
        })
        .then(x => {
            res.json({
                detele: true,
                deleted: x
            })
        })
        .catch(err => {
            res.status(500).send(err);
        })
    } else {
        res.status(400).json({ error: "the ids client was not passed by params" });
    }
};
const deleteAll = async (rew, res) => {
    const all = await Clients.findAll()
        try {
            var array = []
            all.forEach(async y => {
                console.log(y.id)
                if (y.id) {
                    const deleted = await Clients.destroy({
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
    getAllClients,
    addClient,
    deleteClient,
    deleteAll
}