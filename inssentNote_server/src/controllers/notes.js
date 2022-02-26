const { Op } = require("sequelize");
const Clients = require("../database/models/clients");
const Notes = require("../database/models/notes");
const Users = require("../database/models/users");



const getAllNotes = async (req, res) => {
    const allNotes = await Notes.findAll();
    if (allNotes.length < 1) res.json({failed: 'Dont have notes yet'});
    else res.json(allNotes);
};
const doNewNote = async (req, res) => {
    let {description, clientId, hourLimit, dateLimit, title} = req.body;
    const userId = req.params.userId;
    try {
        if (dateLimit === '') {
            const date = new Date();
            date.setDate(date.getDate() + 2);
            dateLimit = date.toISOString();
        };
        if (hourLimit === '') {
            const date = new Date().toISOString();
            hourLimit = date.split('T')[1];
        }
        if (description && clientId && userId) {
            const client = await Clients.findByPk(clientId);
            if (!client) return res.status(400).json({ error: "the client does not exist" });
            const user = await Users.findByPk(userId);
            if (!user) return res.status(400).json({ error: `not exist the user with id ${userId}` })
            if (client.userId !== user.id) return res.status(500).json({ error: "this user can not add notes over this client" });
            let newNote = await Notes.create({
                title: title,
                description: description,
                clientId: clientId,
                dateLimit: dateLimit,
                hourLimit: hourLimit,
            });
            await user.addNote(newNote);
            res.json({ note: newNote.register });
        } else {
            res.status(400).json({error: "did not send complete information"});
        };
    } catch (err) {
        console.log(err)
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

const getNotesByDate = async (req, res) => {
    const idUser = req.query.userId;
    const dateLimit = req.query.dateLimit;
    console.log(dateLimit, idUser)
    if (!idUser) return res.json({ msg: 'Dont Have idUser In Params.' });
    // if (req.user.id !== parseInt(idUser)) return res.status(401).json({error: 'Inauthorizated'});
    try {
        let notes = await Notes.findOne({
            where: { userId: idUser, dateLimit: dateLimit }
        })
        if (notes.length < 0) return res.json({ msg: 'Dont Have Notes Yet.' })
        res.send(notes);
    } catch (err) {
        console.log(err)//arreglar este manejo de error
    };
}

const getAllNotesByUser = async (req, res) => {
    const idUser = req.query.userId;
    try {
        const response = await Notes.findAll({
            where: {
                userId: idUser,
            },
            include: Clients,
            order: [['dateLimit', 'ASC']]
        });
        if (!response.length) {
            res.json({ msg: 'Not Exist Registers.'});
        } else {
            res.json(response);
        }
    } catch (err) {
        console.log(err);//arreglar este manejo de error
    };
};

const getOneNote = async (req, res) => {
    const idNote = req.params.idNote;
    try {
        const note = await Notes.findByPk(idNote);
        res.json(note);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    };
};

const updateNote = async (req, res) => {
    const idNote = req.params.register;
    const {
        clientId,
        title,
        description,
        dateLimit,
        hourLimit
    } = req.body;
    try {
        await Notes.update(
            {
                clientId: clientId,
                title: title,
                description: description,
                dateLimit: dateLimit,
                hourLimit: hourLimit
            },{
                where: {register: idNote}
            }
        )
        res.send(idNote);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    };
};

const changeState = async (req, res) => {
    const noteId = req.params.idNote
    const state = req.body.state
    try {
        const note = await Notes.update(
            {
                state: state
            },{
                where: {register: noteId}
            }
            );
            console.log(noteId, note, state)
        res.json(note)
    } catch (err) {
        console.log(err);////
    };
};

const deleteAll = async (rew, res) => {
    const all = await Notes.findAll()
        try {
            var array = []
            all.forEach(async y => {
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
    deleteAll,
    getNotesByDate,
    getOneNote,
    updateNote,
    changeState,
    getAllNotesByUser

}