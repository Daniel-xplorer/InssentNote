const { getAllUsers, addUser, deleteUser, deleteAll } = require("../controllers/users");
const Users = require("../database/models/users");

const router = require("express").Router();

//las acciones para cada peticion se enviara a una funcion en controllers
router.get('/', getAllUsers);
router.post('/add_user', addUser);
router.delete('/delete_user/:userId', deleteUser);


router.delete('/', deleteAll);//ayuda para borrar los datos en caso de cambios

module.exports = router;