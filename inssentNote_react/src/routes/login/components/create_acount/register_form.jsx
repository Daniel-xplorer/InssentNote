import react, { useState } from "react";
import form from "./form.css";
import { connect } from "react-redux";
import { addUser } from "../../../../actions/users";
import { Link, useNavigate } from "react-router-dom";

var terms = false
const RegisterForm = (props) => {
  var [state, setState] = useState({
    name: '',
    lastName: '',
    documentType: '',
    document: '',
    email: '',
    password: '',
    repeatPass: '',
    city: '',
    role: '',
  });
  console.log('res',props.response)
  var [check, setCheck] = useState(true);
  const navigate = useNavigate()
  const handleName = (x) => {
    x.preventDefault();
    setState({
      ...state,
      name: x.target.value
    });
  };
  const handleLastName = (x) => {
    x.preventDefault();
    setState({
      ...state,
      lastName: x.target.value
    });
  };
  const handleEmail = (x) => {
    x.preventDefault();
    setState({
      ...state,
      email: x.target.value
    });
  };
  const isCC = () => {
    if(state.documentType === 'Cedula de Ciudadania'){
      return (
        <div className="form-group col-sm-6">
          <label htmlFor="inputEmail4">Document Id</label>
          <input type="documentId" className="form-control" id="inputDocumentId" 
            placeholder="Document Id"
            onChange={x => handleDocument(x)}
          />
        </div>
      )
    }
  }
  const docType = (x) => {
    x.preventDefault();
    setState({
      ...state,
      documentType: x.target.value
    });
  }
  const handleDocument = (x) => {
    x.preventDefault();
    console.log(typeof x.target.value)
    setState({
      ...state,
      document: x.target.value
    });
  };
  const handlePassword = (x) => {
    x.preventDefault();
    setState({
      ...state,
      password: x.target.value
    });
  };
  const handleRepeatPass = (x) => {
    x.preventDefault();
    setState({
      ...state,
      repeatPass: x.target.value
    });
  };
  const diferentPasswords = () => {
    if (state.password !== state.repeatPass && state.repeatPass !== '') {
      return(
        <div className="col-md-6 mb-3">
          <label htmlFor="validationServer03">City</label>
          <input type="password" className="form-control is-invalid" id="validationPassword3" placeholder="Password" required
            onChange={x => handleRepeatPass(x)}
          />
          <div className="invalid-feedback">
            The passwords are diferents.
          </div>
        </div>
      )
    } else {
      return(
        <div className="form-group col-sm-6">
            <label htmlFor="inputPassword4">Repeat Password</label>
            <input type="password" className="form-control" id="inputPasswordR4" placeholder="Password"
              onChange = {x => handleRepeatPass(x)}
            />
        </div>
      )
    }
  }
  const handleCity = (x) => {
    x.preventDefault();
    setState({
      ...state,
      city: x.target.value
    });
  };
  const handleRole = (x) => {
    x.preventDefault();
    setState({
      ...state,
      role: x.target.value
    });
  };

  //--- Handle Input ---
  function handleInput(x) {
    x.preventDefault();
    const regexEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const regexNumbers = /^[0-9]*$/
    if (!regexEmail.test(state.email)) {
      return alert('Add a correct email.')
    }
    if (!regexNumbers.test(state.document) || state.document === '') {
      return alert('the id document must be numeric.');
    }
    if (state.password.length < 6) {
      return alert('Password must be at least 6 characters long');
    }
    if (terms === false) {
      alert('The terms about data management was not accepted');
    }
    setCheck(true);
    let values = Object.values(state);
    let allInputs = true;
    values.forEach(element => {
      if(element === ''){
        allInputs = false;
        return setCheck(false);
      };
    });
    allInputs === true && props.addUser(state)
    //location.reload();
  };
  const error = () => {
    if (!check) {
      return (
          <div className="alert alert-danger" role="alert" id={form.check}>
            Incomplete Information.
          </div>
      )
    }
  };
  
  return(
    <div>
      { props.response && navigate('/') }
        { error() }
    <div className="container" id={form.container}>
      <form>
        <div className="form-row">
          {/* name */}
          <div className="form-group col-sm-6">
            <label htmlFor="inputEmail4">Name</label>
            <input type="name" className="form-control" id="inputName" 
              placeholder="Name"
              onChange={x => handleName(x)}
            />
          </div>
          {/* last name */}
          <div className="form-group col-sm-6">
            <label htmlFor="inputEmail4">Last Name</label>
            <input type="last name" className="form-control" id="inputLastName" 
              placeholder="Last Name"
              onChange={x => handleLastName(x)}
            />
          </div>
          {/* email */}
          <div className="form-group col-sm-6">
            <label htmlFor="inputEmail4">Email</label>
            <input type="email" className="form-control" id="inputEmail4" 
              placeholder="Email"
              onChange={x => handleEmail(x)}
            />
          </div>
          {/* document type */}
          <div className="form-group col-sm-4">
            <label htmlFor="inputState">Document Type</label>
            <select id="inputDocType" className="form-control" onChange={x => docType(x)}>
              <option>Choose...</option>
              <option>Cedula de Ciudadania</option>
              <option>Targeta de Identidad</option>
            </select>
          </div>
          {
            isCC()
          }
          {/* password */}
          <div className="form-group col-sm-6">
            <label htmlFor="inputPassword4">Password</label>
            <input type="password" className="form-control" id="inputPassword4" placeholder="Password"
              onChange={x => handlePassword(x)}
            />
          </div>
          { diferentPasswords() }
        </div>
        {/* city */}
        <div className="form-row">
          <div className="form-group col-sm-6">
            <label htmlFor="inputCity">City</label>
            <input type="text" className="form-control" id="inputCity" placeholder="City"
              onChange={x => handleCity(x)}
            />
          </div>
          {/* position */}
          <div className="form-group col-sm-4">
            <label htmlFor="inputState">Role</label>
            <select id="inputState" className="form-control" onChange={x => handleRole(x)}>
              <option>Choose...</option>
              <option>Planta</option>
              <option>Gerente</option>
            </select>
          </div>
        </div>
        {/* checkbox terms */}
        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck" 
              onChange={x => terms = x.target.checked}
            />
            <label className="form-check-label" htmlFor="gridCheck">
              Accept Terms
            </label>
          </div>
        </div>
        {/* submit butom */}
        <button type="submit" className="btn btn-primary" onClick={x => handleInput(x)}>Sign in</button>
        <Link to="/" id="emailHelp" className="form-text">Sing Up.</Link>
      </form>
    </div>
    </div>
  )
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => { dispatch(addUser(user)) }
  }
};
const mapStateToProps = (state) => {
  return {
    response: state.users.userUploaded.response
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);