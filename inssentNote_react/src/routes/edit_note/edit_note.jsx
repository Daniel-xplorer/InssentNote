import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios_credentials_head from "../../config/axios_credentials_head";


const EditNote = (props) => {
  const [state, setState] = useState({
    userId: localStorage.getItem('userID'),
    clientId: '',
    title: '',
    description: '',
    dateLimit: '',
    hourLimit: ''
  })

  const Axios = axios_credentials_head();
  const register = useParams().register

  //petición de la informacion de card por axios:
  useEffect(() => {
    Axios.get(`http://localhost:3000/notes/get_one_note/${register}`)
    .then(response => {
      setState(response.data);
      console.log(response);
    })
    .catch(err => {
      throw new TypeError(err);
    })
  },[]);

  const handleInfo = (x) => {
    x.preventDefault();
    setState({
      ...state,
      [x.target.name]: x.target.value
    });
  }

  const handleSave = (x) => {
    x.preventDefault();
    if (state.clientId === '') return alert('Put A Valid Client Id');
    if (state.title === '') return alert('Put A Valid Title');
    Axios.put(`http://localhost:3000/notes/upload_note/${register}`, state)
    .then(response => {alert(`The Note ${response.data} Have Been Changed`); console.log(response)})
    .catch(err => {//arreglar el manejo de errores
      alert (err);
    })
  };

  return (
  <div className="row justify-content-center">
    <div className="col-md-6  mt-5">
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputIdClient" className="form-label">Id Client</label>
          <input type="Id" className="form-control" id="inputIdClient" defaultValue={state.clientId}
            name="clientId" onChange={x => handleInfo(x)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Note Title</label>
          <input type="text" className="form-control" defaultValue={state.title}
            name="title" onChange={x => handleInfo(x)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows="3" 
            defaultValue={state.description} name="description" onChange={x => handleInfo(x)}
          ></textarea>
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="dateLimit">Date</label>
          <input type="date" className="form-control" id="dateLimit" defaultValue={state.dateLimit}
            name="dateLimit" onChange={x => handleInfo(x)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="hour-limit">Hour</label>
          <input type="time" className="form-control" id="hour-limit" defaultValue={state.hourLimit}
            name="hourLimit" onChange={x => handleInfo(x)}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary"
            onClick={x => handleSave(x)}
          >Save</button>
        </div>
      </form>
    </div>
  </div>
  );
};
export default EditNote;