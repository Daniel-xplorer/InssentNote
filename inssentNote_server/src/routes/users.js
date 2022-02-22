const { getAllUsers, addUser, deleteUser, deleteAll, logInUser, logout, getUserData } = require("../controllers/users");
const { isAuthenticated, isNotAuthenticated } = require("./config/isAutenticated");

const router = require("express").Router();

//las acciones para cada peticion se enviara a una funcion en controllers
router.get('/', getAllUsers);
router.get('/data', getUserData);
router.post('/add_user', addUser);
router.delete('/delete_user/:userId', isAuthenticated, deleteUser);
router.post('/login', isNotAuthenticated, logInUser);
router.get('/logout', isAuthenticated, logout)


router.delete('/', deleteAll);//ayuda para borrar los datos en caso de cambios

module.exports = router;