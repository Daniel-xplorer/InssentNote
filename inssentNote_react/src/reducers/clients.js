import { add_client, get_all_clients } from "../actions/clients";

var initialState = {
  allClients: [],
  clientAdded: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case (add_client):
      return state = {
        ...state,
        clientAdded: action.payload
      };
    case get_all_clients:
      return state = {
        ...state,
        allClients: action.payload
      };
    default: return state;
  }
};
