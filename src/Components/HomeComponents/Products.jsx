import { useEffect, useState, useContext } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
import Necklace from "../../assets/neclace.png";
import { useFavorites } from "../FavoritesContext";
import { toast } from "react-toastify";

function Products({ data }) {
  const [products, setProducts] = useState([]);
  const [floatingProducts, setFloatingProducts] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    try {
      setIsLoading(true);
      const safeData = Array.isArray(data) ? data : [];

      setProducts(safeData.slice(0, 3));
      setFloatingProducts(safeData.slice(0, 5));
    } catch (err) {
      setError(err.message);
      setProducts([]);
      setFloatingProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  const handleFavoriteClick = async (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    toast.dismiss()

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
      console.error("Error updating favorite:", error);
      toast.error(error.response?.data?.message || "Failed to update favorite");
    }
  };

  const getSafePrice = (product) => {
    try {
      return product?.quantityPrices?.[0]?.price || 'N/A';
    } catch {
      return 'N/A';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-auto flex pb-5 xl:pb-20 bg-[#FAFAFA] justify-center items-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-auto flex pb-5 xl:pb-20 bg-[#FAFAFA] justify-center items-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto flex pb-5 xl:pb-20 bg-[#FAFAFA] pt-10">
      <div className="w-full h-auto flex flex-col relative gap-5 xl:flex-row xl:gap-10 px-4 md:px-10">
        <div className="w-full h-auto flex flex-col xl:w-[60vw]">
          <div className="w-full h-auto flex flex-col font-marcellus justify-center text-2xl gap-1 px-5 sm:text-5xl sm:my-4 md:text-6xl xl:text-5xl 2xl:text-6xl xl:px-10">
            <span>Adorn Yourself in Elegance</span>
            <span>with Exquisite Jewellery</span>
          </div>
          <div className="w-full h-auto flex flex-col bg-[#FAFAFA]">
            <div className="product-slider w-full h-auto flex py-6 overflow-x-scroll gap-6 px-8 xl:gap-3 xl:px-2 xl:overflow-hidden">
              {products?.length > 0 ? (
                products.map((product, index) => {
                  const productId = product?._id || `temp-${index}`;
                  const mainImage = selectedImages[productId] || product?.Image || '';
                  const productName = product?.name || 'Unnamed Product';
                  const productCategory = product?.category || 'Uncategorized';
                  const price = getSafePrice(product);
                  const isFavorite = favorites.some(fav => fav._id === product._id);

                  return (
                    <div key={productId} className="min-w-[70vw] sm:min-w-[40vw] md:min-w-[22vw] lg:min-w-[20vw] xl:min-w-[19vw] 2xl:min-w-[18vw]">
                      <NavLink
                        state={{ product }}
                        to={`/single-product/${productId}`}
                        className="group bg-white p-3 shadow-md rounded-[50px] h-[300px] flex flex-col hover:shadow-lg transition-shadow duration-300 ease-in-out"
                      >
                        <div className="w-full h-[200px] overflow-hidden rounded-[50px]">
                          <img
                            src={mainImage}
                            alt={productName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Available';
                            }}
                          />
                        </div>
                        <div className="flex flex-col flex-grow justify-between pt-3 px-2">
                          <div className="flex justify-between items-start">
                            <span className="font-marcellus text-lg truncate max-w-[70%]">
                              {productName}
                            </span>
                            <button
                              onClick={(e) => handleFavoriteClick(product.product_id, e)}
                              className="text-[#B3B3B3] hover:text-red-500 flex-shrink-0 ml-2"
                              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                              {isFavorite ? (
                                <GoHeartFill className="text-red-500" size={20} />
                              ) : (
                                <GoHeart size={20} />
                              )}
                            </button>
                          </div>
                          <span className="text-[#5A5A5A] text-sm">
                            {productCategory}
                          </span>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex gap-2">
                              {["Image1", "Image2", "Image3"].map(
                                (key, i) =>
                                  product?.[key]?.image && (
                                    <button
                                      key={`${productId}-${i}`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedImages((prev) => ({
                                          ...prev,
                                          [productId]: product[key]?.image,
                                        }));
                                      }}
                                      className="h-5 w-5 rounded-full border cursor-pointer"
                                      style={{
                                        backgroundColor: `#${product[key]?.color || 'ccc'}`,
                                      }}
                                      aria-label={`Select ${product[key]?.color || ''} variant`}
                                    />
                                  )
                              )}
                            </div>
                            <span className="font-marcellus text-lg font-bold">
                              ₹{price}
                            </span>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  );
                })
              ) : (
                <div className="w-full h-80 flex justify-center items-center font-marcellus text-xl text-gray-600">
                  No Products Found
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-auto font-marcellus px-5 text-sm sm:text-lg xl:mt-10 xl:w-[42vw] xl:px-10 text-[#5A5A5A]">
            Celebrate your style journey with unmatched elegance, craftsmanship,
            and timeless beauty found in every piece of our jewellery
            collection.
          </div>
        </div>
        <div className="w-[40vw] h-[80vh] flex items-center justify-center relative md:my-5 xl:w-[28vw] xl:items-end xl:my-0">
          <img
            src={Necklace}
            alt="necklace"
            className="h-full w-full object-contain"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x800?text=Jewelry+Image';
            }}
          />
          {floatingProducts?.[0] && (
            <NavLink
              state={{ product: floatingProducts[0] }}
              to={`/single-product/${floatingProducts[0]?._id || 'temp'}`}
              className="absolute flex p-1 bg-white rounded-lg bottom-28 right-5 shadow-md sm:right-36 md:right-48 lg:right-60 xl:-right-24 hover:scale-105 transition-transform duration-200"
            >
              <img
                src={floatingProducts[0]?.Image}
                alt={floatingProducts[0]?.name || 'Product'}
                className="w-16 h-16 bg-gray-200 rounded-lg md:h-20 md:w-20 xl:w-16 xl:h-16 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100x100?text=Product';
                }}
              />
              <div className="w-auto h-auto flex flex-col px-4 justify-between pb-2">
                <div className="w-full h-auto flex flex-col">
                  <span className="font-marcellus text-sm md:text-lg xl:text-base truncate max-w-[120px]">
                    {floatingProducts[0]?.name || 'Product'}
                  </span>
                  <span className="font-bellota text-[#5A5A5A] text-xs md:text-sm xl:text-xs">
                    {floatingProducts[0]?.category || 'Category'}
                  </span>
                </div>
                <span className="text-[#090909] font-marcellus text-sm md:text-base">
                  ₹{getSafePrice(floatingProducts[0])}
                </span>
              </div>
            </NavLink>
          )}
        </div>
        {floatingProducts?.[1] && (
          <NavLink
            state={{ product: floatingProducts[1] }}
            to={`/single-product/${floatingProducts[1]?._id || 'temp'}`}
            className="hidden xl:absolute xl:flex xl:p-1 xl:bg-white xl:rounded-lg xl:top-24 xl:shadow-md xl:right-[350px] hover:scale-105 transition-transform duration-200"
          >
            <img
              src={floatingProducts[1]?.Image}
              alt={floatingProducts[1]?.name || 'Product'}
              className="w-16 h-16 bg-gray-200 rounded-lg md:h-20 md:w-20 xl:w-16 xl:h-16 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/100x100?text=Product';
              }}
            />
            <div className="w-auto h-auto flex flex-col px-4 justify-between pb-2">
              <div className="w-full h-auto flex flex-col">
                <span className="font-marcellus text-sm md:text-lg xl:text-base truncate max-w-[120px]">
                  {floatingProducts[1]?.name || 'Product'}
                </span>
                <span className="font-bellota text-[#5A5A5A] text-xs md:text-sm xl:text-xs">
                  {floatingProducts[1]?.category || 'Category'}
                </span>
              </div>
              <span className="text-[#090909] font-marcellus text-sm md:text-base">
                ₹{getSafePrice(floatingProducts[1])}
              </span>
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Products;