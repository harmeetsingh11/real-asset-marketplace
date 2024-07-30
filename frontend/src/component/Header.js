// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/marketplace">Marketplace</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
