import React, { useEffect, useState, useContext } from 'react';
import Header from './Header';
import { IoIosSearch, IoIosHeart } from "react-icons/io";
import { GoHeart, GoHeartFill } from "react-icons/go";
import axios from 'axios';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';
import { toast } from 'react-toastify';

const backend = import.meta.env.VITE_BACKEND_URL;

function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchProduct, setSearchProduct] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("Necklace");
    const [allProducts, setAllProducts] = useState([]);
    const [selectedImages, setSelectedImages] = useState({});
    const [categoryImage, setCategoryImage] = useState("");
    const [showFavoritesTooltip, setShowFavoritesTooltip] = useState(false);

    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const location = useLocation();
    const navigate = useNavigate();
    const category = location.state?.category;

    async function fetchProducts() {
        try {
            setLoading(true);
            const response = await axios.get(`${backend}/api/v1/products/get-all-products`);
            const productArr = response.data;
            setAllProducts(productArr);

            const specificProducts = productArr.filter(item => item.category === selectedCategory);
            if (response.status === 200) {
                setProducts(specificProducts);
                setLoading(false);

                if (specificProducts.length > 0) {
                    setCategoryImage(specificProducts[0]?.Image);
                } else {
                    setCategoryImage("");
                }
            }
        } catch (error) {
            console.log("error while fetching products", error);
            setLoading(true);
        }
    }

    function handleSearchProduct() {
        if (searchProduct.length > 0) {
            const filteredProducts = allProducts.filter(product =>
                product.name.toLowerCase().includes(searchProduct.toLowerCase())
            );
            setProducts(filteredProducts);
        } else {
            fetchProducts();
        }
    }

    const handleFavoriteClick = async (productId, e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const isFavorite = favorites.some(fav => fav._id === productId);
            if (isFavorite) {
                await removeFavorite(productId);
                toast.success("Removed from favorites");
            } else {
                await addFavorite(productId);
                toast.success("Added to favorites");
            }

            // Update the local state to reflect the change immediately
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product._id === productId
                        ? { ...product, isFavorite: !isFavorite }
                        : product
                )
            );
        } catch (error) {
            console.error("Error updating favorite:", error);
            toast.error(error.response?.data?.message || "Failed to update favorite");
        }
    };

    const navigateToFavorites = () => {
        navigate('/favorites');
    };

    useEffect(() => {
        if (category) {
            setSelectedCategory(category);
        }
        fetchProducts();
        window.scrollTo(0, 0);
    }, [selectedCategory]);

    useEffect(() => {
        handleSearchProduct();
    }, [searchProduct]);

    return (
        <>
            <Header color={'#FAFAFA'} />
            <div className='w-full h-auto flex flex-col py-10 bg-[#FAFAFA] gap-10'>
                {/* Floating Favorites Button */}
                <div 
                    className="fixed right-6 bottom-6 z-50"
                    onMouseEnter={() => setShowFavoritesTooltip(true)}
                    onMouseLeave={() => setShowFavoritesTooltip(false)}
                >
                    <button
                        onClick={navigateToFavorites}
                        className="bg-[#1A3A37] text-white p-4 rounded-full shadow-lg hover:bg-[#2a5a57] transition-colors duration-300 flex items-center justify-center relative"
                        aria-label="View favorites"
                    >
                        <IoIosHeart size={28} />
                        {favorites.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                                {favorites.length}
                            </span>
                        )}
                    </button>
                    {showFavoritesTooltip && (
                        <div className="absolute right-16 bottom-2 bg-[#1A3A37] text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
                            View your favorites ({favorites.length})
                        </div>
                    )}
                </div>

                <div className='w-[90%] h-[250px] mx-auto sm:h-[350px] lg:h-[450px] 2xl:h-[600px]'>
                    {categoryImage ? (
                        <img
                            src={categoryImage}
                            alt="Category Image"
                            className='w-full h-full object-cover rounded-3xl'
                            onError={(e) => {
                                e.target.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
                                e.target.alt = 'Image not available';
                            }}
                        />
                    ) : (
                        <div className="bg-gray-200 w-full h-full rounded-3xl flex items-center justify-center">
                            <span className="text-gray-500">No image available</span>
                        </div>
                    )}
                </div>

                <div className='w-full h-auto flex flex-col px-5 md:w-[90%] md:mx-auto gap-5 md:gap-10'>
                    <div className='w-full h-auto flex flex-col justify-center items-center gap-5 md:flex-row md:justify-between'>
                        <div className='w-auto h-auto flex gap-1 bg-[#F0F0F1] items-center px-5 rounded-3xl md:w-[400px] lg:w-[350px]'>
                            <IoIosSearch size={25} className='lg:size-8 text-[#B6B6B7]' />
                            <input
                                type="text"
                                placeholder='Search'
                                value={searchProduct}
                                onChange={(e) => setSearchProduct(e.target.value)}
                                className='w-full h-auto bg-transparent outline-none p-2 py-3 text-sm lg:py-4'
                            />
                        </div>
                        <div className='product-slider w-full h-auto flex overflow-scroll font-marcellus gap-3 md:w-auto'>
                            {["Necklace", "Pendant", "Earring", "Ring", "Bracelet"].map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedCategory(item)}
                                    className={`${selectedCategory === item ? 'bg-[#1A3A37] text-[#FEFEFE]' : 'border-[1px] border-[#B6B6B7] text-[#B6B6B7]'} min-w-[110px] h-auto flex justify-center items-center py-2 rounded-xl cursor-pointer lg:py-4 lg:w-[150px]`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='w-full h-auto flex flex-wrap gap-6'>
                        {loading ? (
                            <div className='w-full h-80 flex justify-center items-center'>
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1A3A37]"></div>
                            </div>
                        ) : products.length > 0 ? (
                            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6'>
                                {products.map((product) => {
                                    const isFavorite = favorites.some(fav => fav._id === product._id);

                                    return (
                                        <div key={product._id} className='group w-[300px] h-auto flex flex-col mx-auto'>
                                            <NavLink
                                                state={{ product }}
                                                to={`/single-product/${product._id}`}
                                                className='w-full h-full flex flex-col bg-[#FEFDFD] p-1 rounded-[29px] gap-2 lg:p-1.5 cursor-pointer md:hover:bg-[#1A3A37] md:hover:text-white duration-500 ease-in-out transition-all'
                                            >
                                                <div className="relative">
                                                    <img
                                                        src={selectedImages[product._id] || product?.Image}
                                                        alt={product.name}
                                                        className='w-full h-[200px] mx-auto bg-gray-200 object-cover rounded-[30px] lg:h-[250px]'
                                                        onError={(e) => {
                                                            e.target.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
                                                            e.target.alt = 'Image not available';
                                                        }}
                                                    />
                                                    <button
                                                        onClick={(e) => handleFavoriteClick(product.product_id, e)}
                                                        className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                                                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                                    >
                                                        {isFavorite ? (
                                                            <GoHeartFill size={20} className="text-red-500" />
                                                        ) : (
                                                            <GoHeart size={20} className="text-gray-600" />
                                                        )}
                                                    </button>
                                                </div>
                                                <div className='w-full h-auto flex flex-col mt-2 items-center px-3 lg:mt-3'>
                                                    <div className='w-full h-auto flex justify-between items-center'>
                                                        <span className='font-marcellus text-2xl truncate w-[80%]'>
                                                            {product.name}
                                                        </span>
                                                        {isFavorite && (
                                                            <span className="text-xs text-[#1A3A37] bg-[#e8f0ef] px-2 py-1 rounded">
                                                                In favorites
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className='w-full h-auto text-[#5A5A5A] text-sm lg:text-base group-hover:text-white duration-500 ease-in-out transition-all'>
                                                        {product.category}
                                                    </span>
                                                    <div className='w-full h-auto flex justify-between my-2 items-center lg:mt-4'>
                                                        <span className='flex gap-2'>
                                                            {[product?.Image1, product?.Image2, product?.Image3].map((img, idx) => (
                                                                img?.image && (
                                                                    <button
                                                                        key={idx}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            setSelectedImages((prevState) => ({
                                                                                ...prevState,
                                                                                [product._id]: img.image,
                                                                            }));
                                                                        }}
                                                                        className="h-4 w-4 border-[1px] lg:border-2 rounded-full lg:w-6 lg:h-6 cursor-pointer"
                                                                        style={{ backgroundColor: `#${img.color || 'ccc'}` }}
                                                                        aria-label={`Select color variant`}
                                                                    />
                                                                )
                                                            ))}
                                                        </span>
                                                        <span className='font-marcellus text-lg lg:text-xl'>
                                                            ₹{product.quantityPrices[0]?.price?.toLocaleString() || 'N/A'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className='w-full h-80 flex justify-center items-center font-marcellus text-xl text-gray-500'>
                                No products found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;