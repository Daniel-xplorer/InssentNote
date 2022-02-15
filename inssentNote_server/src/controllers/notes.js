const Notes = require("../database/models/notes")


const getAllNotes = async (req, res) => {
    const allNotes = await Notes.findAll();
    if (allNotes.length < 1) res.json({failed: 'Dont have notes yet'});
    else res.json(allNotes);
}

module.exports = {
    getAllNotes,

}