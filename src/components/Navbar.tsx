import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    return(
        <div className="navbar">
            <Link className="link" id="Home" to="/home">Home</Link>
            <div id="navspace"></div>
            <Link className="link" id="Appointment" to="/appointment">+</Link>
            <Link className="link" id="Account" to="/account">Account</Link>
            <Link className="link" id="Signout" to="/signout">Signout</Link>
        </div>
    )
}

export default Navbar;