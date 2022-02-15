const { getAllUsers } = require("../controllers/users");
const Users = require("../database/models/users");

const router = require("express").Router();

//las acciones para cada peticion se enviara a una funcion en controllers
router.get('/', getAllUsers);

module.exports = router;