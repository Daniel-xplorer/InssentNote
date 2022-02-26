import axios_credentials_head from "../config/axios_credentials_head";

export const add_client = 'ADD_CLIENT';
export const get_all_clients = 'GET_ALL_CLIENTS';

const Axios = axios_credentials_head();
export function addClient(clientData, userId) {
  return async (dispatch) => {
    try {
      const newClient = await Axios.post(`http://localhost:3000/clients/add_client/${userId}`, {
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        id: clientData.id,
        processType: clientData.processType
      });
      return dispatch({
        type: add_client,
        payload: newClient
      })
    } catch (err) {
      console.log(err)
      throw new TypeError(err);
    };
  }
};

export function getAllClients() {
  return async (dispatch) => {
    try {
      const userId = localStorage.getItem('userID');
      const clients = await Axios.get(`http://localhost:3000/clients/get_all/${userId}`);
      return dispatch({
        type: get_all_clients,
        payload: clients.data
      });
    } catch (err) {
      alert(err);
    };
  };
};