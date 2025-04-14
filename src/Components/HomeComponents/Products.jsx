import { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { NavLink } from "react-router-dom";
import Necklace from "../../assets/neclace.png";

function Products({ data }) {
  const [products, setProducts] = useState([]);
  const [floatingProducts, setFloatingProdcuts] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});

  useEffect(() => {
    setProducts(data?.slice(0, 3));
    setFloatingProdcuts(data?.slice(0, 5));
  }, [data]);

  return (
    <div className="w-full h-auto flex pb-5 xl:pb-20 bg-[#FAFAFA]">
      <div className="w-full h-auto flex flex-col relative gap-5 xl:flex-row xl:gap-0 px-4 md:px-10">
        <div className="w-full h-auto flex flex-col xl:w-[60vw]">
          <div className="w-full h-auto flex flex-col font-marcellus justify-center text-2xl gap-1 px-5 sm:text-5xl sm:my-4 md:text-6xl xl:text-5xl 2xl:text-6xl xl:px-10">
            <span>Adorn Yourself in Elegance</span>
            <span>with Exquisite Jewellery</span>
          </div>
          <div className="w-full h-auto flex flex-col bg-[#FAFAFA]">
            <div className="product-slider w-full h-auto flex my-5 overflow-x-scroll gap-6 px-8 xl:gap-3 xl:px-2 xl:overflow-hidden">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div key={index} className="min-w-[70vw] sm:min-w-[40vw] md:min-w-[22vw] lg:min-w-[20vw] xl:min-w-[19vw] 2xl:min-w-[18vw]">
                    <NavLink
                      state={{ product }}
                      to={`/single-product/${product._id}`}
                      className="group bg-white p-3 shadow-md rounded-[50px] h-[300px] flex flex-col hover:shadow-lg transition-shadow duration-300 ease-in-out"
                    >
                      <div className="w-full h-[200px] overflow-hidden rounded-[50px]">
                        <img
                          src={selectedImages[product._id] || product?.Image}
                          alt="product"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col flex-grow justify-between pt-3 px-2">
                        <div className="flex justify-between items-start">
                          <span className="font-marcellus text-lg">
                            {product.name}
                          </span>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Handle like functionality here
                            }}
                            className="text-[#B3B3B3] hover:text-red-500 flex-shrink-0 ml-2"
                          >
                            <GoHeart size={20} />
                          </button>
                        </div>
                        <span className="text-[#5A5A5A] text-sm">
                          {product.category}
                        </span>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex gap-2">
                            {["Image1", "Image2", "Image3"].map(
                              (key, i) =>
                                product[key]?.image && (
                                  <button
                                    key={i}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setSelectedImages((prev) => ({
                                        ...prev,
                                        [product._id]: product[key].image,
                                      }));
                                    }}
                                    className="h-5 w-5 rounded-full border cursor-pointer"
                                    style={{
                                      backgroundColor: `#${product[key]?.color}`,
                                    }}
                                  />
                                )
                            )}
                          </div>
                          <span className="font-marcellus text-lg font-bold">
                            ₹{product.quantityPrices[0].price}
                          </span>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                ))
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
            className="h-full w-full"
          />
          {floatingProducts[0] && (
            <NavLink
              state={{ product: floatingProducts[0] }}
              to={`/single-product/${floatingProducts[0]?._id}`}
              className="absolute flex p-1 bg-white rounded-lg bottom-28 right-5 shadow-md sm:right-36 md:right-48 lg:right-60 xl:-right-24"
            >
              <img
                src={floatingProducts[0]?.Image}
                alt="image"
                className="w-16 h-16 bg-gray-200 rounded-lg md:h-20 md:w-20 xl:w-16 xl:h-16"
              />
              <div className="w-auto h-auto flex flex-col px-4 justify-between pb-2">
                <div className="w-full h-auto flex flex-col">
                  <span className="font-marcellus text-sm md:text-lg xl:text-base">
                    {floatingProducts[0]?.name}
                  </span>
                  <span className="font-bellota text-[#5A5A5A] text-xs md:text-sm xl:text-xs">
                    {floatingProducts[0]?.category}
                  </span>
                </div>
                <span className="text-[#090909] font-marcellus text-sm md:text-base">
                  ₹{floatingProducts[0]?.quantityPrices[0].price}
                </span>
              </div>
            </NavLink>
          )}
        </div>
        {floatingProducts[1] && (
          <NavLink
            state={{ product: floatingProducts[1] }}
            to={`/single-product/${floatingProducts[1]?._id}`}
            className="hidden xl:absolute xl:flex xl:p-1 xl:bg-white xl:rounded-lg xl:top-24 xl:shadow-md xl:right-[350px]"
          >
            <img
              src={floatingProducts[1]?.Image}
              alt="image"
              className="w-16 h-16 bg-gray-200 rounded-lg md:h-20 md:w-20 xl:w-16 xl:h-16"
            />
            <div className="w-auto h-auto flex flex-col px-4 justify-between pb-2">
              <div className="w-full h-auto flex flex-col">
                <span className="font-marcellus text-sm md:text-lg xl:text-base">
                  {floatingProducts[1]?.name}
                </span>
                <span className="font-bellota text-[#5A5A5A] text-xs md:text-sm xl:text-xs">
                  {floatingProducts[1]?.category}
                </span>
              </div>
              <span className="text-[#090909] font-marcellus text-sm md:text-base">
                ₹{floatingProducts[1]?.quantityPrices[0].price}
              </span>
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Products;