import axios from "axios";


//todas las request que se hacen a una ruta en particular donde se inicia sesion
//debe tener las credenciales activas de lo contrario no registrara la session ID correcta
//para el navegador
export default function() {
  const token = localStorage.getItem('token');
  let auth;
  if (token) {
    auth = {'authorization': `Bearer ${token}`};
  };
  const AxiosInstance = axios.create({
    withCredentials: true,
    headers: auth
  });
  return AxiosInstance;
};
