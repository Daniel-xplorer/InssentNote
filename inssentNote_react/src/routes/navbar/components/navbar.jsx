import React from "react";
import { Link } from "react-router-dom";
import detalles from "./navbar.css";

const Navbar = (props) => {
    return(
        <nav className="container d-flex justify-content-center navbar navbar-expand-lg navbar-light bg-light ">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link id={detalles.home} className="navbar-brand" to="/home">Home</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <Link className="nav-link" to="/clients">Clients</Link>
                </li>
            </ul>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <Link className="nav-link" to="notes">Notes</Link>
                </li>
            </ul>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <Link className="nav-link" to="options">Options</Link>
                </li>
            </ul>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <Link className="nav-link" to="/logout">Logout</Link>{/*crear el log out*/}
                </li>
            </ul>
            <form id={detalles.form} className="form-inline my-2 my-lg-0">
                <input  className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            </div>
        </nav>
    )

    
};

export default Navbar;