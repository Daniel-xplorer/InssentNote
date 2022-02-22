import React from "react";
import { connect } from "react-redux";
import styles from "./loginForm.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router";
import axios_credentials_head from "../../../../config/axios_credentials_head";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  };
  handleInputs = (x) => {
    x.preventDefault();
    this.setState({
      ...this.state,
      [x.target.name]: x.target.value
    });
  };
  onSubmit = (x) => {
    x.preventDefault();
    const request = axios_credentials_head();//setear el axios modificado para acceder a credenciales
    //y headers, El request debe contener las credenciales activas en el post, para poder instaurar
    //una session ID
    request.post(`http://localhost:3000/users/login`, this.state)
    .then(response => {
      console.log(response)
      if (response.data === 'User Not Found') {
        alert('User Not Found.');
        this.setState({email:'', password:''});
      } else {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('sessionID', response.data.sessionID);
        this.setState({change: true})
      };
    })
    .catch(err => {
      console.log(err);
    })
  };
  render() {
    return (
      <div id={styles.container}>
        {this.state.change == true && <Navigate to="/home"/>}
        <form onSubmit={x => this.onSubmit(x)}>
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input  className="form-control " id="InputEmail1" aria-describedby="emailHelp" 
            placeholder="Enter email" name="email" value={this.state.email}
              onChange={x => this.handleInputs(x)}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="InputPassword1" placeholder="Password"
              name="password" value={this.state.password} onChange={x => this.handleInputs(x)}
            />
          </div>
          <button type="submit" className="btn btn-primary" id={styles.submit}>
            Submit
          </button>
          <Link to="/register"id="emailHelp" className="form-text">Create Account.</Link>
        </ form>
      </div>
    )
  }
};

export default connect(null, {  })(LoginForm)