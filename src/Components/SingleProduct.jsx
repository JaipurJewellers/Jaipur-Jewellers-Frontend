import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { FaArrowRight } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { GoShareAndroid } from "react-icons/go";
import { IoMdStar } from "react-icons/io";
import { IoMdStarHalf } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { MdOutlineDone } from "react-icons/md";
import AuthContext from './AuthContext';
import { toast } from 'react-toastify';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon, EmailIcon } from "react-share";
import { useFavorites } from './FavoritesContext';

function SingleProduct() {
    const { addToCart } = useContext(CartContext);
    const { isAuthenticated } = useContext(AuthContext);
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const location = useLocation();
    const { product } = location.state || {};
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedQuantityPrice] = useState(product?.quantityPrices?.[0]);
    const [productImages, setProductImages] = useState([]);
    const [mainImage, setMainImage] = useState('');
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const navigate = useNavigate();

    // Fake data for specifications and reviews
    const specifications = [
        { label: 'Material', value: 'Premium Plastic' },
        { label: 'Dimensions', value: '40cm x 60cm x 20cm' },
        { label: 'Weight Capacity', value: '50 kg' },
        { label: 'Warranty', value: '2 Years' },
    ];

    const reviews = [
        // { user: 'John D.', rating: 5, comment: 'Excellent product, highly recommend!' },
        // { user: 'Sarah M.', rating: 4, comment: 'Good quality, fast delivery' },
        // { user: 'Mike R.', rating: 5, comment: 'Exceeded my expectations' },
    ];

    // Calculate translate value for the active tab indicator
    const getTranslateValue = () => {
        switch (activeTab) {
            case 'description':
                return '0%';
            case 'specification':
                return '100%';
            case 'reviews':
                return '200%';
            default:
                return '0%';
        }
    };

    // Check if product is in favorites on load
    useEffect(() => {
        if (product) {
            const isFav = favorites.some(fav => fav._id === product._id);
            setIsFavorite(isFav);
        }
    }, [favorites, product]);

    useEffect(() => {
        if (product) {
            const availableImages = [
                product?.Image,
                product?.Image1?.image,
                product?.Image2?.image,
                product?.Image3?.image
            ].filter(img => img);

            setProductImages(availableImages);
            setMainImage(availableImages[0] || '');
        }
    }, [product]);

    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToFavorites = async () => {
        if (!isAuthenticated) {
            toast.warning("Please login to add to favorites");
            navigate('/login');
            return;
        }
        toast.dismiss()
        try {
            if (isFavorite) {
                await removeFavorite(product.product_id);
                toast.success("Removed from favorites");
            } else {
                await addFavorite(product.product_id);
                toast.success("Added to favorites");
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error updating favorites:', error);
            toast.error(error.response?.data?.message || "Failed to update favorites");
        }
    };

    const handleAddToCart = () => {
        if (!product) return;
        toast.dismiss()

        if (isAuthenticated) {
            addToCart({
                product_id: product._id,
                name: product.name,
                Image: product.Image || '',
                quantity: quantity,
                price: selectedQuantityPrice.price,
                selectedQuantity: selectedQuantityPrice.quantity,
            });
            setIsAddedToCart(true);
            setTimeout(() => setIsAddedToCart(false), 2000);
            toast.success("Added to cart");
        } else {
            toast.warning("Please login to add to cart");
            navigate('/login')
        }
    };

    const handleShare = () => {
        setShowShareOptions(!showShareOptions);
    };

    const shareUrl = window.location.href;
    const shareTitle = `Check out this product: ${product?.name}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!product) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <p>Product not found</p>
            </div>
        )
    }

    return (
        <>
            <Header color={'#FAFAFA'} />
            <div className='w-full h-auto px-5 flex gap-3 font-marcellus py-10 font-semibold md:px-14 md:text-xl md:gap-5 xl:px-20 bg-[#FAFAFA]'>
                <span className='text-[#A7A7A7]'>Product</span>
                <span className='text-[#A7A7A7]'>{'>'}</span>
                <span className='text-[#344E41]'>{product.name}</span>
            </div>
            <div className='w-full h-auto flex flex-col gap-7 py-10 bg-[#FAFAFA] lg:flex-row xl:px-10 2xl:px-20'>
                <div className='w-full h-auto flex flex-col lg:w-[600px] xl:w-[840px] xl:gap-10'>
                    <div className='w-full h-auto flex flex-col gap-3'>
                        {mainImage && (
                            <div className='w-[90%] h-auto mx-auto md:w-[80%] lg:w-[90%] xl:h-[400px]'>
                                <img
                                    src={mainImage}
                                    alt="main product"
                                    className='w-full h-80 bg-gray-300 rounded-3xl object-cover xl:h-full xl:rounded-[50px]'
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Available';
                                    }}
                                />
                            </div>
                        )}
                        {productImages.length > 0 && (
                            <div className='product-slider w-full h-auto flex gap-3 px-3 overflow-x-scroll sm:justify-center'>
                                {productImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`product variant ${index}`}
                                        onClick={() => setMainImage(image)}
                                        className={`${mainImage === image ? 'border-2 border-[#344E41]' : ''} cursor-pointer w-20 h-20 bg-gray-300 rounded-xl object-cover sm:w-24 sm:h-24 lg:w-20 lg:h-20`}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/100x100?text=Image+Not+Available';
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='w-[95%] mx-auto h-auto rounded-3xl shadow-custom-shadow p-5 mt-4 border-[1px] border-[#1111111A] flex flex-col gap-6 sm:w-[85%] md:p-7 lg:w-[95%] xl:w-full xl:py-6 xl:rounded-[50px]'>
                        <div className='w-full h-auto flex justify-between'>
                            <div className='w-auto h-auto flex flex-col font-marcellus mr-2 lg:mr-0 lg:ml-3'>
                                <span className='text-[#111111B2] text-sm sm:text-base md:text-lg lg:text-base'>Price</span>
                                <span className='text-[#111111] text-lg sm:text-2xl md:text-3xl lg:text-2xl'>₹{product.quantityPrices[0].price.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={isAddedToCart}
                                className='flex-1 mx-3 h-auto bg-[#1A3A37] text-white flex justify-center gap-3 cursor-pointer items-center rounded-2xl font-marcellus'
                            >
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
                        <div className='w-full h-auto flex justify-center items-center flex-wrap gap-3'>
                            <button
                                onClick={handleAddToFavorites}
                                className='w-[140px] h-auto flex justify-center items-center gap-3 font-marcellus bg-[#FAFAFA] border-[1px] border-[#1111111A] py-2 rounded-2xl cursor-pointer md:text-base md:w-[160px] md:py-3 lg:w-[140px]'
                            >
                                {isFavorite ? (
                                    <GoHeartFill className='md:size-5 text-red-500' />
                                ) : (
                                    <GoHeart className='md:size-5' />
                                )}
                                Favorites
                            </button>

                            <div className='relative'>
                                <button
                                    onClick={handleShare}
                                    className='w-[140px] h-auto flex justify-center items-center gap-3 font-marcellus bg-[#FAFAFA] border-[1px] border-[#1111111A] py-2 rounded-2xl cursor-pointer md:text-base md:w-[160px] md:py-3 lg:w-[140px]'
                                >
                                    <GoShareAndroid className='md:size-5' /> Share
                                </button>

                                {showShareOptions && (
                                    <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-3 rounded-lg shadow-lg flex gap-2 z-50'>
                                        <FacebookShareButton url={shareUrl} quote={shareTitle}>
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={shareUrl} title={shareTitle}>
                                            <TwitterIcon size={32} round />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={shareUrl} title={shareTitle}>
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                        <EmailShareButton url={shareUrl} subject={shareTitle}>
                                            <EmailIcon size={32} round />
                                        </EmailShareButton>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-auto flex flex-col px-5'>
                    <div className='w-full h-auto font-marcellus md:text-lg lg:text-base xl:text-lg'>{product.product_id}</div>
                    <div className='w-full h-auto flex flex-col font-marcellus gap-3 my-5 sm:gap-5 xl:py-7 xl:pt-2'>
                        <span className='text-3xl text-[#111111] sm:text-4xl md:text-5xl lg:text-4xl xl:text-7xl'>{product.name}</span>
                        <div className='text-[#111111CC] text-sm flex gap-2 items-center sm:text-base md:text-lg lg:text-base xl:text-lg'>
                            <span>230 Sold · 4.8</span>
                            <div className='w-auto flex items-center'>
                                <IoMdStar size={15} className='text-yellow-400' />
                                <IoMdStar size={15} className='text-yellow-400' />
                                <IoMdStar size={15} className='text-yellow-400' />
                                <IoMdStar size={15} className='text-yellow-400' />
                                <IoMdStarHalf size={15} className='text-yellow-400' />
                            </div>
                        </div>
                        <span className='text-[#111111CC] text-sm sm:text-base md:text-lg lg:text-base xl:text-lg'>{product.desc}</span>
                    </div>
                    <div className='w-full h-auto flex flex-col'>
                        {/* Tabs Header */}
                        <div className='w-full h-auto flex justify-between items-center font-marcellus bg-[#ffffff] rounded-3xl px-5 py-2 text-sm sm:text-base sm:px-10 md:text-lg lg:text-base xl:text-lg md:justify-start md:gap-20 xl:gap-28'>
                            <button
                                onClick={() => setActiveTab('description')}
                                className={`${activeTab === 'description' ? 'text-[#111111]' : 'text-[#111111B2]'} w-1/3`}
                            >
                                Description
                            </button>
                            <button
                                onClick={() => setActiveTab('specification')}
                                className={`${activeTab === 'specification' ? 'text-[#111111]' : 'text-[#111111B2]'} w-1/3`}
                            >
                                Specification
                            </button>
                            <button
                                onClick={() => setActiveTab('reviews')}
                                className={`${activeTab === 'reviews' ? 'text-[#111111]' : 'text-[#111111B2]'} w-1/3`}
                            >
                                Reviews
                            </button>
                        </div>

                        {/* Active Tab Indicator */}
                        <div className='relative w-full mt-1'>
                            <div className='flex justify-between relative'>
                                {/* Dummy spaces to align with tabs */}
                                <div className='w-1/3' />
                                <div className='w-1/3' />
                                <div className='w-1/3' />
                            </div>
                            <div
                                className='absolute bottom-0 left-0 w-1/3 h-[2px] bg-[#111111] transition-transform duration-300 ease-in-out'
                                style={{ transform: `translateX(${getTranslateValue()})` }}
                            />
                        </div>

                        {/* Tab Content */}
                        <div className='relative w-full h-auto flex flex-col py-5 px-2 gap-8 md:py-10 xl:gap-10'>
                            {/* Description Content */}
                            {activeTab === 'description' && (
                                <>
                                    <div className='w-full h-auto flex flex-col font-marcellus gap-3 md:gap-6'>
                                        <span className='text-[#111111] text-xl sm:text-2xl md:text-3xl lg:text-2xl'>Model</span>
                                        <ul className='text-sm list-disc list-inside sm:text-base md:text-lg lg:text-base xl:text-lg'>
                                            <li>{product.model}</li>
                                        </ul>
                                    </div>

                                    <div className='w-full h-auto flex flex-col font-marcellus gap-3 md:gap-6'>
                                        <span className='text-[#111111] text-xl sm:text-2xl md:text-3xl lg:text-2xl'>Details</span>
                                        {Array.isArray(product.details) && product.details.map((item, index) => (
                                            <ul key={index} className='text-sm list-disc list-inside sm:text-base md:text-lg lg:text-base xl:text-lg'>
                                                <li>{typeof item === 'object' ? item.details : item}</li>
                                            </ul>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Specification Content */}
                            {activeTab === 'specification' && (
                                <div className='w-full h-auto flex flex-col gap-8 md:gap-10'>
                                    <div className='w-full h-auto flex flex-col font-marcellus gap-3 md:gap-6'>
                                        <span className='text-[#111111] text-xl sm:text-2xl md:text-3xl lg:text-2xl'>Additional Info</span>
                                        <div className='w-full h-auto flex flex-wrap items-center font-marcellus gap-3 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg'>
                                            {product.weight && (
                                                <div className='w-auto h-auto flex gap-1 items-center border-r-[1px] border-[#1111114D] px-4'>
                                                    <span className='text-[#111111B2]'>Weight :</span>
                                                    <span className='text-[#111111E5]'>{product.weight}</span>
                                                </div>
                                            )}
                                            {product.width && (
                                                <div className='w-auto h-auto flex gap-1 items-center px-4'>
                                                    <span className='text-[#111111B2]'>Width :</span>
                                                    <span className='text-[#111111E5]'>{product.width}</span>
                                                </div>
                                            )}
                                            {product.depth && (
                                                <div className='w-auto h-auto flex gap-1 items-center border-r-[1px] border-[#1111114D] px-5'>
                                                    <span className='text-[#111111B2]'>Depth :</span>
                                                    <span className='text-[#111111E5]'>{product.depth}</span>
                                                </div>
                                            )}
                                            {product.height && (
                                                <div className='w-auto h-auto flex gap-1 items-center px-4'>
                                                    <span className='text-[#111111B2]'>Height :</span>
                                                    <span className='text-[#111111E5]'>{product.height}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='w-full h-auto flex flex-col font-marcellus gap-3 md:gap-6'>
                                        <span className='text-[#111111] text-xl sm:text-2xl md:text-3xl lg:text-2xl'>Colors</span>
                                        <div className='w-full h-auto flex gap-4 items-center'>
                                            {product?.Image1?.color && (
                                                <div className='w-8 h-8 rounded-full flex justify-center items-center xl:w-10 xl:h-10'>
                                                    <span
                                                        className='w-6 h-6 rounded-full xl:w-8 xl:h-8 cursor-pointer border-[1px]'
                                                        style={{ backgroundColor: `#${product?.Image1.color}` }}
                                                    />
                                                </div>
                                            )}
                                            {product?.Image2?.color && (
                                                <div className='w-8 h-8 rounded-full flex justify-center items-center xl:w-10 xl:h-10'>
                                                    <span
                                                        className='w-6 h-6 rounded-full xl:w-8 xl:h-8 cursor-pointer border-[1px]'
                                                        style={{ backgroundColor: `#${product?.Image2.color}` }}
                                                    />
                                                </div>
                                            )}
                                            {product?.Image3?.color && (
                                                <div className='w-8 h-8 rounded-full flex justify-center items-center xl:w-10 xl:h-10'>
                                                    <span
                                                        className='w-6 h-6 rounded-full xl:w-8 xl:h-8 cursor-pointer border-[1px]'
                                                        style={{ backgroundColor: `#${product?.Image3.color}` }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Reviews Content */}
                            {activeTab === 'reviews' && (
                                <div className='w-full h-auto flex flex-col gap-8 md:gap-10'>
                                    <div className='w-full h-auto flex flex-col font-marcellus gap-3 md:gap-6'>
                                        <span className='text-[#111111] text-xl sm:text-2xl md:text-3xl lg:text-2xl'>Customer Reviews</span>
                                        <div className='space-y-6'>
                                            {
                                                reviews.length !== 0
                                                    ? reviews.map((review, index) => (
                                                        <div key={index} className='border-b border-[#1111111A] pb-6'>
                                                            <div className='flex items-center gap-3 mb-2'>
                                                                <span className='font-semibold text-[#111111E5]'>{review.user}</span>
                                                                <div className='flex gap-1'>
                                                                    {[...Array(review.rating)].map((_, i) => (
                                                                        <span key={i} className='text-yellow-500 text-lg'>★</span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <p className='text-[#111111B2] text-sm sm:text-base'>{review.comment}</p>
                                                        </div>
                                                    ))
                                                    : (
                                                        <div className='w-full h-auto flex flex-col gap-3'>
                                                            <span className='text-[#111111] text-lg sm:text-2xl md:text-3xl lg:text-2xl'>No reviews yet</span>
                                                        </div>
                                                    )

                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct
