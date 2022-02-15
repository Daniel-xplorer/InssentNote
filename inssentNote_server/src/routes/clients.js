const { getAllClients } = require('../controllers/clients');


const router = require('express').Router();

router.get('/', getAllClients);

module.exports = router