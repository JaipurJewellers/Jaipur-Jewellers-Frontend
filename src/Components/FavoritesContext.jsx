import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const backend = import.meta.env.VITE_BACKEND_URL;

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Please login to view your favorites');
      }

      const response = await axios.get(`${backend}/api/v1/favorites/my-favorites`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const favoritesData = Array.isArray(response.data?.products) 
        ? response.data.products 
        : [];
      
      // Sanitize product details
      const sanitizedProducts = favoritesData.map(product => ({
        ...product,
        details: Array.isArray(product.details) 
          ? product.details.map(d => typeof d === 'object' ? d.details : d)
          : []
      }));

      setFavorites(sanitizedProducts);
      setError(null);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError(error.response?.data?.message || error.message);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${backend}/api/v1/favorites/add`, {productId:productId}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchFavorites(); // Refresh favorites list
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  };

  const removeFavorite = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${backend}/api/v1/favorites/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(favorites.filter(item => item.product_id !== productId));
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  };

  // Initialize favorites on mount
  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        loading, 
        error, 
        addFavorite, 
        removeFavorite,
        refreshFavorites: fetchFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}