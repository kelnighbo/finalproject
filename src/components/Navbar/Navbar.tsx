import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
        <div className="navbar">
            <Link to="/home">Home</Link>
            <Link to="/account">Account</Link>
            <Link to="/appointment">+</Link>
        </div>
}

export default Navbar;