import { add_user, get_data_user, user_logged } from "../actions/users";

var initialState = {
  userUploaded: {response: false},
  userData: {},
  userLoged: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case add_user:
      return state = {...state, userUploaded : action.payload};
    case get_data_user:
      return state = {...state, userData : action.payload}
    case user_logged:
      return state = {...state, userLoged: action.payload}
    default: return state;
  }
};