import axios from "axios";
import { Navigate, useNavigate } from "react-router";

export const add_user = 'ADD_USER';
export const log_user = 'LOG_USER';
export const get_data_user = 'GET_DATA';

export function addUser(user) {
  return (dispatch) => {
    return axios.post(`http://localhost:3000/users/add_user`, {
      first_name: user.name,
      last_name: user.lastName,
      id: parseInt(user.document),
      email: user.email,
      password: user.password,
      city: user.city,
      role: user.role
    })
    .then(x => {
      if (x.data.error === 'the user already exist') {
        return alert('the user already exist');
      }else {
        alert('User Added Correctly');
        dispatch({ type: add_user, payload: { name: user.name, id: user.document, response:true} });
      };
    }, err => {
      console.log(err)
    });
  };
};
export function getData(user) {
  return (dispatch) => {
    return axios.get(`http://localhost:3000/user/data`, user)
    .then(data => {
      dispatch({
        type: get_data_user,
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    })
  }
};