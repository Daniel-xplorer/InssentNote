const { getAllNotes, doNewNote, deleteNote, deleteAll, getNotesByDate, getAllNotesByUser, changeState, getOneNote, updateNote } = require('../controllers/notes');
const { isAuthenticated } = require('./config/isAutenticated');


const router = require('express').Router();

router.get('/', getAllNotes);
router.post('/add_note/:userId', doNewNote);
router.delete('/delete_note/:register', deleteNote);
router.get('/get_notes', /*isAuthenticated,*/ getNotesByDate)
router.get('/get_all', getAllNotesByUser);
router.get('/get_one_note/:idNote', getOneNote);
router.put('/upload_note/:register', updateNote);
router.put('/check/:idNote', changeState);


router.delete('/', deleteAll);//ayuda para borrar los datos en caso de cambios


module.exports = router;