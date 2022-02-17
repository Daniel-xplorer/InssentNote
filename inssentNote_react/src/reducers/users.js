import { add_user } from "../actions/users";

var initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case add_user:
      return state = [...state, action.payload];
    default: return state;
  }
}