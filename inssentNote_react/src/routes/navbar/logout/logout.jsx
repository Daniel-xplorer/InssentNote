
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../../config/axios_credentials_head";

const logout = () => {
  const navegate = useNavigate()
  let request = AxiosInstance()
  request.get(`http://localhost:3000/users/logout`)
  .then(x => {
    console.log('rr',x);
    localStorage.clear();
    navegate('/');
  })
  .catch(err => {
    navegate('/');
    throw new Error(err);
  })
  return (
    <div>
      You Are Unlogged.
    </div>
  )
};

export default logout;