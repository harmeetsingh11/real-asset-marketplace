// src/components/AssetDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AssetDetails = () => {
    const { assetId } = useParams();
    const [asset, setAsset] = useState(null);

    useEffect(() => {
        const fetchAssetDetails = async () => {
            try {
                const response = await axios.get(`/api/asset/details?assetId=${assetId}`);
                setAsset(response.data);
            } catch (error) {
                console.error('Failed to fetch asset details', error);
            }
        };

        fetchAssetDetails();
    }, [assetId]);

    if (!asset) return <p>Loading...</p>;

    return (
        <div>
            <h2>{asset.assetName}</h2>
            <p>{asset.description}</p>
            <p>${asset.price}</p>
            <img src={asset.images[0]} alt={asset.assetName} />
            <button>Add to Cart</button>
        </div>
    );
};

export default AssetDetails;
