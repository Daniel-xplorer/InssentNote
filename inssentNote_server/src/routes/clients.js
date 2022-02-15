const { getAllClients, addClient, deleteClient, deleteAll } = require('../controllers/clients');


const router = require('express').Router();

router.get('/', getAllClients);
router.post('/add_client/:userId', addClient);
router.delete('/delete_client/:clientId', deleteClient);


router.delete('/', deleteAll);//ayuda para borrar los datos en caso de cambios

module.exports = router