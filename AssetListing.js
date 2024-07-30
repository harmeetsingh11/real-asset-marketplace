// src/components/AssetListing.js
import React, { useState } from 'react';
import axios from 'axios';

const AssetListing = () => {
    const [assetName, setAssetName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('assetName', assetName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('/api/asset/list', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // Handle successful asset listing
            console.log(response.data);
        } catch (error) {
            // Handle error
            console.error('Asset listing failed', error);
        }
    };

    return (
        <div>
            <h2>List New Asset</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Asset Name:
                    <input type="text" value={assetName} onChange={(e) => setAssetName(e.target.value)} required />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <label>
                    Price:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </label>
                <label>
                    Category:
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </label>
                <label>
                    Image:
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </label>
                <button type="submit">List Asset</button>
            </form>
        </div>
    );
};

export default AssetListing;
