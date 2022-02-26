import { Link } from "react-router-dom";
import axios_credentials_head from "../../../../config/axios_credentials_head";
import style from "./cards.css";



const NoteCards = (props) => {
  const Axios = axios_credentials_head();
  const handleCompleted = (x) => {
    console.log(x)
    if (x.target.checked === false) {
      let save = confirm('Are you sure check like complete this note')
      save === true &&
      Axios.put(`http://localhost:3000/notes/check/${props.notes.register}`,{
        state: 'incompleted'
      })
      .then(response => {}, err => {alert(err)})
    } else {
      let save = confirm('Are you sure check like complete this note')
      save === true &&
      Axios.put(`http://localhost:3000/notes/check/${props.notes.register}`,{
        state: 'completed'
      })
      .then(() => {}, (err) => {alert(err)})
    };
  };

  return (
    <div className=" row justify-content-center mt-3">
      <div className="card" id={style.hcard}>
        <div className="card-header d-flex justify-content-between">
          <h5>Client Name: {props.notes.client.name}</h5>
          <h5>Id: {props.notes.clientId}</h5>
          <p className="card-text">{props.notes.dateLimit}</p>
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.notes.title}</h5>
          <p className="card-text">{props.notes.description}</p>
          <p className="card-text">Created At: {props.notes.createdAt.split('T')[0]}</p>
          <div className="d-flex justify-content-between">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="completed" defaultChecked={true}
                onChange={x => handleCompleted(x)}
              />
              <label className="form-check-label" htmlFor="completed">
                Completed
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default NoteCards;