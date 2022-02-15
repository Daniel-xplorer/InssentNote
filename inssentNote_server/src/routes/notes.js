const { getAllNotes } = require('../controllers/notes');


const router = require('express').Router();

router.get('/', getAllNotes);

module.exports = router;