// src/components/Marketplace.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Marketplace = () => {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await axios.get('/api/asset/browse');
                setAssets(response.data.assets);
            } catch (error) {
                console.error('Failed to fetch assets', error);
            }
        };

        fetchAssets();
    }, []);

    return (
        <div>
            <h2>Marketplace</h2>
            <div>
                {assets.map(asset => (
                    <div key={asset.assetId}>
                        <h3>{asset.assetName}</h3>
                        <p>${asset.price}</p>
                        <Link to={`/marketplace/${asset.assetId}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;
