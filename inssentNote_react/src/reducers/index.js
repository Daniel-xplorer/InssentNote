import { combineReducers } from "redux";
import users from "./users";
import prueba from "./prueba";
import clients from "./clients";


export default combineReducers({
  users,
  clients
});