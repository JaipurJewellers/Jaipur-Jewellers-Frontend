import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { useFavorites } from '../Components/FavoritesContext';
import { CartContext } from './CartContext';
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";

function FavoritesPage() {
    const { favorites, loading, error, removeFavorite } = useFavorites();
    const { addToCart } = useContext(CartContext);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    const handleProductClick = (product) => {
        if (!product?._id) return;
        navigate(`/single-product/${product._id}`, { state: { product } });
    };

    const handleRemoveFavorite = async (productId, e) => {
        e.stopPropagation();
        try {
            await removeFavorite(productId);
        } catch (error) {
            console.error('Failed to remove favorite:', error);
        }
    };
    const handleAddToCart = (product) => {
            if (!product) return;
            
            if (token) {
                addToCart({
                    product_id: product._id,
                    name: product.name,
                    Image: product.Image || '',
                    quantity: 1,
                    price: product.price,
                    selectedQuantity: 1,
                });
                setIsAddedToCart(true);
                alert("Product added.")
                setTimeout(() => setIsAddedToCart(false), 2000);
            } else {
                toast.warning("Please login to add to cart");
                navigate('/login')
            }
        };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Favorites</h1>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-pulse flex flex-col items-center">
                        <FaHeart className="text-4xl text-pink-500 mb-4" />
                        <p className="text-lg text-gray-600">Loading your favorite items...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Favorites</h1>
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Favorites</h1>
            
            {favorites.length === 0 ? (
                <div className="text-center py-16">
                    <FaRegHeart className="mx-auto h-16 w-16 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No favorites yet</h3>
                    <p className="mt-2 text-gray-500">Start adding your favorite jewelry pieces to see them here.</p>
                    <div className="mt-6">
                        <button
                            onClick={() => navigate('/collections')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FiShoppingBag className="-ml-1 mr-2 h-5 w-5" />
                            Browse Collections
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {favorites.map(product => {
                        const productId = product?._id || Math.random().toString(36).substr(2, 9);
                        const productImage = product?.Image || 'https://via.placeholder.com/300x300?text=No+Image';
                        const productName = product?.name || 'Unnamed Product';
                        const productPrice = product?.quantityPrices?.[0]?.price 
                            ? `₹${product.quantityPrices[0].price.toLocaleString()}` 
                            : 'Price not available';
                        const productCategory = product?.category || 'Jewelry';

                        return (
                            <div 
                                key={productId}
                                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                onClick={() => handleProductClick(product)}
                            >
                                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
                                    <img
                                        src={productImage}
                                        alt={productName}
                                        className="w-full h-64 object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Available';
                                        }}
                                    />
                                    <button
                                        onClick={(e) => handleRemoveFavorite(product._id, e)}
                                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors duration-200"
                                        aria-label="Remove from favorites"
                                    >
                                        <FaHeart className="h-5 w-5 text-pink-500" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{productName}</h3>
                                            <p className="mt-1 text-sm text-gray-500">{productCategory}</p>
                                        </div>
                                        <p className="text-lg font-medium text-gray-900">{productPrice}</p>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddToCart(product)
                                            }}
                                        >
                                            <FiShoppingBag className="-ml-1 mr-2 h-5 w-5" />
                                            {isAddedToCart ? (
                                                                                <div className='w-auto h-auto flex justify-center items-center gap-3'>
                                                                                    Added to cart
                                                                                    <MdOutlineDone />
                                                                                </div>
                                                                            ) : (
                                                                                <div className='w-auto h-auto flex justify-center items-center gap-3'>
                                                                                    Add to cart
                                                                                    <FaArrowRight />
                                                                                </div>
                                                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default FavoritesPage;