import React, { useEffect, useState } from 'react';
import { GoHeart, GoHeartFill } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import { useFavorites } from '../FavoritesContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Collections({ data }) {
    const [hoverNo, setHoverNo] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedImages, setSelectedImages] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    useEffect(() => {
        try {
            setIsLoading(true);
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                setProducts([]);
                console.error('Invalid data format: Expected array but received', typeof data);
            }
        } catch (err) {
            setError(err.message);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }, [data]);

    const handleFavoriteClick = async (productId, e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!token) {
            toast.warning("Please login to add favorites");
            navigate('/login');
            return;
        }

        try {
            const isFavorite = favorites.some(fav => fav.product_id === productId);
            if (isFavorite) {
                await removeFavorite(productId);
                toast.success("Removed from favorites");
            } else {
                await addFavorite(productId);
                toast.success("Added to favorites");
            }
        } catch (error) {
            console.error('Error updating favorite:', error);
            toast.error(error.response?.data?.message || "Failed to update favorite");
        }
    };

    if (isLoading) {
        return (
            <div className='bg-[#1A3A37] w-full h-auto flex flex-col justify-center items-center py-10 xl:py-20 gap-10'>
                <div className='text-white text-xl'>Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='bg-[#1A3A37] w-full h-auto flex flex-col justify-center items-center py-10 xl:py-20 gap-10'>
                <div className='text-white text-xl'>Error loading products: {error}</div>
            </div>
        );
    }

    return (
        <div id='collections' className='bg-[#1A3A37] w-full h-auto flex flex-col justify-center items-center py-10 xl:py-20 gap-10'>
            <div className='flex flex-col justify-center items-center font-marcellus text-white gap-3 px-4 text-center'>
                <span className='tracking-[7px] text-xs sm:text-sm md:text-base text-white'>GLAMOROUS LIFE</span>
                <span className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-4'>Our New Collections</span>
            </div>
            
            <div className='product-slider w-full h-auto overflow-x-auto px-4 sm:px-10 flex gap-6 m-4 sm:m-10 md:h-[300px] xl:h-[400px]'>
                {products && products.length > 0 ? (
                    products.map((product, index) => {
                        const productId = product?._id || `product-${index}`;
                        const mainImage = selectedImages[productId] || product?.Image || '';
                        const productName = product?.name || 'Unnamed Product';
                        const productCategory = product?.category || 'Uncategorized';
                        const price = product?.quantityPrices?.[0]?.price || 'N/A';
                        const isFavorite = favorites.some(fav => fav._id === product._id);

                        return (
                            <NavLink 
                                state={{ product }} 
                                to={`/single-product/${productId}`} 
                                key={productId} 
                                onMouseEnter={() => setHoverNo(index)} 
                                onMouseLeave={() => setHoverNo('')} 
                                className={`${hoverNo === index ? 'md:h-[298px] xl:h-[378px]' : 'md:h-[270px] xl:h-[350px]'} min-w-[70vw] sm:min-w-[40vw] md:min-w-[30vw] lg:min-w-[25vw] h-auto pb-4 bg-gray-200 flex flex-col rounded-3xl p-1 duration-300 transition-all ease-in-out hover:shadow-lg`}
                            >
                                <div className='w-full h-52 xl:max-h-[400px] relative'>
                                    <img 
                                        src={mainImage} 
                                        alt={productName} 
                                        className='w-full h-full object-cover bg-gray-900 rounded-3xl mt-1' 
                                        onError={(e) => {
                                            e.target.src = ''; // Clear the broken image
                                            e.target.classList.add('hidden'); // Hide the broken image
                                        }}
                                    />
                                    {mainImage === '' && (
                                        <div className="absolute inset-0 bg-gray-300 rounded-3xl flex items-center justify-center">
                                            <span className="text-gray-600">Image not available</span>
                                        </div>
                                    )}
                                </div>
                                <div className='w-full h-auto flex justify-between mt-2 px-2 xl:text-2xl'>
                                    <span className='font-marcellus text-[#090909] w-[80%] truncate'>{productName}</span>
                                    <button 
                                        onClick={(e) => handleFavoriteClick(product.product_id, e)}
                                        className="text-[#B3B3B3] hover:text-red-500 transition-colors duration-200"
                                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        {isFavorite ? (
                                            <GoHeartFill className="text-red-500" size={20} />
                                        ) : (
                                            <GoHeart size={20} />
                                        )}
                                    </button>
                                </div>
                                <span className='text-[#5A5A5A] text-xs px-2 xl:text-base'>{productCategory}</span>
                                <div
                                    className={`${hoverNo === index ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-5"
                                        } md:w-full md:h-[100px] xl:h-[100px] md:flex md:justify-between md:mt-4 md:items-center md:px-2 transition-all duration-300 ease-in-out`}
                                >
                                    <span className="flex gap-2">
                                        {product?.Image1 && (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedImages(prev => ({
                                                        ...prev,
                                                        [productId]: product.Image1?.image,
                                                    }));
                                                }}
                                                className="h-4 w-4 rounded-full xl:h-6 xl:w-6 border-[1px] cursor-pointer"
                                                style={{ backgroundColor: `#${product.Image1?.color || 'ccc'}` }}
                                                aria-label={`Select ${product.Image1?.color || ''} color variant`}
                                            />
                                        )}
                                        {product?.Image2 && (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedImages(prev => ({
                                                        ...prev,
                                                        [productId]: product.Image2?.image,
                                                    }));
                                                }}
                                                className="h-4 w-4 rounded-full xl:h-6 xl:w-6 border-[1px] cursor-pointer"
                                                style={{ backgroundColor: `#${product.Image2?.color || 'ccc'}` }}
                                                aria-label={`Select ${product.Image2?.color || ''} color variant`}
                                            />
                                        )}
                                        {product?.Image3 && (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedImages(prev => ({
                                                        ...prev,
                                                        [productId]: product.Image3?.image,
                                                    }));
                                                }}
                                                className="h-4 w-4 rounded-full xl:h-6 xl:w-6 border-[1px] cursor-pointer"
                                                style={{ backgroundColor: `#${product.Image3?.color || 'ccc'}` }}
                                                aria-label={`Select ${product.Image3?.color || ''} color variant`}
                                            />
                                        )}
                                    </span>
                                    <span className="font-marcellus xl:text-lg">₹{price}</span>
                                </div>
                            </NavLink>
                        );
                    })
                ) : (
                    <div className="text-white text-center w-full">
                        No products available. Please check back later.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Collections;