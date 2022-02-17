import { add_prueba } from "../actions/prueba";


var initialState = [];

export default function (state = initialState, action) {
  if(action === add_prueba){
    return state.push(action.payload);
  }
  return state
}