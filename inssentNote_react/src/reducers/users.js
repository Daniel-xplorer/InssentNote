import { add_user, get_data_user } from "../actions/users";

var initialState = {
  userUploaded: {response: false},
  userData: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case add_user:
      return state = {...state, userUploaded : action.payload};
    case get_data_user:
      return state = {...state, userData : action.payload}
    default: return state;
  }
};