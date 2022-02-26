import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllClients } from "../../../actions/clients";
import axios_credentials_head from "../../../config/axios_credentials_head";


const ClientList = (props) => {

  useEffect(() => {
    props.getAllClients();
  }, []);
  const Axios = axios_credentials_head();
  const showClients = () => {
    return props.clients.map((client) => {
      const onDelete = (x) => {
        x.preventDefault();
        Axios.delete(`http://localhost:3000/clients/delete_client/${client.id}`)
        .then(r => alert(`Client ${client.firstName} Deleted.`))
        .catch(err => alert('Client Not Was Deleted: ', err))
      };
      return (
        <div key={client.id} className="accordion accordion-flush" id="accordionFlush">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${client.firstName}${client.id}`} aria-expanded="false" aria-controls="flush-collapseOne">
                { client.firstName + ' ' + client.lastName }
              </button>
            </h2>
            <div id={`${client.firstName}${client.id}`} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlush">
              <div className="accordion-body">
                {/* contenido del acordeon */}
                <div>
                  <div className="card">
                    <div className="card-header">
                      Id: { client.id }
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Number to notes: { client.notes.length }</h5>
                      <p className="card-text">Created At: { Date(client.createdAt) }</p>
                      <button className="btn btn-danger" onClick={x => onDelete(x)}>Delete Client</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      );
    })
  };
  return (
    <div className="row justify-content-center">
      {props.clients.length ? 'all clients' : 'Dont have Clients Yet'}
      <div className="d-md-flex justify-content-md-end mr-2">
        <Link to="/clients/register" className="btn btn-warning">Add Client</Link>
      </div>
      { showClients() }
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    clients: state.clients.allClients
  };
};
export default connect(mapStateToProps, { getAllClients })(ClientList);