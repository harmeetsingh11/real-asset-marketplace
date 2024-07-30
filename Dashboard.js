// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <ul>
                <li><Link to="/dashboard/wallet">Connect Wallet</Link></li>
                <li><Link to="/dashboard/list-asset">List New Asset</Link></li>
            </ul>
        </div>
    );
};

export default Dashboard;
