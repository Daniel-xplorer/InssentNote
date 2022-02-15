const { getAllNotes, doNewNote, deleteNote, deleteAll } = require('../controllers/notes');


const router = require('express').Router();

router.get('/', getAllNotes);
router.post('/add_note/:userId', doNewNote);
router.delete('/delete_note/:register', deleteNote);


router.delete('/', deleteAll);//ayuda para borrar los datos en caso de cambios


module.exports = router;