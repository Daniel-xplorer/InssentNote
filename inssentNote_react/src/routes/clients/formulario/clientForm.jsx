import { useEffect } from "react";
import { connect } from "react-redux";
import { addClient } from "../../../actions/clients";

const { useState } = require("react");


const ClientForm = (props) => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    id: '',
    processType: ''
  });
  useEffect(() => {
    props.clientAdded.length && alert(`The Client ${state.firstName} Has Been Added.`)
  }, [])
  const userId = localStorage.getItem('userID');
  const handleChange = (x) => {
    x.preventDefault();
    setState({
      ...state,
      [x.target.name]: x.target.value
    });
  };
  const handleSave = (x) => {
    if (state.firtsname === '' && state.id === '') return alert('Incomplete Information');
    x.preventDefault();
    props.addClient(state, userId);
  };
  return (
    <div className="container col-md-6">
      { props.clientAdded.data && alert(`The client ${props.clientAdded.data.id}, was added.`) }
      <form>
        <div className="form-group">
          <label htmlFor="processType">Name</label>
          <input type="text" className="form-control" id="clientName" placeholder="User Name"
            name="firstName" onChange={x => handleChange(x)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientLastName">Last Name</label>
          <input type="text" className="form-control" id="clientLastName" placeholder="User Lastname"
            name="lastName" onChange={x => handleChange(x)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientId">Client Id</label>
          <input type="text" className="form-control" id="clientId" placeholder="User Id"
            name="id" onChange={x => handleChange(x)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="processType">State</label>
          <select id="processType" className="form-control" defaultValue="Choose..."
            name="processType" onChange={x => handleChange(x)}
          >
            <option>Choose...</option>
            <option>Problems Solutions</option>
            <option>Services Payes</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-1"
          onClick={x => handleSave(x)}
        >Submit</button>
      </form>
    </div>
  )
};
const mapDispatchToProps = (dispatch) => {
  return {
    addClient: (clientData, c) => { dispatch(addClient(clientData, c)) }
  }
};
const mapStateToProps = (state) => {
  return {
    clientAdded: state.clients.clientAdded
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClientForm);