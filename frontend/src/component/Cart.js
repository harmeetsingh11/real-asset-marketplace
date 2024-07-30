// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('/api/cart/view');
                setCartItems(response.data.cartItems);
                setTotalPrice(response.data.totalPrice);
            } catch (error) {
                console.error('Failed to fetch cart items', error);
            }
        };

        fetchCart();
    }, []);

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.cartItemId}>
                        {item.assetName} - ${item.price}
                    </li>
                ))}
            </ul>
            <p>Total Price: ${totalPrice}</p>
            <Link to="/checkout"><button>Proceed to Checkout</button></Link>
        </div>
    );
};

export default Cart;
