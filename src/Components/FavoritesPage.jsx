// FavoritesPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('/api/favorites/my-favorites', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setFavorites(response.data.favorites);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    const handleProductClick = (product) => {
        navigate(`/product/${product.product_id}`, { state: { product } });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="favorites-container">
            <h1>Your Favorites</h1>
            <div className="favorites-grid">
                {favorites.map(product => (
                    <div 
                        key={product.product_id} 
                        className="favorite-item"
                        onClick={() => handleProductClick(product)}
                    >
                        <img src={product.Image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoritesPage;