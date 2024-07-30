// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AssetListing from './components/AssetListing';
import Marketplace from './components/Marketplace';
import AssetDetails from './components/AssetDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
    return (
        <div>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Marketplace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/list-asset" element={<AssetListing />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/marketplace/:assetId" element={<AssetDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
