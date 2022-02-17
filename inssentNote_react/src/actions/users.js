import axios from "axios";

export const add_user = 'ADD_USER';

export function addUser(user) {
  return (dispatch) => {
    return axios.post(`http://localhost:3000/users/add_user`, {
      first_name: user.name,
      last_name: user.lastName,
      id: user.document,
      email: user.email,
      password: user.password,
      city: user.city,
      role: user.role
    })
    .then(x => {
      if (x.data.error === 'the user already exist') {
        return alert('the user already exist');
      }else {
        alert('User Created');
        dispatch({ type: add_user, payload: { name: user.name, id: user.document } });
      };
    }, x => {
      console.log(x)
    });
  };
};