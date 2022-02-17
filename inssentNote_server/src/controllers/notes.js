const Clients = require("../database/models/clients");
const Notes = require("../database/models/notes");
const Users = require("../database/models/users");


var register = 0;

const getAllNotes = async (req, res) => {
    const allNotes = await Notes.findAll();
    if (allNotes.length < 1) res.json({failed: 'Dont have notes yet'});
    else res.json(allNotes);
};
const doNewNote = async (req, res) => {
    const {description, clientId} = req.body;
    const userId = req.params.userId;
    try {
        if (description && clientId) {
            const client = await Clients.findByPk(clientId);
            if (!client) return res.status(400).json({ error: "the client does not exist" });
            const user = await Users.findByPk(userId);
            if (!user) return res.status(400).json({ error: `not exist the user with id ${userId}` })
            if (client.userId !== user.id) return res.status(500).json({ error: "this user can not add notes over this client" });
            let newNote = await Notes.create({
                description: description,
                clientId: clientId,
                register: register
            });
            await user.addNote(newNote);
            register = register + 1;
            res.json({ note: newNote.register });
        } else {
            res.status(400).json({error: "did not send complete information"});
        };
    } catch (err) {
        res.status(500).send(err);
    }
};
const deleteNote = async (req, res) => {
    const register = req.params.register;
    if (register) {
        try {
            const noteDeleted = await Notes.destroy({
                where: {
                    register : register
                }
            })
            res.json({
                delete: true,
                deleted: register
            });
        } catch (err) {
            res.status(500).send(err)
        }
    } else {
        res.status(400).json({ error: "the number register was not passed by params" });
    };
};
const deleteAll = async (rew, res) => {
    const all = await Notes.findAll()
        try {
            var array = []
            all.forEach(async y => {
                console.log(y.id)
                if (y.id) {
                    const deleted = await Notes.destroy({
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
    getAllNotes,
    doNewNote,
    deleteNote,
    deleteAll

}