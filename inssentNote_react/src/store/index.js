import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducers from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

const enhacers = process.env.NODE_ENV === "development" ?
composeWithDevTools(applyMiddleware(thunk)) :
applyMiddleware(thunk);

var store = createStore(rootReducers, enhacers);

export default store;